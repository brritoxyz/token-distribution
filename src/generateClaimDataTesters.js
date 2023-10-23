const fs = require("fs");
const testers = require("./data/testers.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("./constants");
const getMerkleClaimData = require("./utils/getMerkleClaimData");

(() => {
    const allGasUsed = Object.values(testers).reduce(
        (allGasUsed, { totalGasUsed }) => (allGasUsed += BigInt(totalGasUsed)),
        BigInt(0)
    );
    const testerClaims = Object.keys(testers).reduce(
        (testerClaims, tester) => [
            ...testerClaims,
            [
                tester,
                (
                    (TOKEN_CLAIM_AMOUNTS.BETA_TESTERS_TOTAL *
                        BigInt(testers[tester].totalGasUsed)) /
                    allGasUsed
                ).toString(),
            ],
        ],
        []
    );

    fs.writeFileSync(
        FILEPATHS.CLAIM_DATA_TESTERS,
        JSON.stringify({
            ...getMerkleClaimData(testerClaims),
            data: testerClaims,
        })
    );
})();
