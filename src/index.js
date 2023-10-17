require("dotenv").config();

const { createPublicClient, getContract, http } = require("viem");
const { mainnet } = require("viem/chains");
const { RUMAS } = require("./constants");
const collectionAbi = require("./abi/collection.json");
const getOwners = require("./getOwners");
const getTransactions = require("./getTransactions");
const getTesters = require("./getTesters");
const getMetadata = require("./getMetadata");

const client = createPublicClient({
    chain: mainnet,
    transport: http(process.env.RPC_URL),
    batch: { multicall: true },
});

const collectionContract = getContract({
    address: RUMAS.CONTRACT_ADDRESS,
    abi: collectionAbi,
    publicClient: client,
});

// Retrieve the list of Rumas NFT token holders at the time of the snapshot (1 block after the mint ended).
getOwners(collectionContract);

// Retrieve the list of transactions that occurred during the beta test period which will be used for the airdrop.
getTransactions();

// Get the beta test addresses and tally up their gas usage.
getTesters();

// Retrieve the metadata for the minted Rumas NFTs.
getMetadata();
