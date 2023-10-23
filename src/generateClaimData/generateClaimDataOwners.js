const owners = require("../data/owners.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("../constants");
const getMerkleClaimData = require("../utils/getMerkleClaimData");
const fsWriteFileSyncJSON = require("../utils/fsWriteFileSyncJSON");

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

    fsWriteFileSyncJSON(FILEPATHS.CLAIM_DATA_OWNERS, {
        ...getMerkleClaimData(ownerClaims),
        data: ownerClaims,
    });
})();
