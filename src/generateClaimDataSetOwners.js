const fs = require("fs");
const setOwners = require("./data/setOwners.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("./constants");
const getMerkleClaimData = require("./utils/getMerkleClaimData");

(() => {
    const setOwnerClaims = Object.keys(setOwners).reduce(
        (setOwnerClaims, setOwner) =>
            // Exclude owners with 7 or more Rumas but zero sets.
            setOwners[setOwner].totalSets === 0
                ? setOwnerClaims
                : [
                      ...setOwnerClaims,
                      [
                          setOwner,
                          (
                              BigInt(setOwners[setOwner].totalSets) *
                              TOKEN_CLAIM_AMOUNTS.SET_OWNER
                          ).toString(),
                      ],
                  ],
        []
    );

    fs.writeFileSync(
        FILEPATHS.CLAIM_DATA_SET_OWNERS,
        JSON.stringify({
            ...getMerkleClaimData(setOwnerClaims),
            data: setOwnerClaims,
        })
    );
})();
