import React, { useEffect, useReducer } from 'react';
import { AppContext, AppContextInitialValue } from '../store/context';
import { reducer } from '../store/reducer';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, AppContextInitialValue);

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
