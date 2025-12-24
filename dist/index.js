export const initialPrivateState = {
    balances: new Map()
};
export const witnesses = {
    userBalance: (_ledger, privateState) => {
        const userAddress = "default-user";
        return privateState.balances.get(userAddress) || 0n;
    },
    recipientBalance: (_ledger, privateState, recipient) => {
        const recipientAddress = Array.from(recipient).map(b => b.toString(16).padStart(2, '0')).join('');
        return privateState.balances.get(recipientAddress) || 0n;
    }
};
export const stateTransitions = {
    mint: (privateState, _oldLedger, _newLedger, result) => {
        const userAddress = "default-user";
        const newBalances = new Map(privateState.balances);
        newBalances.set(userAddress, result);
        return { balances: newBalances };
    },
    transfer: (privateState, _oldLedger, _newLedger, result, recipient) => {
        const senderAddress = "default-user";
        const recipientAddress = Array.from(recipient).map(b => b.toString(16).padStart(2, '0')).join('');
        const newBalances = new Map(privateState.balances);
        newBalances.set(senderAddress, result[0]);
        newBalances.set(recipientAddress, result[1]);
        return { balances: newBalances };
    },
    getBalance: (privateState) => privateState,
    getTotalSupply: (privateState) => privateState
};
//# sourceMappingURL=index.js.map