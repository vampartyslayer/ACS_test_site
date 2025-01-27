let web3;
let contract;
let userAccount;
let chipId;
let contractInitialized = false;

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

const BASE_SEPOLIA_CHAIN_ID = '84532';
const BASE_SEPOLIA_PARAMS = {
    chainId: '0x14A34',
    chainName: 'Base Sepolia',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia-explorer.base.org']
};

// Add loading state management
let isCheckingAdmin = false;

async function initWeb3() {
    try {
        if (!window.ethereum) throw new Error('No Ethereum provider detected');
        
        // Initialize Web3
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log('[Init] Web3 initialized successfully');

        // Initialize contract
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        contractInitialized = true;
        
        console.log('[Init] Contract initialized with methods:', Object.keys(contract.methods));
        checkUrlForChipId();
    } catch (error) {
        console.error('[Init] Initialization failed:', error);
        updateStatus(`Error: ${error.message}`);
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
    if (!contractInitialized) {
        await initWeb3();
    }
    validateContract();
    return contract;
}

async function init() {
    try {
        updateStatus('Connecting...');
        
        // 1. Initialize Web3
        await initWeb3();
        
        // 2. Get initial account
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        
        // 4. Network check
        if (!(await checkNetwork())) return;
        
        // 5. Check admin status
        await checkIfAdmin();
        
        // 8. Setup listeners
        setupEventListeners();
        
        setupContractListeners();
        const urlParams = new URLSearchParams(window.location.search);
        chipId = urlParams.get('chipId');
        handleChipId();
        
        const savedAccount = localStorage.getItem('userAccount');
        if (savedAccount) {
            userAccount = savedAccount;
            await connectWallet();
        }
    } catch (error) {
        console.error("Initialization failed:", error);
        updateStatus(`Error: ${error.message || error}`);
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
        // Handle network mismatch
    }
}

async function addBaseSepoliaNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_SEPOLIA_PARAMS]
        });
        updateStatus('Base Sepolia network added. Please switch to it.');
        checkNetwork();
    } catch (error) {
        updateStatus('Failed to add Base Sepolia network: ' + error.message);
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

async function handleChipId() {
    console.log('[ChipHandler] Processing chip ID from URL');
    try {
        const urlParams = new URLSearchParams(window.location.search);
        chipId = urlParams.get('chipId');
        
        if (chipId) {
            console.log('[ChipHandler] Detected chip ID in URL:', chipId);
            document.getElementById('chipIdDisplay').textContent = chipId;
            const mintButton = document.getElementById('mintNFT');
            const mintMessage = document.getElementById('mintMessage');
            const title = document.getElementById('invitationTitle');
            mintButton.disabled = false;
            mintButton.classList.remove('disabled-button');
            title.textContent = 'YOU ARE INVITED';
        } else {
            console.warn('[ChipHandler] No chip ID found in URL parameters');
            const mintButton = document.getElementById('mintNFT');
            const mintMessage = document.getElementById('mintMessage');
            const title = document.getElementById('invitationTitle');
            title.textContent = 'YOU WERE NOT INVITED';
            mintButton.disabled = true;
            mintButton.classList.add('disabled-button');
            mintMessage.textContent = 'You have not tapped in';
        }

        // Existing token checks with added logging
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        console.log('[ChipHandler] Token ID resolution:', { chipId, tokenId });
        
    } catch (error) {
        console.error('[ChipHandler] Error processing chip ID:', {
            chipId,
            error: error.message
        });
    }
}

function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
    document.getElementById('registerChip').addEventListener('click', registerChip);
    document.getElementById('mintNFT').addEventListener('click', mintNFT);
    document.getElementById('addBaseSepolia').addEventListener('click', addBaseSepoliaNetwork);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountChange);
        window.ethereum.on('chainChanged', () => window.location.reload());
    }

    contract.events.Transfer()
        .on('data', handleTransferEvent)
        .on('error', handleError);
}

function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else if (accounts[0] !== userAccount) {
        userAccount = accounts[0];
        checkIfAdmin();
    }
}

window.addEventListener('load', init);

async function updateChipsTable() {
    console.log('[ChipsTable] Starting table update');
    try {
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
        console.error('[ChipsTable] Critical update error:', {
            error: error.message,
            stack: error.stack
        });
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
