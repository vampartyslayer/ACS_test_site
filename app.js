let web3;
let contract;
let userAccount;
let chipId;

const CONTRACT_ADDRESS = '0x05742B249a116b57Ba0469086B5D68fF0e042Bf6';
const BASE_SEPOLIA_CHAIN_ID = '84532';
const BASE_SEPOLIA_PARAMS = {
    chainId: '0x14CC4',
    chainName: 'Base Sepolia',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia-explorer.base.org']
};

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
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "InvalidInitialization",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chipId",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NotInitializing",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "version",
				"type": "uint64"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chipId",
				"type": "string"
			}
		],
		"name": "registerChip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
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
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newTokenURI",
				"type": "string"
			}
		],
		"name": "setTokenURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "newTokenURI",
				"type": "string"
			}
		],
		"name": "TokenURIChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
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
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "chipToTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
			"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenIdMinted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error("Please install MetaMask!");
        }

        web3 = new Web3(window.ethereum);
        console.log("Web3 initialized");

        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log("Contract initialized:", contract);

        const networkId = await web3.eth.net.getId();
        console.log("Network ID:", networkId);

        if (networkId !== parseInt(BASE_SEPOLIA_CHAIN_ID)) {
            document.getElementById('addBaseSepolia').style.display = 'block';
        }

        // Add event listeners
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
        document.getElementById('registerChip').addEventListener('click', registerChip);
        document.getElementById('mintNFT').addEventListener('click', mintNFT);
        document.getElementById('addBaseSepolia').addEventListener('click', addBaseSepoliaNetwork);

        // Check URL for chipId
        const urlParams = new URLSearchParams(window.location.search);
        chipId = urlParams.get('chipId');
        if (chipId) {
            document.getElementById('chipIdDisplay').textContent = chipId;
            console.log("Chip ID found:", chipId);
        }

    } catch (error) {
        console.error("Initialization error:", error);
        updateStatus(error.message);
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

async function disconnectWallet() {
    userAccount = null;
    document.getElementById('connectWallet').style.display = 'block';
    document.getElementById('disconnectWallet').style.display = 'none';
    document.getElementById('adminSection').style.display = 'none';
    document.getElementById('userSection').style.display = 'none';
    updateStatus('Wallet disconnected');
}

// Add refresh after registration
async function registerChip() {
    console.log("Attempting to register chip...");
    const chipIdToRegister = document.getElementById('chipIdRegister').value.trim();
    if (!chipIdToRegister) {
        updateStatus('Chip ID cannot be empty.');
        return;
    }
    try {
        await contract.methods.registerChip(chipIdToRegister)
            .send({ from: userAccount })
            .on('receipt', async function(receipt) {
                console.log("Transaction receipt:", receipt);
                updateStatus('Chip registered successfully');
                await displayRegisteredChips(); // Refresh the table
            });
    } catch (error) {
        console.error("Error registering chip:", error);
        updateStatus('Failed to register chip: ' + error.message);
    }
}

async function addBaseSepoliaNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_SEPOLIA_PARAMS]
        });
        updateStatus('Base Sepolia network added');
    } catch (error) {
        console.error("Network add error:", error);
        updateStatus('Failed to add network: ' + error.message);
    }
}

// Update getRegisteredChips function
async function getRegisteredChips() {
    try {
        const registeredChips = [];
        const totalSupply = await contract.methods.totalSupply().call();
        console.log("Total supply:", totalSupply);
        
        // Create batch request for efficiency
        const batch = new web3.BatchRequest();
        
        for (let i = 1; i <= totalSupply; i++) {
            const tokenIdMinted = await contract.methods.tokenIdMinted(i).call();
            const entry = {
                tokenId: i,
                minted: tokenIdMinted,
                chipId: "Loading..."
            };
            registeredChips.push(entry);
        }

        return registeredChips;
    } catch (error) {
        console.error("Error fetching registered chips:", error);
        return [];
    }
}

// Update displayRegisteredChips function
async function displayRegisteredChips() {
    console.log("Starting displayRegisteredChips");
    const chipsListDiv = document.getElementById('chipsList');
    
    if (!chipsListDiv) {
        console.error("chipsList element not found");
        return;
    }

    try {
        console.log("Fetching registered chips...");
        const chips = await getRegisteredChips();
        console.log("Fetched chips:", chips);
        
        // Clear existing content
        chipsListDiv.innerHTML = '';
        
        // Create table element
        const table = document.createElement('table');
        table.className = 'chips-table';
        table.style.display = 'table'; // Force table display
        
        // Add header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Token ID</th>
                <th>Status</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Add body
        const tbody = document.createElement('tbody');
        chips.forEach(chip => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${chip.tokenId}</td>
                <td class="${chip.minted ? 'status-minted' : 'status-unminted'}">
                    ${chip.minted ? 'Minted' : 'Available'}
                </td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        // Append table
        chipsListDiv.appendChild(table);
        console.log("Table rendered:", table);
        
        // Force display of admin section
        document.getElementById('adminSection').style.display = 'block';
        
    } catch (error) {
        console.error("Error displaying chips:", error);
        chipsListDiv.innerHTML = '<p>Error loading registered chips</p>';
    }
}

// Call display function after wallet connection
async function connectWallet() {
    console.log("Connecting wallet...");
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        console.log("Connected account:", userAccount);
        
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('disconnectWallet').style.display = 'block';
        
        const isAdmin = await checkIfAdmin();
        if (isAdmin) {
            console.log("Admin detected, displaying chips table");
            await displayRegisteredChips();
        }
        
    } catch (error) {
        console.error("Wallet connection error:", error);
        updateStatus('Failed to connect wallet: ' + error.message);
    }
}

// Add refresh timer
setInterval(displayRegisteredChips, 30000); // Refresh every 30 seconds

window.addEventListener('load', init);
