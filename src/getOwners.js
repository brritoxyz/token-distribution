const { createPublicClient, getContract, http } = require("viem");
const { mainnet } = require("viem/chains");
const collectionAbi = require("./abi/collection.json");
const { RUMAS, FILEPATHS } = require("./constants");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

module.exports = async () => {
    const collectionContract = getContract({
        address: RUMAS.CONTRACT_ADDRESS,
        abi: collectionAbi,
        publicClient: createPublicClient({
            chain: mainnet,
            transport: http(process.env.RPC_URL),
        }),
    });
    const owners = {};

    for (let i = 1; i <= RUMAS.LAST_TOKEN_ID; ++i) {
        let owner = await collectionContract.read.ownerOf({
            args: [i],
            blockNumber: RUMAS.CUTOFF_BLOCK_NUMBER,
        });

        // If the token was burned/refunded or redeemed, skip it (the latter was only done by our team).
        if (
            owner === "0x000000000000000000000000000000000000dEaD" ||
            owner === "0x0000000000000000000000000000000000000000"
        )
            continue;

        // Get the actual owner if the token is listed (i.e. the Rumas contract is custodying it).
        if (owner === RUMAS.CONTRACT_ADDRESS) {
            owner = (
                await collectionContract.read.listings({
                    args: [i],
                    blockNumber: RUMAS.CUTOFF_BLOCK_NUMBER,
                })
            )[0];
        }

        if (!owners[owner]) {
            owners[owner] = {
                totalOwned: 1,
                ownerOf: [i],
            };
        } else {
            ++owners[owner].totalOwned;

            owners[owner].ownerOf.push(i);
        }
    }

    fsWriteFileSyncJSON(FILEPATHS.OWNERS, owners);
};
