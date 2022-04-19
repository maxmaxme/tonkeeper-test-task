import { createContext, Dispatch } from 'react';
import { Action } from './actions';
import { Transaction } from '../types/transaction';

export type AppContextType<T> = {
  state: {
    transactions: Transaction[],
    documentTitle: string,
  }
  dispatch: T,
};

export const AppContextInitialValue = {
  transactions: [],
  documentTitle: 'Loading...',
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
});