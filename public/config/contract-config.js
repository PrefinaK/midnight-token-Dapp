// ============================================================================
// CONTRACT INTEGRATION - Connects UI to Compiled Contract
// ============================================================================
// This module bridges your existing UI with the compiled Compact contract

// NOTE: When you have your actual compiled contract, import it here:
// import { witnesses, stateTransitions, initialPrivateState } from '../contract/dist/index.js';

// Private state (managed locally)
let privateState = {
  balances: new Map(),
  totalSupply: 0n
};

// ============================================================================
// INITIALIZE CONTRACT
// ============================================================================
export function initContract() {
  console.log('[Contract] Initializing...');
  
  // Load saved state if exists
  const saved = localStorage.getItem('midnight_private_state');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      // Convert string balances back to BigInt
      privateState.balances = new Map(
        data.balances.map(([key, value]) => [key, BigInt(value)])
      );
      privateState.totalSupply = BigInt(data.totalSupply || 0);
      console.log('[Contract] ✅ Loaded saved private state');
    } catch (e) {
      console.warn('[Contract] Could not load saved state:', e);
    }
  }
  
  return true;
}

// ============================================================================
// GET BALANCE
// ============================================================================
export function getBalance(userAddress = "default-user") {
  // When using real contract:
  // const balance = witnesses.userBalance({}, privateState);
  
  const balance = privateState.balances.get(userAddress) || 0n;
  console.log(`[Contract] Balance for ${userAddress}: ${balance}`);
  return Number(balance);
}

// ============================================================================
// MINT TOKENS
// ============================================================================
export async function mintTokens(amount, userAddress = "default-user") {
  console.log(`[Contract] 🎨 Minting ${amount} tokens for ${userAddress}...`);
  
  try {
    // Get current balance
    const currentBalance = privateState.balances.get(userAddress) || 0n;
    
    // Calculate new balance
    const newBalance = currentBalance + BigInt(amount);
    
    // Validate max supply
    if (privateState.totalSupply + BigInt(amount) > 1000000000n) {
      throw new Error('Would exceed max supply');
    }
    
    // When using real contract, replace this with:
    // privateState = stateTransitions.mint(
    //   privateState,
    //   {}, // old ledger
    //   {}, // new ledger
    //   newBalance
    // );
    
    // Mock implementation:
    privateState.balances.set(userAddress, newBalance);
    privateState.totalSupply += BigInt(amount);
    
    // Save to localStorage
    savePrivateState();
    
    console.log(`[Contract] ✅ Mint successful. New balance: ${newBalance}`);
    
    return {
      success: true,
      newBalance: Number(newBalance),
      txHash: 'mdn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };
    
  } catch (error) {
    console.error('[Contract] ❌ Mint failed:', error);
    throw error;
  }
}

// ============================================================================
// TRANSFER TOKENS
// ============================================================================
export async function transferTokens(recipientAddress, amount, senderAddress = "default-user") {
  console.log(`[Contract] 📤 Transferring ${amount} from ${senderAddress} to ${recipientAddress}...`);
  
  try {
    // Get current balances
    const senderBalance = privateState.balances.get(senderAddress) || 0n;
    const recipientBalance = privateState.balances.get(recipientAddress) || 0n;
    
    // Validate
    if (senderBalance < BigInt(amount)) {
      throw new Error('Insufficient balance');
    }
    
    // Calculate new balances
    const newSenderBalance = senderBalance - BigInt(amount);
    const newRecipientBalance = recipientBalance + BigInt(amount);
    
    // When using real contract, replace with:
    // const recipientBytes = hexToBytes(recipientAddress);
    // const recipientBalance = witnesses.recipientBalance({}, privateState, recipientBytes);
    // privateState = stateTransitions.transfer(
    //   privateState,
    //   {}, // old ledger
    //   {}, // new ledger
    //   [newSenderBalance, newRecipientBalance],
    //   recipientBytes
    // );
    
    // Mock implementation:
    privateState.balances.set(senderAddress, newSenderBalance);
    privateState.balances.set(recipientAddress, newRecipientBalance);
    
    // Save to localStorage
    savePrivateState();
    
    console.log(`[Contract] ✅ Transfer successful`);
    
    return {
      success: true,
      senderNewBalance: Number(newSenderBalance),
      recipientNewBalance: Number(newRecipientBalance),
      txHash: 'mdn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };
    
  } catch (error) {
    console.error('[Contract] ❌ Transfer failed:', error);
    throw error;
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function hexToBytes(hex) {
  // Remove any 0x prefix
  hex = hex.replace(/^0x/, '');
  
  // Pad to even length
  if (hex.length % 2 !== 0) {
    hex = '0' + hex;
  }
  
  // Convert to bytes
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  
  return bytes;
}

function savePrivateState() {
  const data = {
    balances: Array.from(privateState.balances.entries()).map(([key, value]) => [key, value.toString()]),
    totalSupply: privateState.totalSupply.toString()
  };
  localStorage.setItem('midnight_private_state', JSON.stringify(data));
  console.log('[Contract] 💾 Private state saved');
}

// Export state getter for debugging
export function getState() {
  return privateState;
}

// Make it available globally for debugging in browser console
if (typeof window !== 'undefined') {
  window.getContractState = () => privateState;
}