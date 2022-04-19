/* eslint-disable no-unused-vars */
import { Transaction, TransactionId } from '../types/transaction';

export enum Actions {
  SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE',
  APPEND_TRANSACTIONS = 'APPEND_TRANSACTIONS',
  SET_LAST_TX_ID = 'SET_LAST_TX_ID',
}

export type Action =
  | { type: Actions.SET_DOCUMENT_TITLE, payload: string }
  | { type: Actions.APPEND_TRANSACTIONS, payload: Transaction[] }
  | { type: Actions.SET_LAST_TX_ID, payload: TransactionId }
  ;
