const fs = require("fs");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("./constants");
const getMerkleClaimData = require("./utils/getMerkleClaimData");

(() => {
    // Please reference src/data/owners.json for verifying the below.
    const uniqueOwnerClaims = [
        // #69: Mystery.
        [
            "0x75d415edcB3c3782E5952470821e983f9053a209",
            TOKEN_CLAIM_AMOUNTS.UNIQUE_OWNER.toString(),
        ],
        // #420: Anatomy.
        [
            "0x903f84fb1DfaCEfdAC0DEa758d58DF0FF5f71ffe",
            TOKEN_CLAIM_AMOUNTS.UNIQUE_OWNER.toString(),
        ],
    ];

    fs.writeFileSync(
        FILEPATHS.CLAIM_DATA_UNIQUE_OWNERS,
        JSON.stringify({
            ...getMerkleClaimData(uniqueOwnerClaims),
            data: uniqueOwnerClaims,
        })
    );
})();
