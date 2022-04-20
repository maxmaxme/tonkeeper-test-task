/* eslint-disable no-unused-vars */
import { Transaction } from '../types/transaction';

export enum Actions {
  SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE',
  APPEND_TRANSACTIONS = 'APPEND_TRANSACTIONS',
}

export type Action =
  | { type: Actions.SET_DOCUMENT_TITLE, payload: string }
  | { type: Actions.APPEND_TRANSACTIONS, payload: Transaction[] }
  ;
