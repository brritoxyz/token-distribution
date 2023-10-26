const testers = require("../data/testers.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("../constants");
const getMerkleClaimData = require("../utils/getMerkleClaimData");
const fsWriteFileSyncJSON = require("../utils/fsWriteFileSyncJSON");

(() => {
    const allGasUsed = Object.values(testers).reduce(
        (allGasUsed, { totalGasUsed }) => (allGasUsed += BigInt(totalGasUsed)),
        BigInt(0)
    );
    const testerClaims = Object.keys(testers).map((tester) => [
        tester,
        (
            (TOKEN_CLAIM_AMOUNTS.BETA_TESTERS_TOTAL *
                BigInt(testers[tester].totalGasUsed)) /
            allGasUsed
        ).toString(),
    ]);

    fsWriteFileSyncJSON(FILEPATHS.CLAIM_DATA_TESTERS, {
        ...getMerkleClaimData(testerClaims),
        data: testerClaims,
    });
})();
