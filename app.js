/*********************
 *  CONFIGURATION
 *********************/
const CONTRACT_ADDRESS = '0xfaf77c99E8E7C704b37449DCD08cb3555887cC94';
const BASE_SEPOLIA_CHAIN_ID = 84532;
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
 *  CORE FUNCTIONS
 *********************/
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

async function initWeb3() {
    if (!window.ethereum) throw new Error('Please install MetaMask');
    
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAccount = (await web3.eth.getAccounts())[0];
    
    await validateNetwork();
    initContract();
    checkUrlForChipId();
}

function initContract() {
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    console.log('[Contract] Methods verified:', Object.keys(contract.methods));
}

/*********************
 *  NETWORK HANDLING
 *********************/
async function validateNetwork() {
    const chainId = await web3.eth.getChainId();
    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
        await switchToBaseSepolia();
    }
}

async function switchToBaseSepolia() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x14CC4' }]
        });
    } catch (error) {
        if (error.code === 4902) {
            await addBaseSepoliaNetwork();
        }
    }
}

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

/*********************
 *  CHIP HANDLING
 *********************/
function checkUrlForChipId() {
    const urlParams = new URLSearchParams(window.location.search);
    chipId = urlParams.get('chipId');
    const display = document.getElementById('chipIdDisplay');
    
    if (chipId && display) {
        display.textContent = chipId;
        if (userAccount && contract) checkChipStatus();
    }
}

async function checkChipStatus() {
    try {
        if (!contract?.methods?.chipToTokenId) {
            throw new Error('Contract not initialized');
        }
        
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        const isMinted = await contract.methods.tokenIdMinted(tokenId).call();
        
        if (isMinted) {
            const owner = await contract.methods.ownerOf(tokenId).call();
            updateStatus(`Already claimed by ${shortenAddress(owner)}`);
            disableMintButton();
        } else {
            enableMintButton();
            updateStatus('Ready to mint!');
        }
    } catch (error) {
        console.error('Chip check failed:', error);
        updateStatus('Chip error: ' + error.message);
        disableMintButton();
    }
}

/*********************
 *  UI FUNCTIONS
 *********************/
function setupEventListeners() {
    const connectBtn = document.getElementById('connectWallet');
    const mintBtn = document.getElementById('mintNFT');
    
    if (connectBtn) connectBtn.addEventListener('click', connectWallet);
    if (mintBtn) mintBtn.addEventListener('click', mintNFT);
    
    // Admin controls
    document.getElementById('registerChip')?.addEventListener('click', registerChip);
    document.getElementById('updateTokenURI')?.addEventListener('click', updateTokenURI);
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

/*********************
 *  MINT FUNCTION
 *********************/
async function mintNFT() {
    try {
        if (!contract?.methods?.mintNFT) {
            throw new Error('Contract not initialized');
        }
        
        if (!chipId) {
            throw new Error('No chip ID detected');
        }
        
        updateStatus('Minting...');
        const receipt = await contract.methods.mintNFT(chipId)
            .send({ 
                from: userAccount,
                gas: 300000 // Adjust gas limit as needed
            });
        
        console.log('Mint successful:', receipt);
        updateStatus('NFT Minted!');
        disableMintButton();
        
    } catch (error) {
        console.error('Mint failed:', error);
        updateStatus('Mint error: ' + error.message);
        enableMintButton();
    }
}

/*********************
 *  INITIALIZATION
 *********************/
document.addEventListener('DOMContentLoaded', () => {
    // Validate required elements
    const requiredElements = ['connectWallet', 'mintNFT', 'status', 'walletAddress'];
    requiredElements.forEach(id => {
        const el = document.getElementById(id);
        if (!el) console.error(`CRITICAL: Missing element #${id}`);
    });
    
    disableMintButton();
    setupEventListeners();
    
    // Check URL but don't process until connection
    const urlParams = new URLSearchParams(window.location.search);
    chipId = urlParams.get('chipId');
    const display = document.getElementById('chipIdDisplay');
    if (chipId && display) display.textContent = chipId;
});

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

// const ADMIN_ADDRESS = '0x1705280ae174a96bac66d3b10caee15a19c61eba';
async function checkIfAdmin() {
    try {
        if (!contract?.methods?.owner) return;
        
        const owner = await contract.methods.owner().call();
        isAdmin = (userAccount.toLowerCase() === owner.toLowerCase());
        
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = isAdmin ? 'block' : 'none';
        }
        
    } catch (error) {
        console.error('Admin check failed:', error);
        isAdmin = false;
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
        const tokenId = prompt('Enter token ID:');
        const newURI = prompt('Enter new URI:');
        
        if (!tokenId || !newURI) return;
        
        updateStatus('Updating URI...');
        await contract.methods.setTokenURI(tokenId, newURI)
            .send({ from: userAccount });
            
        updateStatus('URI updated successfully!');
    } catch (error) {
        console.error('URI update failed:', error);
        updateStatus('Update error: ' + error.message);
    }
}

async function handleChipIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    chipId = urlParams.get('chipId');
    
    if (chipId) {
        console.log('[Chip] URL parameter detected:', chipId);
        await checkChipStatus();
    } else {
        console.log('[Chip] No chip ID in URL');
        updateStatus('Scan a chip to begin');
    }
}

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

// Run in browser console after init
contract.methods.owner().call().then(console.log)

async function connectWallet() {
    try {
        if (!window.ethereum) throw new Error('Please install MetaMask');
        
        // Initialize connection
        web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        // Network validation
        await validateNetwork();
        
        // Initialize contract
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Update UI
        const connectBtn = document.getElementById('connectWallet');
        const walletDisplay = document.getElementById('walletAddress');
        if (connectBtn) connectBtn.style.display = 'none';
        if (walletDisplay) walletDisplay.textContent = shortenAddress(userAccount);
        
        // Process chip ID AFTER contract initialization
        if (chipId) {
            await checkChipStatus();
        }
        
        // After successful connection
        await checkIfAdmin();
        
        // Add account change listener
        window.ethereum.on('accountsChanged', async (accounts) => {
            userAccount = accounts[0];
            await checkIfAdmin();
            if (chipId) checkChipStatus();
        });
        
    } catch (error) {
        console.error('Connection failed:', error);
        updateStatus(`Connection error: ${error.message}`);
    }
}
