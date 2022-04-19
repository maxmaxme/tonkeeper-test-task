import React, { useEffect, useReducer } from 'react';
import { AppContext, AppContextInitialValue } from '../store/context';
import { reducer } from '../store/reducer';
import { Actions } from '../store/actions';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, AppContextInitialValue);

  useEffect(() => {
    document.title = state.documentTitle;
  }, [state.documentTitle]);

  useEffect(() => {
    dispatch({ type: Actions.SET_DOCUMENT_TITLE, payload: 'Home' });
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
