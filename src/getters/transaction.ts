import { Transaction } from '../types/transaction';

export const getIsInTransaction = (transaction : Transaction) => !transaction.out_msgs.length;
export const getTransactionMsg = (transaction : Transaction) => getIsInTransaction(transaction) ? transaction.in_msg : transaction.out_msgs[0];
export const getTransactionValue = (transaction : Transaction) => getTransactionMsg(transaction).value;
export const getTransactionFee = (transaction : Transaction) => !getIsInTransaction(transaction) ? transaction.fee.fee : 0;
export const getTransactionDestination = (transaction : Transaction) => getTransactionMsg(transaction).destination;
export const getTransactionOriginalMessage = (transaction : Transaction) => getTransactionMsg(transaction).message;
export const getTransactionCurrency = () => 'TON';
export const getTransactionMessage = (transaction : Transaction, customMessage: string | undefined) => {
  if (customMessage?.length) {
    return customMessage;
  }
  return getTransactionOriginalMessage(transaction);
};
