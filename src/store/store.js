import { createStore } from "redux";
import eventListenersReducer from "./reducers/eventListenersReducer";
import loadCallbacksReducer from "./reducers/loadCallbacksReducer";
import loadedManifestsReducer from "./reducers/loadedManifestsReducer";
import loadedMicroAppsReducer from "./reducers/loadedMicroAppsReducer";
import navigationReducer from "./reducers/navigationReducer";

const reducer = (state = {}, action) => {
  return {
    eventListeners: eventListenersReducer(state.eventListeners, action),
    loadCallbacks: loadCallbacksReducer(state.loadCallbacks, action),
    loadedMicroApps: loadedMicroAppsReducer(state.loadedMicroApps, action),
    loadedManifests: loadedManifestsReducer(state.loadedManifests, action),
    navigation: navigationReducer(state.navigation, action),
    appInitialized:
      action.type === "initializeApp" ? true : state.appInitialized || false,
    eventsDebug:
      action.type === "toggleEventsDebug"
        ? !state.eventsDebug
        : state.eventsDebug || true,
  };
};

export const store = createStore(reducer);
