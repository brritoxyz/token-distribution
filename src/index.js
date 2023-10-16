require('dotenv').config();

const { createPublicClient, getContract, http } = require('viem');
const { mainnet } = require('viem/chains');
const { RUMAS } = require('./constants');
const collectionAbi = require('./abi/collection.json');

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
