let web3;
let contract;
let userAccount;
let chipId;

const CONTRACT_ADDRESS = '0x05742B249a116b57Ba0469086B5D68fF0e042Bf6';
const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    }
];

const ADMIN_ADDRESS = '0x1705280ae174a96bac66d3b10caee15a19c61eba';

// Function to check if the connected wallet is the admin
async function checkIfAdmin() {
    console.log("Checking admin status...");
    try {
        if (!userAccount) {
            console.error("No user account connected");
            return false;
        }

        // Compare with hardcoded admin address
        const isAdmin = userAccount.toLowerCase() === ADMIN_ADDRESS.toLowerCase();
        console.log("Current user:", userAccount);
        console.log("Admin address:", ADMIN_ADDRESS);
        console.log("Is admin:", isAdmin);

        // Update UI based on admin status
        document.getElementById('adminSection').style.display = isAdmin ? 'block' : 'none';
        
        return isAdmin;
    } catch (error) {
        console.error("Error in checkIfAdmin:", error);
        return false;
    }
}

// Function to connect the wallet
async function connectWallet() {
    console.log("Connecting wallet...");
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        console.log("Connected account:", userAccount);

        // Update UI
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('disconnectWallet').style.display = 'block';
        
        // Check admin status first
        const isAdmin = await checkIfAdmin();
        console.log("Admin check complete:", isAdmin);

        // Only show user section if not admin
        document.getElementById('userSection').style.display = isAdmin ? 'none' : 'block';

        await handleChipId();
    } catch (error) {
        console.error("Wallet connection error:", error);
        updateStatus('Failed to connect wallet: ' + error.message);
    }
}

// Function to handle the chip ID
async function handleChipId() {
    const mintButton = document.getElementById('mintNFT');
    const mintMessage = document.getElementById('mintMessage');
    if (chipId) {
        console.log("Handling chip ID:", chipId);
        try {
            const tokenId = await contract.methods.chipToTokenId(chipId).call();
            console.log("Token ID for chip:", tokenId);

            // Ensure tokenId is valid
            if (tokenId == 0) {
                console.log("Chip ID not registered");
                document.getElementById('invitationTitle').textContent = 'CHIP NOT REGISTERED';
                mintButton.classList.add('disabled-button');
                mintButton.disabled = true;
                mintMessage.textContent = 'This chip ID is not registered.';
                return;
            }

            // Check if token ID has been minted
            const tokenIdMinted = await contract.methods.tokenIdMinted(tokenId).call();
            console.log("Token ID Minted Status:", tokenIdMinted);

            if (tokenIdMinted) {
                document.getElementById('invitationTitle').textContent = 'ID ALREADY MINTED';
                mintButton.classList.add('disabled-button');
                mintButton.disabled = true;
                mintMessage.textContent = 'This chip ID has already been minted.';
            } else {
                document.getElementById('chipIdDisplay').textContent = chipId;
                mintButton.classList.remove('disabled-button');
                mintButton.disabled = false;
                mintMessage.textContent = '';
            }
        } catch (error) {
            console.error("Error handling chip ID:", error);
            updateStatus('Error handling chip ID: ' + error.message);
        }
    } else {
        document.getElementById('invitationTitle').textContent = 'YOU WERE NOT INVITED';
        mintButton.classList.add('disabled-button');
        mintButton.disabled = true;
        mintMessage.textContent = 'You have not tapped in';
    }
}

// Function to mint NFT
async function mintNFT() {
    console.log("Attempting to mint NFT...");
    updateStatus('Minting NFT...');
    if (!chipId) {
        console.log("No chip ID available");
        updateStatus('No chip ID detected. Please tap the NFC tag.');
        return;
    }
    try {
        console.log("Minting with chip ID:", chipId);
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        console.log("Token ID for chip:", tokenId);

        if (tokenId == 0) {
            console.log("Chip ID not registered");
            updateStatus('Chip ID not registered');
            return;
        }

        const tokenIdMinted = await contract.methods.tokenIdMinted(tokenId).call();
        console.log("Token ID Minted Status:", tokenIdMinted);

        if (tokenIdMinted) {
            console.log("Chip ID already minted");
            updateStatus('Chip ID already minted');
            return;
        }

        // Checking the gas estimation
        const gasEstimate = await contract.methods.mintNFT(chipId).estimateGas({ from: userAccount });
        console.log("Estimated Gas:", gasEstimate);

        await contract.methods.mintNFT(chipId).send({ from: userAccount, gas: gasEstimate })
            .on('transactionHash', function(hash) {
                console.log("Transaction hash:", hash);
            })
            .on('receipt', function(receipt) {
                console.log("Transaction receipt:", receipt);
                updateStatus('NFT minted successfully!');
            })
            .on('error', function(error, receipt) {
                console.error("Transaction error:", error);
                updateStatus('Failed to mint NFT: ' + error.message);
            });
    } catch (error) {
        console.error("Error minting NFT:", error);
        updateStatus('Failed to mint NFT: ' + error.message);
    }
}

// Function to update status messages
function updateStatus(message) {
    console.log("Status update:", message);
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// Initialize the application
async function init() {
    console.log("Initializing...");
    if (typeof window.ethereum !== 'undefined') {
        console.log("Ethereum object found");
        try {
            web3 = new Web3(window.ethereum);
            console.log("Web3 initialized");

            console.log("Contract Address:", CONTRACT_ADDRESS);
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            console.log("Contract object created:", contract);

            // Log available methods
            console.log("Available contract methods:", Object.keys(contract.methods));

            // Try to call a view function
            try {
                const totalSupply = await contract.methods.totalSupply().call();
                console.log("Total supply:", totalSupply);
            } catch (error) {
                console.error("Error calling totalSupply:", error);
            }

            const networkId = await web3.eth.net.getId();
            console.log("Connected to network ID:", networkId);

            document.getElementById('connectWallet').addEventListener('click', connectWallet);
            document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
            document.getElementById('registerChip').addEventListener('click', registerChip);
            document.getElementById('mintNFT').addEventListener('click', mintNFT);
            document.getElementById('addBaseSepolia').addEventListener('click', addBaseSepoliaNetwork);

            // Get the chip ID from the URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            chipId = urlParams.get('chipId');
            if (chipId) {
                document.getElementById('chipIdDisplay').textContent = chipId;
                console.log("Chip ID detected:", chipId);
            } else {
                updateStatus('No chip ID detected. Please tap the NFC tag.');
                console.log("No chip ID in URL");
            }
        } catch (error) {
            console.error("Error initializing Web3 or contract:", error);
            updateStatus('Error initializing. Check console for details.');
        }
    } else {
        console.log("No Ethereum object found");
        updateStatus('Please install MetaMask!');
    }
}

// Add event listener for network changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', async (accounts) => {
        console.log("Account changed, rechecking admin status");
        userAccount = accounts[0];
        await checkIfAdmin();
    });
}

window.addEventListener('load', init);
