import React, { createContext, useContext, useReducer } from "react";
const initialState = {
  loadedMicroApps: {},
  loadedManifests: {}
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "loadMicroApp":
      return {
        ...state,
        loadedMicroApps: {
          ...state.loadedMicroApps,
          [action.microAppName]: {
            state: "loading",
            callback: action.callback
          }
        }
      };
    case "addMicroApp":
      return {
        ...state,
        loadedMicroApps: {
          ...state.loadedMicroApps,
          [action.microAppName]: {
            state: "loaded",
            ...action.microAppObject
          }
        }
      };
    case "addManifest":
      return {
        ...state,
        loadedManifests: {
          ...state.loadedManifests,
          [action.url]: action.manifest
        }
      };
    default:
      return state;
  }
};
export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
