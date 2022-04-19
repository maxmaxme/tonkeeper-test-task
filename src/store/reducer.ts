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
  default:
    // @ts-ignore
    throw new Error(`reducer for ${action.type} not found`);
  }
};