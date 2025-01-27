const contractABI = [/* Paste the entire provided ABI array here */];
const contractAddress = '0xYourContractAddress'; // Replace with actual address

let web3;
let contract;
let userAccount;
let chipId;
let isInitialized = false;

const CONTRACT_ADDRESS = '0xfaf77c99E8E7C704b37449DCD08cb3555887cC94';
const CONTRACT_ABI = [
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
		"name": "InvalidInitialization",
		"type": "error"
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
				"indexed": true,
				"internalType": "string",
				"name": "chipId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ChipRegistered",
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
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "chipId",
				"type": "string"
			}
		],
		"name": "NFTMinted",
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
		"inputs": [],
		"name": "getAllChipIds",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
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
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getChipIdForToken",
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
		"inputs": [],
		"name": "initialize",
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
	}
];

const BASE_SEPOLIA_CHAIN_ID = 84532; // Use numeric chain ID for comparisons
const BASE_SEPOLIA_HEX = '0x14CC4'; // Hex version for MetaMask calls

// Add loading state management
let isCheckingAdmin = false;

// Add this function to handle URL parameters
function checkUrlForChipId() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        chipId = urlParams.get('chipId');
        
        if (chipId) {
            console.log('[URL] Detected chip ID:', chipId);
            handleChipId();
        }
    } catch (error) {
        console.error('[URL] Error parsing chip ID:', error);
    }
}

// Update the handleChipId function
async function handleChipId() {
    try {
        console.log('[Chip] Handling chip ID:', chipId);
        
        if (!chipId) {
            console.log('[Chip] No chip ID available');
            document.getElementById('invitationTitle').textContent = 'YOU WERE NOT INVITED';
            updateStatus('You have not tapped in');
            return;
        }

        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        console.log('[Chip] Resolved token ID:', tokenId);
        
        // Rest of your existing handleChipId logic...

    } catch (error) {
        console.error('[Chip] Handling error:', error);
        updateStatus('Error processing chip: ' + error.message);
    }
}

// Update the initWeb3 function
async function initWeb3() {
    try {
        // 1. Check for Ethereum provider
        if (!window.ethereum) {
            throw new Error('Please install MetaMask or another Ethereum wallet');
        }

        // 2. Initialize Web3
        web3 = new Web3(window.ethereum);
        console.log('[Web3] Instance created');

        // 3. Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        userAccount = accounts[0];
        console.log('[Web3] Connected account:', userAccount);

        // 4. Network validation
        await validateNetwork();

        // 5. Initialize contract after network check
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log('[Web3] Contract initialized');

        // 6. Post-initialization setup
        setupEventListeners();
        checkUrlForChipId();

    } catch (error) {
        console.error('[Web3] Initialization failed:', error);
        updateStatus(`Connection error: ${error.message}`);
        throw error; // Propagate error for handling
    }
}

function initContract() {
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    console.log('[Contract] Methods verified:', Object.keys(contract.methods));
}

// Network validation
async function validateNetwork() {
    try {
        const chainId = await web3.eth.getChainId();
        if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x14CC4' }] // Base Sepolia chain ID
            });
            console.log('[Network] Switched to Base Sepolia');
        }
    } catch (error) {
        if (error.code === 4902) { // Chain not added
            await addBaseSepoliaNetwork();
        }
        throw new Error('Network error: ' + error.message);
    }
}

// Add network switching helper
async function addBaseSepoliaNetwork() {
    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: '0x14CC4',
            chainName: 'Base Sepolia',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://sepolia.base.org'],
            blockExplorerUrls: ['https://sepolia-explorer.base.org']
        }]
    });
}

// URL handling
async function handleChipIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    chipId = urlParams.get('chipId');
    if (chipId) {
        console.log('[URL] Found chip ID:', chipId);
        await checkChipStatus();
    }
}

// Event listeners
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', async () => {
        await initWeb3();
        updateUI();
    });
    
    document.getElementById('mintNFT').addEventListener('click', mintNFT);
}

// Start initialization when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initWeb3();
        updateUI(); // Refresh wallet connection status
    } catch (error) {
        // Error already handled in initWeb3
    }
});

// Add this validation check
function validateContract() {
    if (!contract?.methods) {
        throw new Error('Contract methods not available');
    }
}

// Modified getContract with validation
async function getContract() {
    if (!isInitialized) {
        await initWeb3();
    }
    validateContract();
    return contract;
}

async function init() {
    try {
        await initWeb3();
        await handleChipIdFromURL();
        setupEventListeners();
        await checkIfAdmin();
    } catch (error) {
        console.error('[Init] Critical initialization error:', error);
        updateStatus(`Initialization failed: ${error.message}`);
    }
}

async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        userAccount = accounts[0];
        localStorage.setItem('userAccount', userAccount);
        
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('disconnectWallet').style.display = 'block';
        document.getElementById('userSection').style.display = 'block';
        
        await checkIfAdmin();
        await checkNetwork();
        
        updateStatus('Connected: ' + userAccount);
    } catch (error) {
        console.error("Connection error:", error);
        updateStatus('Failed to connect wallet');
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
    const chainId = await web3.eth.getChainId();
    if (chainId !== parseInt(BASE_SEPOLIA_CHAIN_ID)) {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [BASE_SEPOLIA_PARAMS.chainId]
        });
    }
}

// const ADMIN_ADDRESS = '0x1705280ae174a96bac66d3b10caee15a19c61eba';
async function checkIfAdmin() {
    try {
        // 1. Get current account
        const [account] = await web3.eth.getAccounts();
        if (!account) {
            console.log("No account connected");
            return false;
        }

        // 2. Get contract owner
        const owner = await contract.methods.owner().call();
        
        // 3. Direct address comparison
        const isAdmin = account.toLowerCase() === owner.toLowerCase();
        
        // 4. Update UI
        document.getElementById('adminSection').style.display = isAdmin ? 'block' : 'none';
        console.log("Admin check complete. Is admin:", isAdmin);
        
        console.log("User account:", account);
        console.log("Contract owner:", owner);
        
        return isAdmin;
        
    } catch (error) {
        console.error("Admin check failed:", error);
        return false;
    }
}

// New helper function for admin features
function setupAdminFeatures() {
    // Clear existing interval
    if (window.chipsInterval) clearInterval(window.chipsInterval);
    
    // Initial update
    updateChipsTable();
    
    // Periodic refresh (every 30 seconds)
    window.chipsInterval = setInterval(() => {
        updateChipsTable();
    }, 30000);
}

async function registerChip() {
    const chipIdToRegister = document.getElementById('chipIdRegister').value;
    console.log('[RegisterChip] Attempting to register chip:', chipIdToRegister);
    
    try {
        const tx = await contract.methods.registerChip(chipIdToRegister)
            .send({ from: userAccount });
        
        console.log('[RegisterChip] Chip registered successfully:', {
            chipId: chipIdToRegister,
            transactionHash: tx.transactionHash
        });
        
        updateStatus('Chip registered successfully');
        updateChipsTable();

    } catch (error) {
        console.error('[RegisterChip] Registration failed:', {
            error: error.message,
            chipId: chipIdToRegister,
            stack: error.stack
        });
        updateStatus('Failed to register chip: ' + error.message);
    }
}

async function isAdmin() {
    const contract = await getContract();
    const owner = await contract.methods.owner().call();
    return (owner.toLowerCase() === (await web3.eth.getAccounts())[0].toLowerCase());
}

async function mintNFT() {
    try {
        const contract = await getContract();
        console.log('[Mint] Available methods:', Object.keys(contract.methods));
        
        console.log('[MintNFT] Initiating mint process for chip:', chipId);
        if (!chipId) {
            console.error('[MintNFT] Aborting - No chip ID detected');
            updateStatus('No chip ID detected');
            return;
        }

        console.log('[MintNFT] Checking chip registration status:', chipId);
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        console.log('[MintNFT] Retrieved token ID:', tokenId);

        console.log('[MintNFT] Checking mint status for token:', tokenId);
        const isMinted = await contract.methods.tokenIdMinted(tokenId).call();
        
        if (isMinted) {
            console.warn('[MintNFT] Already minted - Token:', tokenId);
            updateStatus('This NFT has already been claimed');
            return;
        }

        console.log('[MintNFT] Initiating blockchain transaction for chip:', chipId);
        await contract.methods.mintNFT(chipId)
            .send({ from: userAccount })
            .on('transactionHash', (hash) => {
                console.log('[MintNFT] Transaction hash received:', hash);
                updateStatus('Minting in progress...');
            })
            .on('receipt', (receipt) => {
                console.log('[MintNFT] Transaction confirmed in block:', receipt.blockNumber);
                updateStatus('NFT minted successfully!');
                handleChipId();
            })
            .on('error', (error) => {
                console.error('[MintNFT] Transaction error:', error);
                updateStatus('Transaction failed: ' + error.message);
            });

    } catch (error) {
        console.error('[MintNFT] Critical error during process:', {
            error: error.message,
            chipId,
            stack: error.stack
        });
        updateStatus('Minting failed: ' + error.message);
    }
}

function updateStatus(message) {
    console.log("Status update:", message);
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else if (accounts[0] !== userAccount) {
        userAccount = accounts[0];
        checkIfAdmin();
    }
}

document.addEventListener('DOMContentLoaded', initWeb3);

async function updateChipsTable() {
    try {
        // Wait for contract initialization
        if (!contract?.methods) await initWeb3();
        
        const chipIds = await contract.methods.getAllChipIds().call();
        console.log('[ChipsTable] Retrieved', chipIds.length, 'chip IDs from contract');
        
        const chips = await Promise.all(chipIds.map(async (chipId) => {
            try {
                const tokenId = await contract.methods.chipToTokenId(chipId).call();
                const isMinted = await contract.methods.tokenIdMinted(tokenId).call();
                const owner = tokenId > 0 ? await contract.methods.ownerOf(tokenId).call() : null;
                
                return { chipId, tokenId, isMinted, owner };
            } catch (error) {
                console.error('[ChipsTable] Error fetching chip details:', {
                    chipId,
                    error: error.message
                });
                return null;
            }
        }));

        console.log('[ChipsTable] Processed', chips.filter(c => c !== null).length, 'valid chips');
        
        const tbody = document.getElementById('chipsTableBody');
        tbody.innerHTML = '';
        
        for (const chip of chips) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${chip.chipId || 'N/A'}</td>
                <td>${chip.tokenId}</td>
                <td>
                    <span class="status-pill ${chip.isMinted ? 'status-minted' : 'status-registered'}">
                        ${chip.isMinted ? 'Minted' : 'Registered'}
                    </span>
                </td>
                <td>${chip.owner ? shortenAddress(chip.owner) : 'N/A'}</td>
            `;
            tbody.appendChild(row);
        }
        
        if (chips.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">No chips registered yet</td></tr>';
        }
    } catch (error) {
        console.error('[ChipsTable] Error:', error);
        updateStatus('Error loading chip data: ' + error.message);
    }
}

// Helper function to shorten addresses
function shortenAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
}

// Add to existing init function
document.getElementById('registerChip').addEventListener('click', async () => {
    await registerChip();
    await updateChipsTable();
});

window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
});

window.ethereum.on('accountsChanged', (accounts) => {
    userAccount = accounts[0];
    checkIfAdmin();
});

async function checkConnection() {
    try {
        await web3.eth.net.getId();
        return true;
    } catch {
        return false;
    }
}

// Run in browser console after init
contract.methods.owner().call().then(console.log)
