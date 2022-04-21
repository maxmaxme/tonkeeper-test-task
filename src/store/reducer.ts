import { Dispatch } from 'react';
import { Action, Actions } from './actions';
import { AppContextType } from './context';
import { TransactionDict } from '../types/transaction';
import { set as setCache } from './cache';
import { getTransactionCommentCacheKey } from '../types/cache';
import { getIsInTransaction } from '../getters/transaction';

export const reducer = (state: AppContextType<Dispatch<Action>>['state'], action: Action): AppContextType<Dispatch<Action>>['state'] => {
  switch (action.type) {
  case Actions.SET_DOCUMENT_TITLE:
    return {
      ...state,
      documentTitle: action.payload,
    };
  case Actions.APPEND_TRANSACTIONS:
    const transactionDict: TransactionDict = action.payload.reduce((prev, transaction) => {
      return {
        ...prev,
        [transaction.transaction_id.lt]: transaction,
      };
    }, {});
    return {
      ...state,
      transactions: {
        ...state.transactions,
        ...transactionDict,
      },
    };
  case Actions.OPEN_MODAL:
    return {
      ...state,
      modals: state.modals.concat(action.payload),
    };
  case Actions.CLOSE_MODAL:
    return {
      ...state,
      modals: state.modals.slice(0, -1),
    };
  case Actions.SET_ACTIVE_TRANSACTION:
    return {
      ...state,
      activeTransaction: action.payload,
    };
  case Actions.SET_TRANSACTION_CUSTOM_MESSAGE:
    const isIn = getIsInTransaction(state.transactions[action.payload.transactionId.lt]);
    setCache(getTransactionCommentCacheKey(action.payload.transactionId, isIn), action.payload.message);
    return {
      ...state,
      transactionCustomMessages: {
        ...state.transactionCustomMessages,
        [action.payload.transactionId.lt]: action.payload.message,
      },
    };
  default:
    // @ts-ignore
    throw new Error(`reducer for ${action.type} not found`);
  }
};
