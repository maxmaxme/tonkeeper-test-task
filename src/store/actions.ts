/* eslint-disable no-unused-vars */
import { Transaction } from '../types/transaction';
import { Modals } from '../types/modal';

export enum Actions {
  SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE',
  APPEND_TRANSACTIONS = 'APPEND_TRANSACTIONS',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_ACTIVE_TRANSACTION = 'SET_ACTIVE_TRANSACTION',
}

export type Action =
  | { type: Actions.SET_DOCUMENT_TITLE, payload: string }
  | { type: Actions.APPEND_TRANSACTIONS, payload: Transaction[] }
  | { type: Actions.OPEN_MODAL, payload: Modals }
  | { type: Actions.CLOSE_MODAL }
  | { type: Actions.SET_ACTIVE_TRANSACTION, payload: Transaction }
  ;
