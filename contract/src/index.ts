import { Ledger } from "./managed/token/contract/index.cjs";

export type PrivateState = {
  balances: Map<string, bigint>;
};

export const initialPrivateState: PrivateState = {
  balances: new Map()
};

export const witnesses = {
  userBalance: (_ledger: Ledger, privateState: PrivateState): bigint => {
    const userAddress = "default-user";
    return privateState.balances.get(userAddress) || 0n;
  },

  recipientBalance: (_ledger: Ledger, privateState: PrivateState, recipient: Uint8Array): bigint => {
    const recipientAddress = Array.from(recipient).map(b => b.toString(16).padStart(2, '0')).join('');
    return privateState.balances.get(recipientAddress) || 0n;
  }
};

export const stateTransitions = {
  mint: (privateState: PrivateState, _oldLedger: Ledger, _newLedger: Ledger, result: bigint): PrivateState => {
    const userAddress = "default-user";
    const newBalances = new Map(privateState.balances);
    newBalances.set(userAddress, result);
    return { balances: newBalances };
  },

  transfer: (privateState: PrivateState, _oldLedger: Ledger, _newLedger: Ledger, result: [bigint, bigint], recipient: Uint8Array): PrivateState => {
    const senderAddress = "default-user";
    const recipientAddress = Array.from(recipient).map(b => b.toString(16).padStart(2, '0')).join('');
    const newBalances = new Map(privateState.balances);
    newBalances.set(senderAddress, result[0]);
    newBalances.set(recipientAddress, result[1]);
    return { balances: newBalances };
  },

  getBalance: (privateState: PrivateState): PrivateState => privateState,

  getTotalSupply: (privateState: PrivateState): PrivateState => privateState
};
