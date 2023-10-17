const RUMAS = {
    CONTRACT_ADDRESS: "0xBaB2a8210F788E30972F085831498A01CF0C36E7",
    LAST_TOKEN_ID: 545,
    DEPLOYMENT_BLOCK_NUMBER: 17445467,
    CUTOFF_BLOCK_NUMBER: 18360406,
    METADATA_IPFS:
        "https://turquoise-mean-galliform-886.mypinata.cloud/ipfs/QmZcxuBeDHJektLRXVASi4gWe2oB7Q6ZcySNgqu6S1Bwq3?_gl=1*o1u6fn*_ga*MTg4NjExMTc3Ny4xNjk3NDY2Nzg3*_ga_5RMPXG14TE*MTY5NzU0ODMzNC40LjAuMTY5NzU0ODMzNS41OS4wLjA.",
};

const ETHERSCAN_API = {
    // https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
    NORMAL_TRANSACTIONS: `https://api.etherscan.io/api?module=account&action=txlist&address=${RUMAS.CONTRACT_ADDRESS}&startblock=${RUMAS.DEPLOYMENT_BLOCK_NUMBER}&endblock=${RUMAS.CUTOFF_BLOCK_NUMBER}&page=1&offset=1000&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
};

const FILEPATHS = {
    OWNERS: `${__dirname}/data/owners.json`,
    TESTERS: `${__dirname}/data/testers.json`,
    TRANSACTIONS: `${__dirname}/data/transactions.json`,
    METADATA: `${__dirname}/data/metadata.json`,
};

module.exports = {
    RUMAS,
    ETHERSCAN_API,
    FILEPATHS,
};
