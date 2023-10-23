const fs = require("fs");
const { FILEPATHS } = require("./constants");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

module.exports = () => {
    const transactions = JSON.parse(fs.readFileSync(FILEPATHS.TRANSACTIONS));
    const data = transactions.reduce((testers, { hash, from, gasUsed }) => {
        // Exclude transactions from the following team addresses.
        if (
            from === "0x6cd1d5a560aa5f2dfa571cd2dfa0b5a165362331" ||
            from === "0x8fcc36cca8de6e5d6c44d4de5f8fbca86742e0af" ||
            from === "0x9c9dc2110240391d4bee41203bdfbd19c279b429"
        )
            return testers;

        gasUsed = parseInt(gasUsed);

        if (!testers[from]) {
            testers[from] = {
                totalGasUsed: gasUsed,
                transactions: [hash],
            };
        } else {
            testers[from].totalGasUsed += gasUsed;
            testers[from].transactions.push(hash);
        }

        return testers;
    }, {});

    fsWriteFileSyncJSON(FILEPATHS.TESTERS, data);
};
