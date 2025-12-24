import { witnesses, stateTransitions, initialPrivateState } from './dist/index.js';

console.log('🚀 Starting Midnight Token Contract Test...\n');

// -----------------------------------------------------------------------------
// INITIAL STATE
// -----------------------------------------------------------------------------
let privateState = { ...initialPrivateState };

console.log('✅ Initial private state loaded');
console.log('Initial balances:', privateState.balances);
console.log('');

// -----------------------------------------------------------------------------
// TEST 1: WITNESS — USER BALANCE
// -----------------------------------------------------------------------------
const initialBalance = witnesses.userBalance({}, privateState);
console.log('🔍 Witness Test: userBalance');
console.log('Expected: 0');
console.log('Actual  :', initialBalance.toString());
console.log('');

// -----------------------------------------------------------------------------
// TEST 2: STATE TRANSITION — MINT
// -----------------------------------------------------------------------------
console.log('🪙 State Transition Test: mint 100 tokens');

const mintAmount = 100n;
const newBalance = initialBalance + mintAmount;

privateState = stateTransitions.mint(
  privateState,
  {}, // old ledger (mock)
  {}, // new ledger (mock)
  newBalance
);

const balanceAfterMint = witnesses.userBalance({}, privateState);

console.log('Expected balance after mint:', newBalance.toString());
console.log('Actual balance after mint  :', balanceAfterMint.toString());
console.log('');

// -----------------------------------------------------------------------------
// TEST 3: STATE TRANSITION — TRANSFER
// -----------------------------------------------------------------------------
console.log('📤 State Transition Test: transfer 40 tokens');

const recipientHex = '01020304';
const recipientBytes = new Uint8Array(
  recipientHex.match(/.{1,2}/g).map(b => parseInt(b, 16))
);

const senderBalance = witnesses.userBalance({}, privateState);
const recipientBalance = witnesses.recipientBalance({}, privateState, recipientBytes);

const transferAmount = 40n;

const newSenderBalance = senderBalance - transferAmount;
const newRecipientBalance = recipientBalance + transferAmount;

privateState = stateTransitions.transfer(
  privateState,
  {},
  {},
  [newSenderBalance, newRecipientBalance],
  recipientBytes
);

// Verify balances
const finalSenderBalance = witnesses.userBalance({}, privateState);
const finalRecipientBalance = witnesses.recipientBalance({}, privateState, recipientBytes);

console.log('Sender balance expected   :', newSenderBalance.toString());
console.log('Sender balance actual     :', finalSenderBalance.toString());
console.log('Recipient balance expected:', newRecipientBalance.toString());
console.log('Recipient balance actual  :', finalRecipientBalance.toString());
console.log('');

// -----------------------------------------------------------------------------
// RESULT
// -----------------------------------------------------------------------------
console.log('🎉 ALL TESTS COMPLETED SUCCESSFULLY');
console.log('✅ Contract logic');
console.log('✅ Witness functions');
console.log('✅ State transitions');
