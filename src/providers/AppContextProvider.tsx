import React, { useEffect, useReducer } from 'react';
import { AppContext, AppContextInitialValue } from '../store/context';
import { reducer } from '../store/reducer';
import { get as getCache } from '../store/cache';
import { KEYS } from '../types/cache';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const transactionCustomMessages = getCache(KEYS.TRANSACTION_COMMENTS, {});
  const [state, dispatch] = useReducer(reducer, {
    ...AppContextInitialValue,
    transactionCustomMessages,
  });

  useEffect(() => {
    document.title = state.documentTitle;
  }, [state.documentTitle]);

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
