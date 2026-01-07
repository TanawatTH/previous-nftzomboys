# Zomboys NFT

An old project consisting of a collection of zombie-themed characters. Each Zomboys is procedurally generated.

## Features

- **ERC-721 Compliant**: Standard NFT contract with full ownership and transfer capabilities.
- **Generative Art**: Unique zombie characters with randomized traits.
- **Whitelist Minting**: Presale access via Merkle tree proofs.
- **Royalty Enforcement**: Built-in creator royalties using EIP-2981.
- **Web Interface**: Mint and view your collection through a responsive React app.
- **Decentralized Storage**: Metadata and images stored on IPFS for permanence.

## Setup

1. **Clone the repository** and navigate to the project directory.
2. **Install dependencies**:
   ```
   npm install
   cd frontend && npm install
   ```
3. **Set up environment variables**:
   - Copy `.env.example` to `.env`.
   - Fill in your private key and Arbiscan API key.
4. **Compile the contracts**:
   ```
   npm run compile
   ```
5. **Run tests**:
   ```
   npm test
   ```

## Deployment

- **Testnet**: `npx hardhat run scripts/deploy.js --network arbitrumTestnet`
- **Mainnet**: `npx hardhat run scripts/deploy.js --network arbitrumMainnet`
- **Verify contract**: `node scripts/verify.js` (set CONTRACT_ADDRESS in .env)

## Generating Assets

- Run `python3 scripts/generate_metadata.py` to create sample images and metadata.
- Upload to IPFS using `node scripts/upload_ipfs.js`.
- Set the base URI: `node scripts/set_base_uri.js` (set BASE_URI in .env).

## Frontend

- Start the development server: `npm start`
- Access at `http://localhost:3000`
- Mint page: `/mint`
- Gallery: `/gallery`
- NFT details: `/nft/[id]`
