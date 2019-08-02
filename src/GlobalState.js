import { createStore } from "redux";

export function isEventsDebugActivated() {
  return store.getState().eventsDebug;
}

export function isManifestLoaded(manifestUrl, id) {
  return isManifestInState(manifestUrl, "loaded", id);
}

export function isManifestLoading(manifestUrl, id) {
  return isManifestInState(manifestUrl, "loading", id);
}

export function isManifestInState(manifestUrl, state, id) {
  if (state !== "loading" && state !== "loaded") {
    throw `wrong state for manifest (state: "${state}")`;
  }
  const { loadedManifests } = store.getState();
  return (
    manifestUrl in loadedManifests &&
    loadedManifests[manifestUrl].state === state
  );
}

export function microAppState(appName) {
  return store.getState().loadedMicroApps[appName];
}

export function isMicroAppLoaded(microAppName) {
  return isMicroAppInState(microAppName, "loaded");
}

export function isMicroAppLoading(microAppName) {
  return isMicroAppInState(microAppName, "loading");
}

export function isMicroAppInState(microAppName, state) {
  if (state !== "loading" && state !== "loaded") {
    throw `wrong state for manifest (state: "${state}")`;
  }
  const { loadedMicroApps } = store.getState();
  return (
    typeof loadedMicroApps[microAppName] === "object" &&
    loadedMicroApps[microAppName].state === state
  );
}
export function microAppConfigFromState(wrapperId, manifestUrl, microAppName) {
  if (!isManifestLoaded(manifestUrl, wrapperId)) return null;
  const manifestState = store.getState().loadedManifests[manifestUrl];
  if (manifestState === undefined) return null;
  return manifestState.content[microAppName];
}

export function addLoadCallback(appName, wrapperId, callback) {
  store.dispatch({ appName, type: "addLoadCallbacks", callback });
}

const initialState = {
  eventsDebug: false,
  loadCallbacks: {},
  loadedMicroApps: {},
  loadedManifests: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "activateEventsDebug":
      return { ...state, eventsDebug: true };
    case "addLoadCallback":
      return {
        ...state,
        loadCallbacks: state.loadCallbacks[action.appName]
          ? {
              ...state.loadCallbacks,
              [action.appName]: {
                ...state.loadCallbacks[action.appName],
                [action.appName]: action.callback
              }
            }
          : { ...state.loadCallbacks, [action.appName]: action.callback }
      };
    case "deActivateEventsDebug":
      return { ...state, eventsDebug: false };
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
    case "loadManifest":
      return {
        ...state,
        loadedManifests: {
          ...state.loadedManifests,
          [action.url]: {
            state: "loading",
            content: null
          }
        }
      };
    case "storeManifest":
      return {
        ...state,
        loadedManifests: {
          ...state.loadedManifests,
          [action.url]: {
            state: "loaded",
            content: action.content
          }
        }
      };
    case "storeManifestError":
      return {
        ...state,
        loadedManifests: {
          ...state.loadedManifests,
          [action.url]: {
            state: "error",
            content: action.error
          }
        }
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);

window.MfMaestro.registerMicroApp = function(microAppName, microAppObject) {
  console.log(`GS ••• registerMicroApp ${microAppName}`);
  store.dispatch({
    microAppName,
    microAppObject,
    type: "addMicroApp"
  });
  window.MfMaestro.instanciate(microAppName);
};
