import { store } from "../store";

export function isEventsDebugActivated() {
  return store.getState().eventsDebug;
}

export function toggleEventsDebug() {
  store.dispatch({ type: "toggleEventsDebug" });
  return isEventsDebugActivated();
}

export function appIsInitialized() {
  return store.getState().appInitialized;
}

export function initializeApp() {
  store.dispatch({ type: "initializeApp" });
}
