const fs = require("fs");
const owners = require("./data/owners.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("./constants");

(() => {
    const ownerClaims = Object.keys(owners).reduce((ownerClaims, owner) => {
        return [
            ...ownerClaims,
            [
                owner,
                (
                    BigInt(owners[owner].totalOwned) * TOKEN_CLAIM_AMOUNTS.OWNER
                ).toString(),
            ],
        ];
    }, []);

    fs.writeFileSync(FILEPATHS.CLAIM_DATA_OWNERS, JSON.stringify(ownerClaims));
})();
