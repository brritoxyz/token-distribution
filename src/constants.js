const RUMAS = {
    CONTRACT_ADDRESS: "0xBaB2a8210F788E30972F085831498A01CF0C36E7",
    LAST_TOKEN_ID: 545,
    DEPLOYMENT_BLOCK_NUMBER: 17445467,
    CUTOFF_BLOCK_NUMBER: 18360406,
    METADATA_IPFS:
        "https://turquoise-mean-galliform-886.mypinata.cloud/ipfs/QmZcxuBeDHJektLRXVASi4gWe2oB7Q6ZcySNgqu6S1Bwq3?_gl=1*o1u6fn*_ga*MTg4NjExMTc3Ny4xNjk3NDY2Nzg3*_ga_5RMPXG14TE*MTY5NzU0ODMzNC40LjAuMTY5NzU0ODMzNS41OS4wLjA.",
    COLOR_ATTRIBUTES_INDEX: 0,
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
    SET_OWNERS: `${__dirname}/data/setOwners.json`,
    CLAIM_DATA_OWNERS: `${__dirname}/claimData/owners.json`,
    CLAIM_DATA_SET_OWNERS: `${__dirname}/claimData/setOwners.json`,
    CLAIM_DATA_UNIQUE_OWNERS: `${__dirname}/claimData/uniqueOwners.json`,
    CLAIM_DATA_TESTERS: `${__dirname}/claimData/testers.json`,
    RUMAS_AIRDROP: `${__dirname}/airdropData/index.json`,
    RUMAS_REFUND: `${__dirname}/refundData/index.json`,
};

// Multiplied against reward amounts to account for the token's 18 decimals.
const TOKEN_DECIMAL_PRECISION = BigInt(1e18);

const TOKEN_CLAIM_AMOUNTS = {
    // Multiply to avoid precision loss.
    OWNER: BigInt(77_763) * TOKEN_DECIMAL_PRECISION,
    SET_OWNER: BigInt(155_526) * TOKEN_DECIMAL_PRECISION,
    // This is a special bonus to owners of 1 of 1s ("uniques") which was previously promised.
    // There are only 2 so they will be handled manually.
    // BigInt(155_526) * TOKEN_DECIMAL_PRECISION.
    UNIQUE_OWNER: "155526000000000000000000",
    // This is split proportionately amongst *all* beta testers based on their share of the total gas usage.
    BETA_TESTERS_TOTAL: BigInt(10_000_000) * TOKEN_DECIMAL_PRECISION,
};

module.exports = {
    RUMAS,
    ETHERSCAN_API,
    FILEPATHS,
    TOKEN_CLAIM_AMOUNTS,
};
