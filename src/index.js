require("dotenv").config();

const getOwners = require("./getOwners");
const getTransactions = require("./getTransactions");
const getTesters = require("./getTesters");
const getMetadata = require("./getMetadata");
const getSetOwners = require("./getSetOwners");

if (process.env.RPC_URL === "" || process.env.ETHERSCAN_API_KEY === "")
    throw new Error("Environment variables are not configured.");

const runAsync = async () => {
    // Retrieve the list of Rumas NFT token holders at the time of the snapshot (1 block after the mint ended).
    await getOwners();

    // Retrieve the list of transactions that occurred during the beta test period which will be used for the airdrop.
    await getTransactions();

    // Get the beta test addresses and tally up their gas usage.
    await getTesters();

    // Retrieve the metadata for the minted Rumas NFTs.
    await getMetadata();

    // Get the number of sets owned by each address.
    await getSetOwners();

    console.log("All done!");
};

runAsync();
