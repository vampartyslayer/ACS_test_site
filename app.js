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

async function connectWallet() {
    console.log("Attempting to connect wallet...");
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Wallet connected:", userAccount);
            updateStatus('Wallet connected: ' + userAccount);
            document.getElementById('connectWallet').style.display = 'none';
            document.getElementById('disconnectWallet').style.display = 'block';
            document.getElementById('userSection').style.display = 'block';
            checkIfAdmin();
        } catch (error) {
            console.error('Detailed error:', error);
            updateStatus('Failed to connect wallet: ' + error.message);
        }
    } else {
        updateStatus('MetaMask is not installed. Please install it to connect your wallet.');
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

async function addBaseSepoliaNetwork() {
    try {
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_SEPOLIA_PARAMS],
        });
        updateStatus('Base Sepolia network added. Please switch to it.');
    } catch (error) {
        updateStatus('Failed to add Base Sepolia network: ' + error.message);
        console.error('Error adding Base Sepolia network:', error);
    }
}

async function checkIfAdmin() {
    console.log("Checking if user is admin...");
    try {
        if (contract.methods.owner) {
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
            let chipId = null;
            for (let key in contract.methods.chipToTokenId) {
                const tokenId = await contract.methods.chipToTokenId(key).call();
                if (tokenId == i) {
                    chipId = key;
                    break;
                }
            }
            const tokenIdMinted = await contract.methods.tokenIdMinted(i).call();
            registeredChips.push({ chipId: chipId || "Unknown", tokenId: i, minted: tokenIdMinted });
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
    const chipIdToRegister = document.getElementById('chipIdRegister').value.trim(); // Trim any leading/trailing spaces
    if (!chipIdToRegister) {
        updateStatus('Chip ID cannot be empty.');
        return;
    }
    try {
        const owner = await contract.methods.owner().call();
        console.log("Contract owner:", owner);
        console.log("Current user:", userAccount);

        if (userAccount.toLowerCase() !== owner.toLowerCase()) {
            throw new Error("Only the contract owner can register chips.");
        }

        const networkId = await web3.eth.net.getId();
        console.log("Current network ID:", networkId);
        if (parseInt(networkId, 10) !== parseInt(BASE_SEPOLIA_CHAIN_ID, 10)) {
            throw new Error("Please switch to the Base Sepolia network.");
        }

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

        await contract.methods.mintNFT(chipId).send({ from: userAccount });
        console.log("NFT minted successfully");
        updateStatus('NFT minted successfully!');
    } catch (error) {
        console.error("Error minting NFT:", error);
        updateStatus('Failed to mint NFT: ' + error.message);
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


