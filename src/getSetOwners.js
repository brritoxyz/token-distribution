const fs = require("fs");
const { RUMAS, FILEPATHS } = require("./constants");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

// The color with the lowest count (number of IDs) is the number of sets the owner has.
const getSetCount = (colorsToIds) =>
    Object.values(colorsToIds).sort((a, b) => {
        return a.length - b.length;
    })[0].length;

module.exports = () => {
    const owners = JSON.parse(fs.readFileSync(FILEPATHS.OWNERS));
    const metadata = JSON.parse(fs.readFileSync(FILEPATHS.METADATA));
    const formattedSetOwners = Object.keys(owners).reduce(
        (setOwners, ownerAddress) => {
            const { totalOwned, ownerOf } = owners[ownerAddress];

            // If the owner has less than 7 Rumas, skip since there's no possibility of a set.
            if (totalOwned < 7) return setOwners;

            const colorsToIds = ownerOf.reduce(
                (colors, id) => {
                    // Since the metadata is zero-indexed, and IDs start at 1, we need to deduct 1.
                    const metadataKey = id - 1;

                    // The first attribute is always the color trait.
                    const color =
                        metadata[metadataKey].attributes[
                            RUMAS.COLOR_ATTRIBUTES_INDEX
                        ].value;

                    // We're handling "None" colors (1 of 1s) manually to simplify the code.
                    if (color !== "None") colors[color].push(id);

                    return colors;
                },
                // Using the literal value, otherwise we'd have to do a deep clone of the variable to avoid referencing the same object.
                {
                    Red: [],
                    Purple: [],
                    Gold: [],
                    Black: [],
                    Green: [],
                    White: [],
                    Pink: [],
                }
            );

            return {
                ...setOwners,
                [ownerAddress]: {
                    totalSets: getSetCount(colorsToIds),
                    colorsToIds,
                },
            };
        },
        {}
    );

    fsWriteFileSyncJSON(FILEPATHS.SET_OWNERS, formattedSetOwners);
};
