import { witnesses, stateTransitions, initialPrivateState } from './dist/index.js';
import type { PrivateState } from './dist/index.js';

// Simulate a simple ledger
type Ledger = any;

let privateState: PrivateState = { ...initialPrivateState };
let ledger: Ledger = {};

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

console.log("🚀 Starting Token Simulation...\n");

// 1️⃣ Mint tokens
const mintAmount = 500n;
console.log(`Minting ${mintAmount} tokens for default-user...`);
const currentBalance = witnesses.userBalance(ledger, privateState);
const newBalance = currentBalance + mintAmount;
privateState = stateTransitions.mint(privateState, ledger, ledger, newBalance);
console.log(`✅ New balance after mint: ${witnesses.userBalance(ledger, privateState)}\n`);

// 2️⃣ Transfer tokens
const recipient = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
const transferAmount = 200n;
console.log(`Transferring ${transferAmount} tokens to ${toHex(recipient)}...`);

const senderBalanceBefore = witnesses.userBalance(ledger, privateState);
const recipientBalanceBefore = witnesses.recipientBalance(ledger, privateState, recipient);

privateState = stateTransitions.transfer(
  privateState,
  ledger,
  ledger,
  [senderBalanceBefore - transferAmount, recipientBalanceBefore + transferAmount],
  recipient
);

console.log(`✅ Sender balance: ${witnesses.userBalance(ledger, privateState)}`);
console.log(`✅ Recipient balance: ${witnesses.recipientBalance(ledger, privateState, recipient)}\n`);

// 3️⃣ Check total supply
const totalSupply = Array.from(privateState.balances.values()).reduce((a, b) => a + b, 0n);
console.log(`Total supply: ${totalSupply}\n`);

console.log("🎉 Simulation completed successfully!");
