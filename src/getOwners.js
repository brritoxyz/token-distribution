const fs = require('fs');
const { RUMAS, FILEPATHS } = require('./constants');

module.exports = async (contractInstance) => {
  const owners = {};

  for (let i = 1; i <= RUMAS.LAST_TOKEN_ID; ++i) {
    let owner = await contractInstance.read.ownerOf({
      args: [i],
      blockNumber: RUMAS.CUTOFF_BLOCK_NUMBER,
    });

    // If the token was burned/refunded or redeemed, skip it (the latter was only done by our team).
    if (
      owner === '0x000000000000000000000000000000000000dEaD' ||
      owner === '0x0000000000000000000000000000000000000000'
    )
      continue;

    // Get the actual owner if the token is listed (i.e. the Rumas contract is custodying it).
    if (owner === RUMAS.CONTRACT_ADDRESS) {
      owner = (
        await contractInstance.read.listings({
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

  fs.writeFileSync(FILEPATHS.OWNERS, JSON.stringify(owners));
};
