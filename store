// Constants and initial setup
let web3;
let contract;
let userAccount;
let chipId;

const CONTRACT_ADDRESS = '0x05742B249a116b57Ba0469086B5D68fF0e042Bf6';
const BASE_SEPOLIA_CHAIN_ID = '85188';
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

// Duplicate declaration removed

// Update checkIfAdmin function
async function checkIfAdmin() {
    console.log("Checking admin status...");
    try {
        const isAdmin = userAccount.toLowerCase() === ADMIN_ADDRESS.toLowerCase();
        console.log("Current user:", userAccount);
        console.log("Admin address:", ADMIN_ADDRESS);
        console.log("Is admin:", isAdmin);
        
        if (isAdmin) {
            document.getElementById('adminSection').style.display = 'block';
            // Additional admin-specific UI updates
        }
        
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

// Add at top with other constants
const ADMIN_ADDRESS = '0x1705280ae174a96bac66d3b10caee15a19c61eba';

// Update handleChipId function
async function handleChipId() {
    const mintButton = document.getElementById('mintNFT');
    const mintMessage = document.getElementById('mintMessage');
    const invitationTitle = document.getElementById('invitationTitle');
    const tokenInfo = document.getElementById('tokenInfo');
    const ownerInfo = document.getElementById('ownerInfo');

    if (!chipId) {
        invitationTitle.textContent = 'YOU WERE NOT INVITED';
        mintButton.classList.add('disabled-button');
        mintButton.disabled = true;
        mintMessage.textContent = 'No chip detected';
        tokenInfo.textContent = '';
        ownerInfo.textContent = '';
        return;
    }

    try {
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        console.log("Token ID for chip:", tokenId);

        if (tokenId == 0) {
            invitationTitle.textContent = 'CHIP NOT REGISTERED';
            mintButton.classList.add('disabled-button');
            mintButton.disabled = true;
            mintMessage.textContent = 'This chip is not registered';
            tokenInfo.textContent = '';
            ownerInfo.textContent = '';
            return;
        }

        const tokenIdMinted = await contract.methods.tokenIdMinted(tokenId).call();
        console.log("Token ID Minted Status:", tokenIdMinted);

        if (tokenIdMinted) {
            const owner = await contract.methods.ownerOf(tokenId).call();
            invitationTitle.textContent = 'NFT ALREADY CLAIMED';
            tokenInfo.textContent = `Token ID: ${tokenId}`;
            ownerInfo.textContent = `Owned by: ${owner.slice(0,6)}...${owner.slice(-4)}`;
            mintButton.classList.add('disabled-button');
            mintButton.disabled = true;
            mintMessage.textContent = 'This NFT has already been claimed';
        } else {
            invitationTitle.textContent = 'YOU ARE INVITED';
            tokenInfo.textContent = `Token ID: ${tokenId}`;
            ownerInfo.textContent = '';
            mintButton.classList.remove('disabled-button');
            mintButton.disabled = false;
            mintMessage.textContent = 'Ready to mint';
        }
    } catch (error) {
        console.error("Error handling chip ID:", error);
        updateStatus('Error checking chip status: ' + error.message);
    }
}


// Add network check and switch function
async function ensureCorrectNetwork() {
    try {
        const chainId = await web3.eth.getChainId();
        if (chainId !== parseInt(BASE_SEPOLIA_CHAIN_ID)) {
            console.log("Wrong network, switching to Base Sepolia...");
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x14CC4' }], // Base Sepolia Chain ID in hex
            });
            return true;
        }
        return true;
    } catch (error) {
        if (error.code === 4902) { // Chain not added
            try {
                await addBaseSepoliaNetwork();
                return true;
            } catch (addError) {
                console.error("Failed to add network:", addError);
                return false;
            }
        }
        console.error("Network switch error:", error);
        return false;
    }
}

// Update mintNFT function
async function mintNFT() {
    console.log("Starting mint process...");
    updateStatus('Checking mint status...');
    
    if (!chipId) {
        updateStatus('No chip ID detected');
        return;
    }

    try {
        // Check minting status first
        const status = await checkMintedStatus(chipId);
        
        if (status.isMinted) {
            updateStatus('This chip has already been minted');
            document.getElementById('mintNFT').classList.add('disabled-button');
            document.getElementById('mintNFT').disabled = true;
            return;
        }

        // Ensure correct network
        const networkValid = await ensureCorrectNetwork();
        if (!networkValid) {
            throw new Error('Please switch to Base Sepolia network');
        }

        // Proceed with minting
        const gasEstimate = await contract.methods.mintNFT(chipId).estimateGas({
            from: userAccount
        });

        await contract.methods.mintNFT(chipId)
            .send({
                from: userAccount,
                gas: Math.round(gasEstimate * 1.2)
            })
            .on('transactionHash', (hash) => {
                console.log("Minting transaction:", hash);
                updateStatus('Minting in progress...');
            })
            .on('receipt', (receipt) => {
                console.log("Mint successful:", receipt);
                updateStatus('NFT minted successfully!');
                document.getElementById('mintNFT').classList.add('disabled-button');
                document.getElementById('mintNFT').disabled = true;
            })
            .on('error', (error) => {
                throw error;
            });

    } catch (error) {
        console.error("Minting failed:", error);
        updateStatus('Minting failed: ' + error.message);
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
        setupEventListeners();
        setupContractListeners();
        
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
        const totalSupply = await contract.methods.totalSupply().call();
        console.log("Total supply:", totalSupply);
        
        const registeredChips = [];
        for (let i = 1; i <= totalSupply; i++) {
            try {
                const tokenIdMinted = await contract.methods.tokenIdMinted(i).call();
                registeredChips.push({
                    tokenId: i,
                    minted: tokenIdMinted
                });
            } catch (error) {
                console.error(`Error fetching token ${i}:`, error);
            }
        }
        
        console.log("Registered chips:", registeredChips);
        return registeredChips;
    } catch (error) {
        console.error("Error in getRegisteredChips:", error);
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

// Add event listeners for contract events
function setupEventListeners() {
    contract.events.Transfer()
        .on('data', async (event) => {
            console.log("Transfer event:", event);
            await displayRegisteredChips();
        })
        .on('error', console.error);
}

async function displayAdminChips() {
    const chipsListDiv = document.getElementById('chipsList');
    try {
        const totalSupply = await contract.methods.totalSupply().call();
        console.log("Total supply:", totalSupply);
        
        let tableHTML = `
            <table class="chips-table">
                <thead>
                    <tr>
                        <th>Chip ID</th>
                        <th>Token ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        for (let i = 1; i <= totalSupply; i++) {
            const tokenIdMinted = await contract.methods.tokenIdMinted(i).call();
            tableHTML += `
                <tr>
                    <td>${chipId || 'N/A'}</td>
                    <td>${i}</td>
                    <td class="${tokenIdMinted ? 'status-minted' : 'status-unminted'}">
                        ${tokenIdMinted ? 'Minted' : 'Available'}
                    </td>
                </tr>
            `;
        }
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        chipsListDiv.innerHTML = tableHTML;
    } catch (error) {
        console.error("Error displaying admin chips:", error);
        chipsListDiv.innerHTML = '<p>Error loading chip data</p>';
    }
}

// Improved handleChipId function with contract interaction
async function handleChipId() {
    if (!chipId) return;
    
    try {
        const tokenId = await contract.methods.chipToTokenId(chipId).call();
        const tokenMinted = await contract.methods.tokenIdMinted(tokenId).call();
        
        updateMintingUI(tokenId, tokenMinted);
    } catch (error) {
        console.error("Error handling chip:", error);
        updateStatus('Error checking chip status');
    }
}

// Helper function to update UI based on minting status
function updateMintingUI(tokenId, isMinted) {
    const mintButton = document.getElementById('mintNFT');
    const mintMessage = document.getElementById('mintMessage');
    const title = document.getElementById('invitationTitle');
    
    if (tokenId && !isMinted) {
        title.textContent = 'YOU ARE INVITED';
        mintButton.disabled = false;
        mintButton.classList.remove('disabled-button');
        mintMessage.textContent = 'Ready to mint';
    } else if (isMinted) {
        title.textContent = 'ALREADY CLAIMED';
        mintButton.disabled = true;
        mintButton.classList.add('disabled-button');
        mintMessage.textContent = 'This NFT has been claimed';
    } else {
        title.textContent = 'NOT INVITED';
        mintButton.disabled = true;
        mintButton.classList.add('disabled-button');
        mintMessage.textContent = 'No valid chip detected';
    }
}

// Event listeners setup
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
    document.getElementById('mintNFT').addEventListener('click', mintNFT);
    document.getElementById('registerChip').addEventListener('click', registerChip);
    
    // MetaMask events
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountChange);
        window.ethereum.on('chainChanged', handleChainChange);
    }
}

// Contract event listeners
function setupContractListeners() {
    contract.events.Transfer()
        .on('data', async (event) => {
            console.log("Transfer event:", event);
            await handleChipId();
        })
        .on('error', console.error);
}

// Initialize on page load
window.addEventListener('load', init);