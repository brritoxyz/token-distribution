const fs = require("fs");
const { get } = require("axios");
const { RUMAS, FILEPATHS } = require("./constants");

module.exports = async () => {
    const { data } = await get(RUMAS.METADATA_IPFS);

    fs.writeFileSync(FILEPATHS.METADATA, JSON.stringify(data));
};
