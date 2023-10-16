const fs = require("fs");
const { get } = require("axios");
const { ETHERSCAN_API, FILEPATHS } = require("./constants");

module.exports = async () => {
    const { data } = await get(ETHERSCAN_API.NORMAL_TRANSACTIONS);

    fs.writeFileSync(
        FILEPATHS.TRANSACTIONS,
        JSON.stringify(data.result)
    );
};
