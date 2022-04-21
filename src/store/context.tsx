import { createContext, Dispatch } from 'react';
import { Action } from './actions';
import { Transaction } from '../types/transaction';
import { Modals } from '../types/modal';

export type AppContextType<T> = {
  state: {
    transactions: Transaction[],
    documentTitle: string,
    modals: Modals[],
    activeTransaction?: Transaction,
  }
  dispatch: T,
};

export const AppContextInitialValue = {
  transactions: [],
  documentTitle: 'Loading...',
  modals: [],
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
});
