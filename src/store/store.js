import { createStore } from "redux";
import eventListenersReducer from "./reducers/eventListenersReducer";
import loadCallbacksReducer from "./reducers/loadCallbacksReducer";
import loadedManifestsReducer from "./reducers/loadedManifestsReducer";
import loadedMicroAppsReducer from "./reducers/loadedMicroAppsReducer";
import navigationReducer from "./reducers/navigationReducer";
import MicroAppLoadingComponent from "../MicroAppLoadingComponent";

const reducer = (state = {}, action) => {
  const newState = {
    appInitialized:
      action.type === "initializeApp" ? true : state.appInitialized || false,
    eventsDebug:
      action.type === "toggleEventsDebug"
        ? !state.eventsDebug
        : state.eventsDebug || true,
    eventListeners: eventListenersReducer(state.eventListeners, action),
    loadCallbacks: loadCallbacksReducer(state.loadCallbacks, action),
    loadedMicroApps: loadedMicroAppsReducer(state.loadedMicroApps, action),
    loadedManifests: loadedManifestsReducer(state.loadedManifests, action),
    microAppLoadingComponent:
      action.type === "setMicroAppLoadingComponent"
        ? action.component
        : state.microAppLoadingComponent || MicroAppLoadingComponent,
    navigation: navigationReducer(state.navigation, action),
  };

  return newState;
};

export const store = createStore(reducer);
