const BigNumber = require("bignumber.js");
const owners = require("./data/owners.json");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");
const { FILEPATHS } = require("./constants");

const ownerAddresses = Object.keys(owners);
const totalRumas = ownerAddresses.reduce(
    (acc, val) => acc + owners[val].totalOwned,
    0
);

// brrito.eth's ETH balance (in wei) at block #20434428.
const totalRefund = "5315596209792987558";

// The ETH $ value at block #20434428.
const ethPrice = "3146.64";

fsWriteFileSyncJSON(
    FILEPATHS.RUMAS_REFUND,
    ownerAddresses.reduce((acc, val) => {
        const refundAmount = new BigNumber(totalRefund)
            .multipliedBy(owners[val].totalOwned)
            .dividedBy(totalRumas);

        return {
            ...acc,
            [val]: {
                refundValue: `$${refundAmount
                    .dividedBy(1e18)
                    .multipliedBy(ethPrice)
                    .toFixed(2)}`,
                refundAmount: refundAmount.toFixed(0),
                formattedRefundAmount: refundAmount.dividedBy(1e18).toFixed(18),
                totalOwned: owners[val].totalOwned,
            },
        };
    }, {})
);
