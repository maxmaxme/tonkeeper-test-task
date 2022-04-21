import { Dispatch } from 'react';
import { Action, Actions } from './actions';
import { AppContextType } from './context';

export const reducer = (state: AppContextType<Dispatch<Action>>['state'], action: Action): AppContextType<Dispatch<Action>>['state'] => {
  switch (action.type) {
  case Actions.SET_DOCUMENT_TITLE:
    return {
      ...state,
      documentTitle: action.payload,
    };
  case Actions.APPEND_TRANSACTIONS:
    return {
      ...state,
      transactions: state.transactions.concat(action.payload),
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
  default:
    // @ts-ignore
    throw new Error(`reducer for ${action.type} not found`);
  }
};
