import { Ledger } from "./managed/token/contract/index.cjs";
export type PrivateState = {
    balances: Map<string, bigint>;
};
export declare const initialPrivateState: PrivateState;
export declare const witnesses: {
    userBalance: (_ledger: Ledger, privateState: PrivateState) => bigint;
    recipientBalance: (_ledger: Ledger, privateState: PrivateState, recipient: Uint8Array) => bigint;
};
export declare const stateTransitions: {
    mint: (privateState: PrivateState, _oldLedger: Ledger, _newLedger: Ledger, result: bigint) => PrivateState;
    transfer: (privateState: PrivateState, _oldLedger: Ledger, _newLedger: Ledger, result: [bigint, bigint], recipient: Uint8Array) => PrivateState;
    getBalance: (privateState: PrivateState) => PrivateState;
    getTotalSupply: (privateState: PrivateState) => PrivateState;
};
