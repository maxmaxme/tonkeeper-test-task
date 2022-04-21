/* eslint-disable no-unused-vars */
import { Transaction, TransactionId } from '../types/transaction';
import { Modals } from '../types/modal';

export enum Actions {
  SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE',
  APPEND_TRANSACTIONS = 'APPEND_TRANSACTIONS',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_ACTIVE_TRANSACTION = 'SET_ACTIVE_TRANSACTION',
  SET_TRANSACTION_CUSTOM_MESSAGE = 'SET_TRANSACTION_CUSTOM_MESSAGE',
}

export type Action =
  | { type: Actions.SET_DOCUMENT_TITLE, payload: string }
  | { type: Actions.APPEND_TRANSACTIONS, payload: Transaction[] }
  | { type: Actions.OPEN_MODAL, payload: Modals }
  | { type: Actions.CLOSE_MODAL }
  | { type: Actions.SET_ACTIVE_TRANSACTION, payload: Transaction }
  | { type: Actions.SET_TRANSACTION_CUSTOM_MESSAGE, payload: {transactionId: TransactionId, message: string} }
  ;
