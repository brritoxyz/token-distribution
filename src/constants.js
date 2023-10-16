const RUMAS = {
    CONTRACT_ADDRESS: "0xBaB2a8210F788E30972F085831498A01CF0C36E7",
    LAST_TOKEN_ID: 545,
    DEPLOYMENT_BLOCK_NUMBER: 17445467,
    CUTOFF_BLOCK_NUMBER: 18360406,
};

const ETHERSCAN_API = {
    // https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
    NORMAL_TRANSACTIONS: `https://api.etherscan.io/api?module=account&action=txlist&address=${RUMAS.CONTRACT_ADDRESS}&startblock=${RUMAS.DEPLOYMENT_BLOCK_NUMBER}&endblock=${RUMAS.CUTOFF_BLOCK_NUMBER}&page=1&offset=1000&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
};

const FILEPATHS = {
    OWNERS: `${__dirname}/data/owners.json`,
    TRANSACTIONS: `${__dirname}/data/transactions.json`,
};

module.exports = {
    RUMAS,
    ETHERSCAN_API,
    FILEPATHS,
};
