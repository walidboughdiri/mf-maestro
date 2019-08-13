import { validate } from "byContract";
import { store } from "../store";

export function getMicroAppState(appName) {
  validate(arguments, ["string"]);
  return store.getState().loadedMicroApps[appName];
}

export function isMicroAppLoaded(microAppName) {
  validate(arguments, ["string"]);
  return isMicroAppInState(microAppName, "loaded");
}

export function isMicroAppLoading(microAppName) {
  validate(arguments, ["string"]);
  return isMicroAppInState(microAppName, "loading");
}

export function isMicroAppInState(microAppName, state) {
  validate(arguments, ["string", "string"]);
  if (state !== "loading" && state !== "loaded") {
    throw `wrong state for manifest (state: "${state}")`;
  }
  const { loadedMicroApps } = store.getState();
  return (
    typeof loadedMicroApps[microAppName] === "object" &&
    loadedMicroApps[microAppName].state === state
  );
}
