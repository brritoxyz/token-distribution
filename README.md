# J.Page Token Distribution

Software versions:
- Node  v18.16.0
- NPM   v9.5.1

---

To fetch and compile token distribution data:
1. Run `npm i` to install project dependencies.
2. Create a new .env file (reference .env.example) and define the environment variables.
3. Run `npm start` to fetch and compile token distribution data.

NOTE: Complete the steps above before proceeding.

To generate the merkle roots and proofs used in carrying out token claims:
1. Run `node src/generateClaimData`.

To generate the list of Rumas NFT airdrop recipients and the token IDs:
1. Run `node src/generateRumasAirdrop`.
