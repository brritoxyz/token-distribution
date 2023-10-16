require("dotenv").config();

const { createPublicClient, getContract, http } = require("viem");
const { mainnet } = require("viem/chains");
const { RUMAS } = require("./constants");
const collectionAbi = require("./abi/collection.json");
const getOwners = require("./getOwners");

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
