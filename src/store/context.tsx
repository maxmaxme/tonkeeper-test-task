import { createContext, Dispatch } from 'react';
import { Action } from './actions';
import { Transaction, TransactionDict, TransactionMessagesDict } from '../types/transaction';
import { Modals } from '../types/modal';

export type AppContextType<T> = {
  state: {
    transactions: TransactionDict;
    transactionCustomMessages: TransactionMessagesDict;
    documentTitle: string,
    modals: Modals[],
    activeTransaction?: Transaction,
  }
  dispatch: T,
};

export const AppContextInitialValue = {
  transactions: {},
  transactionCustomMessages: {},
  documentTitle: 'Loading...',
  modals: [],
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
});
