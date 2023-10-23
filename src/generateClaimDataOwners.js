const fs = require("fs");
const owners = require("./data/owners.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("./constants");
const getMerkleClaimData = require("./utils/getMerkleClaimData");

(() => {
    const ownerClaims = Object.keys(owners).reduce(
        (ownerClaims, owner) => [
            ...ownerClaims,
            [
                owner,
                (
                    BigInt(owners[owner].totalOwned) * TOKEN_CLAIM_AMOUNTS.OWNER
                ).toString(),
            ],
        ],
        []
    );

    fs.writeFileSync(
        FILEPATHS.CLAIM_DATA_OWNERS,
        JSON.stringify({
            ...getMerkleClaimData(ownerClaims),
            data: ownerClaims,
        })
    );
})();
