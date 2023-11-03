const owners = require("./data/owners.json");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");
const { FILEPATHS } = require("./constants");

(() =>
    fsWriteFileSyncJSON(
        FILEPATHS.RUMAS_AIRDROP,
        Object.keys(owners).reduce(
            (acc, owner) => {
                const newRecipients = [];
                const newTokenIds = [];

                owners[owner].ownerOf.forEach((id) => {
                    newRecipients.push(owner);
                    newTokenIds.push(id);
                });

                return {
                    initialTokenRecipients: [
                        ...acc.initialTokenRecipients,
                        ...newRecipients,
                    ],
                    initialTokenIds: [...acc.initialTokenIds, ...newTokenIds],
                };
            },
            {
                initialTokenRecipients: [],
                initialTokenIds: [],
            }
        )
    ))();
