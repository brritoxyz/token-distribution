const setOwners = require("../data/setOwners.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("../constants");
const getMerkleClaimData = require("../utils/getMerkleClaimData");
const fsWriteFileSyncJSON = require("../utils/fsWriteFileSyncJSON");

(() => {
    const setOwnerClaims = Object.keys(setOwners).map((setOwner) => [
        setOwner,
        (
            BigInt(setOwners[setOwner].totalSets) *
            TOKEN_CLAIM_AMOUNTS.SET_OWNER
        ).toString(),
    ]);

    fsWriteFileSyncJSON(FILEPATHS.CLAIM_DATA_SET_OWNERS, {
        ...getMerkleClaimData(setOwnerClaims),
        data: setOwnerClaims,
    });
})();
