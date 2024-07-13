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



const BASE_SEPOLIA_CHAIN_ID = '84532'; // Chain ID for Base Sepolia
const BASE_SEPOLIA_PARAMS = {
    chainId: '0x14CC4', // Chain ID in hex (84532 in decimal)
    chainName: 'Base Sepolia',
    nativeCurrency: {
        name: 'Sepolia ETH',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia-explorer.base.org']
};

async function init() {
    console.log("Initializing...");
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        console.log("Web3 initialized with window.ethereum");

        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
        document.getElementById('registerChip').addEventListener('click', registerChip);
        document.getElementById('mintNFT').addEventListener('click', mintNFT);
        document.getElementById('addBaseSepolia').addEventListener('click', addBaseSepoliaNetwork);

        // Initialize contract here
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log("Contract object created:", contract);

        const urlParams = new URLSearchParams(window.location.search);
        chipId = urlParams.get('chipId');
        await handleChipId();
    } else {
        updateStatus('Please install MetaMask or another compatible wallet!');
    }
}

async function connectWallet() {
    console.log("Attempting to connect wallet...");
    updateStatus('Connecting wallet...');
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            localStorage.setItem('userAccount', userAccount); // Save user account to local storage
            console.log("Wallet connected:", userAccount);
            updateStatus('Wallet connected: ' + userAccount);
            document.getElementById('connectWallet').style.display = 'none';
            document.getElementById('disconnectWallet').style.display = 'block';
            document.getElementById('userSection').style.display = 'block';
            await checkNetwork(); // Check network after connecting wallet
            await handleChipId();
            await checkIfAdmin();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            updateStatus('Failed to connect wallet: ' + error.message);
        }
    } else {
        updateStatus('MetaMask or another compatible wallet is not installed. Please install it to connect your wallet.');
    }
}

async function disconnectWallet() {
    console.log("Disconnecting wallet...");
    updateStatus('Wallet disconnected');
    userAccount = null;
    localStorage.removeItem('userAccount');
    document.getElementById('connectWallet').style.display = 'block';
    document.getElementById('disconnectWallet').style.display = 'none';
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'none';
    document.getElementById('addBaseSepolia').style.display = 'none';
}

async function checkNetwork() {
    try {
        const networkId = await web3.eth.net.getId();
        console.log("Current network ID:", networkId);
        const addBaseSepoliaButton = document.getElementById('addBaseSepolia');
        if (parseInt(networkId, 10) !== parseInt(BASE_SEPOLIA_CHAIN_ID, 10)) {
            updateStatus('Please switch to the Base Sepolia network');
            addBaseSepoliaButton.textContent = 'Add Base Sepolia';
            addBaseSepoliaButton.onclick = addBaseSepoliaNetwork;
            showAddSepoliaOption();
        } else {
            updateStatus('Connected to Base Sepolia network');
            addBaseSepoliaButton.style.display = 'none';
            await initializeContract(); // Initialize the contract only after network check
        }
    } catch (error) {
        console.error('Error checking network:', error);
        updateStatus('Error checking network: ' + error.message);
    }
}

function showAddSepoliaOption() {
    const addSepoliaButton = document.getElementById('addBaseSepolia');
    if (addSepoliaButton) {
        addSepoliaButton.style.display = 'block';
    }
}

async function addBaseSepoliaNetwork() {
    try {
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_SEPOLIA_PARAMS],
        });
        updateStatus('Base Sepolia network added. Please switch to it.');
        await checkNetwork();
    } catch (error) {
        updateStatus('Failed to add Base Sepolia network: ' + error.message);
        console.error('Error adding Base Sepolia network:', error);
    }
}

async function initializeContract() {
    try {
        console.log("Initializing contract...");
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
    } catch (error) {
        console.error("Error initializing contract:", error);
        updateStatus('Error initializing contract. Check console for details.');
    }
}

async function checkIfAdmin() {
    console.log("Checking if user is admin...");
    try {
        if (contract && contract.methods.owner) {
            const owner = await contract.methods.owner().call();
            console.log("Contract owner:", owner);
            console.log("Current user:", userAccount);
            if (userAccount.toLowerCase() === owner.toLowerCase()) {
                console.log("User is admin");
                document.getElementById('adminSection').style.display = 'block';
                await displayRegisteredChips();
            } else {
                console.log("User is not admin");
            }
        } else {
            console.log("Owner function not found in the contract");
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
    }
}

async function getRegisteredChips() {
    try {
        const registeredChips = [];
        const totalSupply = await contract.methods.totalSupply().call();
        for (let i = 1; i <= totalSupply; i++) {
            const chipId = await contract.methods.chipToTokenId(i).call();
            const tokenIdMinted = await contract.methods.tokenIdMinted(i).call();
            registeredChips.push({ chipId, tokenId: i, minted: tokenIdMinted });
        }
        return registeredChips;
    } catch (error) {
        console.error("Error fetching registered chips:", error);
        return [];
    }
}

async function displayRegisteredChips() {
    const chipsList = document.getElementById('chipsList');
    try {
        const registeredChips = await getRegisteredChips();
        chipsList.innerHTML = ''; // Clear previous entries
        registeredChips.forEach(chip => {
            const chipEntry = document.createElement('div');
            chipEntry.innerHTML = `
                <div>Chip ID: ${chip.chipId} - Token ID: ${chip.tokenId} - Minted: ${chip.minted ? 'Yes' : 'No'}</div>
            `;
            chipsList.appendChild(chipEntry);
        });
    } catch (error) {
        console.error("Error displaying registered chips:", error);
        document.getElementById('adminSection').innerHTML = 'Failed to load registered chips.';
    }
}

async function registerChip() {
    console.log("Attempting to register chip...");
    updateStatus('Registering chip...');
    const chipIdToRegister = document.getElementById('chipIdRegister').value.trim(); // Trim any leading/trailing spaces
    if (!chipIdToRegister) {
        updateStatus('Chip ID cannot be empty.');
        return;
    }
    try {
        const owner = await contract.methods.owner().call();
        console.log("Contract owner:", owner);
        console.log("Current user:", userAccount);

        // Ensure correct case sensitivity
        if (userAccount.toLowerCase() !== owner.toLowerCase()) {
            throw new Error("Only the contract owner can register chips.");
        }

        // Ensure correct network
        const networkId = await web3.eth.net.getId();
        console.log("Current network ID:", networkId);
        if (parseInt(networkId, 10) !== parseInt(BASE_SEPOLIA_CHAIN_ID, 10)) {
            throw new Error("Please switch to the Base Sepolia network.");
        }

        // Send the transaction
        await contract.methods.registerChip(chipIdToRegister).send({ from: userAccount });
        console.log("Chip registered successfully:", chipIdToRegister);
        updateStatus('Chip registered successfully');
        await displayRegisteredChips(); // Update list after registering a new chip
    } catch (error) {
        console.error("Error registering chip:", error);
        updateStatus('Failed to register chip: ' + error.message);
    }
}



async function mintNFT() {
    console.log("Attempting to mint NFT...");
    updateStatus('Minting NFT...');
    if (!chipId) {
        console.log("No chip ID available");
        document.getElementById('invitationTitle').textContent = 'YOU WERE NOT INVITED';
        updateStatus('You have not tapped in');
        return;
    }
    try {
        console.log("Checking if chip ID is registered and not minted:", chipId);
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        console.log("Token ID for chip:", tokenId);

        // Ensure tokenId is valid
        if (tokenId == 0) {
            console.log("Chip ID not registered");
            updateStatus('Chip ID not registered');
            document.getElementById('invitationTitle').textContent = 'CHIP NOT REGISTERED';
            return;
        }

        const tokenIdMinted = await contract.methods.tokenIdMinted(tokenId).call();
        console.log("Token ID Minted Status:", tokenIdMinted);

        if (tokenIdMinted) {
            console.log("Chip ID already minted");
            updateStatus('Chip ID already minted');
            document.getElementById('invitationTitle').textContent = 'ID ALREADY MINTED';
            const mintButton = document.getElementById('mintNFT');
            mintButton.classList.add('disabled-button');
            mintButton.disabled = true;
            const mintMessage = document.getElementById('mintMessage');
            mintMessage.textContent = 'This chip ID has already been minted.';
            return;
        }

        console.log("Minting with chip ID:", chipId);
        const gasEstimate = await contract.methods.mintNFT(chipId).estimateGas({ from: userAccount });
        await contract.methods.mintNFT(chipId).send({ from: userAccount, gas: gasEstimate });
        console.log("NFT minted successfully");
        updateStatus('NFT minted successfully');
    } catch (error) {
        console.error("Error minting NFT:", error);
        updateStatus('Failed to mint NFT: ' + error.message);
    }
}



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

function updateStatus(message) {
    console.log("Status update:", message);
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

window.addEventListener('load', init);
