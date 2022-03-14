import React, { useReducer } from "react";
import { appReducer, initialAppState } from "./app.reducer";
import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default AppContext;
