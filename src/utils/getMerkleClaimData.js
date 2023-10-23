const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

module.exports = (claimData) => {
    const tree = StandardMerkleTree.of(claimData, ["address", "uint256"]);
    const proofs = {};

    for (const [i, v] of tree.entries()) proofs[v[0]] = tree.getProof(i);

    return {
        root: tree.root,
        proofs,
    };
};
