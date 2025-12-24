# midnight-token-Dapp

# Midnight Token – Smart Contract & UI Demo

## Overview

This project demonstrates the creation and interaction of a **Midnight smart contract** using:
- **Compact** for contract definition and compilation
- **Witness + state transition logic** (no traditional on-chain deployment)
- A **browser-based UI** for wallet detection and transaction initiation

The purpose of this project is **educational**: to show how a smart contract is structured, compiled, and connected to a UI in a privacy-preserving blockchain environment.

---

## Project Structure

```text
midnight-token/
├── contract/        # Smart contract & witness logic (Compact / TypeScript)
├── public/          # UI (index.html)
├── api/             # API helpers (if applicable)
├── bboard-cli/      # Midnight tooling (kept as reference)
├── package.json
└── README.md
Prerequisites
Ensure the following are installed:

Node.js (v18+ recommended)

npm

Compact (Midnight smart contract language)

A Midnight-compatible browser wallet

Installing Compact
Install Compact globally:

bash
Copy code
npm install -g @midnight-ntwrk/compact
Verify installation:

bash
Copy code
compact --version
Smart Contract Compilation
Navigate to the contract directory:

bash
Copy code
cd contract
Compile the smart contract:

bash
Copy code
npm run build
Expected result:

TypeScript compiles successfully

dist/ directory is generated

This proves the contract logic and witness definitions compile correctly

⚠️ Note: Midnight contracts do not deploy in the traditional sense.
Logic is enforced through witnesses and state transitions, not persistent on-chain contracts.

Witness & State Transition Logic (Conceptual)
The witness proves a user satisfies contract conditions

The state transition defines how contract state evolves

Wallets generate and sign witnesses using zero-knowledge proofs

The network validates proofs without exposing private data

This project focuses on correct structure and interaction, not mainnet deployment.

Running the UI
The UI is a static frontend that:

Detects installed Midnight wallets

Connects to the wallet

Initiates minting / transaction flows

Steps
Navigate to the UI directory:

bash
Copy code
cd public
Start a local HTTP server:

bash
Copy code
python3 -m http.server 8090
Open in browser:

text
Copy code
http://localhost:8090
Wallet Detection Behavior
Wallet detection is browser-based

Only wallets installed in the current browser will appear

Different browsers (Chrome, Edge, Firefox) have different wallet visibility

This is expected and correct behavior

About Minting & Transactions
Minting currently works in a local/testing context

Transactions are constructed and signed by the wallet

If no network is connected, transactions may not appear in public explorers

This does not mean the logic is fake — it means the project is running in development mode

Hosting & Sharing
This project can be hosted via:

GitHub Pages

Any static hosting service

When shared:

Wallet detection depends on the viewer’s browser

Each user only sees their own installed wallets

Academic Note
This project represents:

A first smart contract implementation

A foundation for future features

A demonstration of real blockchain architecture, not a finished production dApp











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


If index.js exists, the contract compiled successfully.

Running / Testing the Contract Output

The compiled contract can now be:

Imported into a host application

Used by a witness or runtime layer

Referenced by the UI for interaction logic

Example import (Node / Host):

import * as TokenContract from "./contract/dist/index.js";


No deployment is performed at this stage — this repository is intended for local testing, compilation verification, and UI integration.

Running the Frontend UI

The UI in this repository is a static HTML frontend intended to demonstrate interaction flow.

Serve the UI Locally

From the project root:

python3 -m http.server 8080 --directory public


Then open in your browser:

http://localhost:8080


If the page loads without errors, the UI is working correctly.
