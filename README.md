# midnight-token-Dapp
 Midnight Token – Smart Contract & UI Demo

# Overview

This project demonstrates the creation and interaction of a **Midnight smart contract** using:
- **Compact** for contract definition and compilation
- **Witness + state transition logic** (no traditional on-chain deployment)
- A **browser-based UI** for wallet detection and transaction initiation

The purpose of this project is **educational**: to show how a smart contract is structured, compiled, and connected to a UI in a privacy-preserving blockchain environment.


## Project Structure
midnight-token/
├── contract/        # Smart contract & witness logic (Compact / TypeScript)
├── public/          # UI (index.html)
├── api/             # API helpers (if applicable)
├── bboard-cli/      # Midnight tooling (kept as reference)
├── package.json
└── README.md

📦 Prerequisites
Ensure the following are installed:

*Node.js (v18+ recommended, v20 preferred)
*npm
*Python 3
Compact (Midnight smart contract language)
*A Midnight-compatible browser wallet
*Modern browser (Chrome, Edge, or Firefox)


📘 Midnight Token DApp – Starter Guide

A complete starter template for building a Midnight Token DApp using Compact smart contracts, a TypeScript/Node.js backend, and a simple frontend interface.
This project is designed for learning, workshops, and guided development sessions within the Midnight (Cardano ecosystem) environment.

🔍 What This Project Demonstrates

Midnight smart contract development using Compact
Zero-knowledge circuit compilation
Wallet detection and interaction (simulated)
TypeScript backend with Express
Frontend integration
Full local development workflow


📦 Prerequisites
Ensure you have the following installed:
Terminal / Command Line
Internet connection
Node.js v20+
npm
Git
Basic understanding of JavaScript / TypeScript


🛠 Environment Setup
1️⃣ Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc


2️⃣ Install and Use Node.js 20
nvm install 20
nvm use 20
node -v
npm -v


📁 Project Initialization

Navigate to your project folder:

cd ~/workspace/repo


Install Midnight dependencies:

npm install @midnight-ntwrk/wallet-api
npm install @midnight-ntwrk/compact-runtime
npm install @midnight-ntwrk/ledger
npm install --save-dev @types/node



🧩 Install Compact (Midnight Developer Tools)
Install Compact CLI
curl --proto '=https' --tlsv1.2 -LsSf \
https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh



Add Compact to PATH:

export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc



Install compiler version:

compact update 0.26.0
compact --version

🏗 Project Structure
workspace/repo/
├── contract/
│   ├── src/
│   │   └── token.compact
│   └── artifacts/
├── src/
│   └── server.ts
├── public/
│   └── index.html
├── dist/
├── package.json
└── tsconfig.json

🧠 Smart Contract (Compact)

The contract defines basic token circuits:
mint
burn
transfer
getBalance
getTotalSupply
Compile the contract:

compact compile contract/src/token.compact contract/artifacts/




⚙ Backend (Node.js + TypeScript)
Compile TypeScript:
npx tsc


Start the server:
npm start


Server runs at:
http://localhost:8080

🎨 Frontend
Simple HTML interface
Wallet connect simulation
Token mint interaction
Server health check


Open in browser:
http://localhost:8080

✅ Verification Checklist
Node.js v20+ installed
Compact installed and accessible
Contracts compile successfully
TypeScript builds without errors
Server starts correctly
UI loads in browser



🚀 Next Steps
Integrate real Midnight wallet APIs
Deploy contracts to Midnight testnet
Implement real transaction signing
Extend UI and contract logic


Running the Compiled Smart Contract
After installation and compilation, the Compact smart contract outputs JavaScript and type definition files that can be consumed by the host or UI layer.
Compile the Contract
From the project root:
npx tsc -p tsconfig.json


This compiles the contract source files located in:

contract/src/


into:
contract/dist/
Expected Output
After compilation, you should see files similar to:
contract/dist/
├── index.js
├── index.d.ts
├── index.js.map
├── token.compact
└── managed/



📚 Resources

Midnight Docs: https://docs.midnight.network
Compact Language: https://docs.midnight.network/develop/compact
