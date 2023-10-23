const fs = require("fs");
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const owners = require("./data/owners.json");
const { TOKEN_CLAIM_AMOUNTS, FILEPATHS } = require("./constants");

(() => {
    const ownerClaims = Object.keys(owners).reduce(
        (ownerClaims, owner) => [
            ...ownerClaims,
            [
                owner,
                (
                    BigInt(owners[owner].totalOwned) * TOKEN_CLAIM_AMOUNTS.OWNER
                ).toString(),
            ],
        ],
        []
    );
    const tree = StandardMerkleTree.of(ownerClaims, ["address", "uint256"]);
    const proofs = {};

    for (const [i, v] of tree.entries()) proofs[v[0]] = tree.getProof(i);

    fs.writeFileSync(
        FILEPATHS.CLAIM_DATA_OWNERS,
        JSON.stringify({ root: tree.root, proofs, data: ownerClaims })
    );
})();
