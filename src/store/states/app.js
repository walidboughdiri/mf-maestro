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

export function setMicroAppLoadingComponent(component) {
  if (typeof component !== "function") return;
  store.dispatch({ type: "setMicroAppLoadingComponent", component });
}

export function getMicroAppLoadingComponent() {
  return store.getState().microAppLoadingComponent;
}
