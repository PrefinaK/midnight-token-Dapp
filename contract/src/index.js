"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateTransitions = exports.witnesses = exports.initialPrivateState = void 0;
exports.initialPrivateState = {
    balances: new Map()
};
exports.witnesses = {
    userBalance: function (_ledger, privateState) {
        var userAddress = "default-user";
        return privateState.balances.get(userAddress) || 0n;
    },
    recipientBalance: function (_ledger, privateState, recipient) {
        var recipientAddress = Array.from(recipient).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
        return privateState.balances.get(recipientAddress) || 0n;
    }
};
exports.stateTransitions = {
    mint: function (privateState, _oldLedger, _newLedger, result) {
        var userAddress = "default-user";
        var newBalances = new Map(privateState.balances);
        newBalances.set(userAddress, result);
        return { balances: newBalances };
    },
    transfer: function (privateState, _oldLedger, _newLedger, result, recipient) {
        var senderAddress = "default-user";
        var recipientAddress = Array.from(recipient).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
        var newBalances = new Map(privateState.balances);
        newBalances.set(senderAddress, result[0]);
        newBalances.set(recipientAddress, result[1]);
        return { balances: newBalances };
    },
    getBalance: function (privateState) { return privateState; },
    getTotalSupply: function (privateState) { return privateState; }
};
