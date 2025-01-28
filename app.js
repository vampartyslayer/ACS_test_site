/*********************
 *  CONFIGURATION
 *********************/
const CONTRACT_ADDRESS = '0xfaf77c99E8E7C704b37449DCD08cb3555887cC94';
const BASE_SEPOLIA_CHAIN_ID = 84532;
const BASE_SEPOLIA_RPC = 'https://sepolia.base.org';
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

/*********************
 *  STATE VARIABLES
 *********************/
let web3;
let contract;
let userAccount;
let chipId;
let isInitialized = false;
let isAdmin = false;

/*********************
 *  CORE INITIALIZATION (FINAL)
 *********************/
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Initialize read-only provider with retry logic
        await initializeReadOnlyProvider();
        
        // 2. Setup UI components
        validateRequiredElements();
        disableMintButton();
        hideAdminPanel();
        
        // 3. Set up event listeners
        setupEventListeners();
        
        // 4. Check URL parameters now that contract is ready
        await checkUrlForChipId();
        
        // 5. Check for existing wallet connection
        await checkPersistedConnection();
        
    } catch (error) {
        console.error('Boot sequence failed:', error);
        updateStatus('System initialization failed - please refresh');
    }
});

function validateRequiredElements() {
    const required = ['connectWallet', 'mintNFT', 'status', 'walletAddress'];
    required.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`Critical Error: Missing element #${id}`);
        }
    });
}

/*********************
 *  PROVIDER MANAGEMENT (COMPLETE)
 *********************/
async function initializeReadOnlyProvider(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            web3 = new Web3(new Web3.providers.HttpProvider(BASE_SEPOLIA_RPC));
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            // Validate contract connection
            await contract.methods.totalSupply().call();
            
            console.log('Read-only provider initialized');
            return;
        } catch (error) {
            console.error(`Read-only init attempt ${i+1}/${retries} failed:`, error);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

async function switchToInjectedProvider() {
    try {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        await validateNetwork();
        console.log('Switched to injected provider');
    } catch (error) {
        console.error('Provider switch failed:', error);
        throw error;
    }
}

/*********************
 *  REVISED WALLET FLOW
 *********************/
async function checkPersistedConnection() {
    if (window.ethereum?.isConnected()) {
        try {
            await switchToInjectedProvider();
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateWalletDisplay();
                await checkIfAdmin();
                if (chipId) await checkChipStatus();
            }
        } catch (error) {
            console.log('No persisted connection found');
        }
    }
}

async function connectWallet() {
    try {
        if (!window.ethereum) throw new Error('Please install MetaMask');
        
        await switchToInjectedProvider();
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        userAccount = accounts[0];
        updateWalletDisplay();
        await checkIfAdmin();
        if (chipId) await checkChipStatus();
        
        setupAccountChangeListener();
    } catch (error) {
        handleConnectionError(error);
    }
}

/*********************
 *  NETWORK HANDLING
 *********************/
async function validateNetwork() {
    const chainId = await web3.eth.getChainId();
    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
        await handleNetworkSwitch();
    }
}

/*********************
 *  CHIP HANDLING (FULL IMPLEMENTATION)
 *********************/
async function checkUrlForChipId() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        chipId = urlParams.get('chipId');
        
        if (chipId) {
            console.log('[Chip] URL parameter detected:', chipId);
            updateChipDisplay(chipId);
            await checkChipStatus();
        } else {
            console.log('[Chip] No chip ID in URL');
            updateStatus('Scan a chip to begin');
        }
    } catch (error) {
        console.error('URL parameter handling failed:', error);
        updateStatus('Error processing chip ID: ' + error.message);
    }
}

async function checkChipStatus() {
    try {
        if (!contract?.methods?.chipToTokenId) {
            console.warn('Contract methods missing, reinitializing...');
            await initializeReadOnlyProvider();
        }
        
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        const isMinted = await contract.methods.tokenIdMinted(tokenId).call();
        
        if (isMinted) {
            const owner = await contract.methods.ownerOf(tokenId).call();
            updateStatus(`Already claimed by ${shortenAddress(owner)}`);
            disableMintButton();
        } else {
            handleValidChip();
        }
    } catch (error) {
        handleChipError(error);
        throw error;
    }
}

/*********************
 *  MINT FUNCTIONALITY
 *********************/
async function mintNFT() {
    try {
       // validateMintPreconditions();
        
        updateStatus('Minting...');
        const receipt = await contract.methods.mintNFT(chipId)
            .send({ 
                from: userAccount,
                gas: 500000 
            });
        
        handleMintSuccess(receipt);
    } catch (error) {
        handleMintError(error);
    }
}

/*********************
 *  ADMIN FEATURES
 *********************/
async function checkIfAdmin() {
    try {
        const owner = await contract.methods.owner().call();
        isAdmin = (userAccount.toLowerCase() === owner.toLowerCase());
        toggleAdminPanel();
    } catch (error) {
        console.error('Admin check failed:', error);
        isAdmin = false;
    }
}

/*********************
 *  UI FUNCTIONS
 *********************/
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('mintNFT').addEventListener('click', mintNFT);
    
    // Add null check for admin elements
    const registerBtn = document.getElementById('registerChip');
    if (registerBtn) {
        registerBtn.addEventListener('click', registerChip);
    }
}

function updateWalletDisplay() {
    const connectBtn = document.getElementById('connectWallet');
    const walletDisplay = document.getElementById('walletAddress');
    if (connectBtn) connectBtn.style.display = 'none';
    if (walletDisplay) walletDisplay.textContent = shortenAddress(userAccount);
}

function toggleAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) adminPanel.style.display = isAdmin ? 'block' : 'none';
}

function updateStatus(message) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

function enableMintButton() {
    const btn = document.getElementById('mintNFT');
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('disabled');
    }
}

function disableMintButton() {
    const btn = document.getElementById('mintNFT');
    if (btn) {
        btn.disabled = true;
        btn.classList.add('disabled');
    }
}

function shortenAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
}

async function registerChip() {
    try {
        const newChipId = prompt('Enter new chip ID:');
        if (!newChipId) return;
        
        updateStatus('Registering chip...');
        await contract.methods.registerChip(newChipId)
            .send({ from: userAccount });
            
        updateStatus('Chip registered successfully!');
    } catch (error) {
        console.error('Chip registration failed:', error);
        updateStatus('Registration error: ' + error.message);
    }
}

async function updateTokenURI() {
    try {
        const newURI = prompt('Enter new URI:');
        if (!newURI) return;
        
        updateStatus('Updating URI...');
        await contract.methods.setTokenURI(newURI)
            .send({ from: userAccount });
            
        updateStatus('URI updated successfully!');
    } catch (error) {
        console.error('URI update failed:', error);
        updateStatus('Update error: ' + error.message);
    }
}

/*********************
 *  URL PARAM HANDLING (RENAMED FROM handleChipIdFromURL)
 *********************/
function validateContract() {
    if (!contract?.methods) {
        throw new Error('Contract methods not available');
    }
}

async function getContract() {
    if (!isInitialized) {
        await initWeb3();
    }
    validateContract();
    return contract;
}

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

window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
});

window.ethereum.on('accountsChanged', (accounts) => {
    userAccount = accounts[0];
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); // Re-init contract
    checkIfAdmin();
    if (chipId) checkChipStatus();
});

async function checkConnection() {
    try {
        await web3.eth.net.getId();
        return true;
    } catch {
        return false;
    }
}

function handleConnectionError(error) {
    console.error('Connection failed:', error);
    updateStatus(`Connection error: ${error.message}`);
    enableConnectButton();
}

function handleChipError(error) {
    console.error('Chip check failed:', error);
    updateStatus('Chip error: ' + error.message);
    disableMintButton();
}

function handleAlreadyMinted(tokenId) {
    (async () => {
        try {
            const owner = await contract.methods.ownerOf(tokenId).call();
            updateStatus(`Already claimed by ${shortenAddress(owner)}`);
            disableMintButton();
        } catch (error) {
            console.error('Owner lookup failed:', error);
            updateStatus('Already minted - owner unknown');
        }
    })();
}

function handleValidChip() {
    enableMintButton();
    updateStatus('Ready to mint!');
}

function handleMintSuccess(receipt) {
    console.log('Mint successful:', receipt);
    updateStatus('NFT Minted!');
    disableMintButton();
}

function handleMintError(error) {
    console.error('Mint failed:', error);
    updateStatus('Mint error: ' + error.message);
    enableMintButton();
}

function hideAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) adminPanel.style.display = 'none';
}

function setupAccountChangeListener() {
    window.ethereum.on('accountsChanged', (accounts) => {
        userAccount = accounts[0];
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); // Re-init contract
        checkIfAdmin();
        if (chipId) checkChipStatus();
    });
}

/*********************
 *  WEB3 INITIALIZATION (MOVED UP)
 *********************/
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            isInitialized = true;
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('No Ethereum provider detected');
    }
}
