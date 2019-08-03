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

export function isManifestInState(manifestUrl, state) {
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

export function addMicroAppLoadWatcher(appName, callback, wrapperId) {
  if (typeof callback !== "function") return;
  if (typeof wrapperId !== "string") return;
  if (typeof appName !== "string") return;
  store.dispatch({
    appName,
    callback,
    type: "addMicroAppLoadWatcher",
    wrapperId
  });
}

export function navigationState() {
  return store.getState().navigation;
}

export function storeBlockedNavigation(targetLocation, unblockFn) {
  if (typeof callback !== "function") return;
  if (typeof targetLocation !== "string") return;
  store.dispatch({
    targetLocation,
    type: "storeBlockedNavigation",
    unblockFn
  });
}

export function resetNavigation() {
  store.dispatch({
    type: "resetNavigation"
  });
}

export function getMicroAppLoadWatchers(microAppName) {
  const watchers = store.getState().loadCallbacks[microAppName];
  return typeof watchers === "object" ? watchers : {};
}

export function deleteMicroAppLoadWatchers(microAppName) {
  store.dispatch({ microAppName, type: "deleteMicroAppLoadWatchers" });
}

const initialState = {
  eventsDebug: false,
  loadCallbacks: {},
  loadedMicroApps: {},
  loadedManifests: {},
  navigation: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "resetNavigation":
      return {
        ...state,
        navigation: {}
      };
    case "storeBlockedNavigation":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          targetLocation: action.targetLocation,
          unblockFn: action.unblockFn
        }
      };
    case "activateEventsDebug":
      return { ...state, eventsDebug: true };
    case "deleteMicroAppLoadWatchers":
      delete state.loadCallbacks[action.appName];
      return state;
    case "addMicroAppLoadWatcher":
      if (typeof state.loadCallbacks[action.appName] !== "object") {
        state.loadCallbacks[action.appName] = {};
      }
      return {
        ...state,
        loadCallbacks: {
          ...state.loadCallbacks,
          [action.appName]: {
            ...state.loadCallbacks[action.appName],
            [action.wrapperId]: action.callback
          }
        }
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

export function instantiate(microAppName) {
  console.log(
    `STORE/instanciate ${microAppName} : `,
    getMicroAppLoadWatchers(microAppName)
  );
  Object.values(getMicroAppLoadWatchers(microAppName)).forEach(watcher => {
    console.log(`STORE/instanciate ${microAppName}/watcher`, watcher);
    watcher();
  });
  deleteMicroAppLoadWatchers(microAppName);
}
