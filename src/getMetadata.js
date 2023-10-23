const { get } = require("axios");
const { RUMAS, FILEPATHS } = require("./constants");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

module.exports = async () => {
    const { data } = await get(RUMAS.METADATA_IPFS);

    fsWriteFileSyncJSON(FILEPATHS.METADATA, data);
};
