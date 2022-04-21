import { Transaction } from '../types/transaction';

export const getIsInTransaction = (transaction : Transaction) => !!transaction.in_msg.source;
export const getTransactionMsg = (transaction : Transaction) => getIsInTransaction(transaction) ? transaction.in_msg : transaction.out_msgs[0];
export const getTransactionValue = (transaction : Transaction) => getTransactionMsg(transaction).value;
export const getTransactionDestination = (transaction : Transaction) => getTransactionMsg(transaction).destination;
export const getTransactionOriginalMessage = (transaction : Transaction) => getTransactionMsg(transaction).message;
export const getTransactionCurrency = () => 'TON';
export const getTransactionMessage = (transaction : Transaction, customMessage: string | undefined) => {
  if (customMessage?.length) {
    return customMessage;
  }
  return getTransactionOriginalMessage(transaction);
};
