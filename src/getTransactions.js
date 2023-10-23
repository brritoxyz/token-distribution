const { get } = require("axios");
const { ETHERSCAN_API, FILEPATHS } = require("./constants");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

module.exports = async () => {
    const { data } = await get(ETHERSCAN_API.NORMAL_TRANSACTIONS);

    fsWriteFileSyncJSON(
        FILEPATHS.TRANSACTIONS,
        data.result.map((_data) => {
            // Omit the `confirmations` field since it's not a constant.
            // eslint-disable-next-line no-unused-vars
            const { confirmations, ...dataWithConfsOmitted } = _data;

            return dataWithConfsOmitted;
        })
    );
};
