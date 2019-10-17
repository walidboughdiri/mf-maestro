import { validates } from "../../helpers";
import { store } from "../store";

export function getMicroAppState(appName) {
  validates(arguments, ["string"]);
  return store.getState().loadedMicroApps[appName];
}

export function isMicroAppLoaded(microAppName) {
  validates(arguments, ["string"]);
  return isMicroAppInState(microAppName, "loaded");
}

export function isMicroAppLoading(microAppName) {
  validates(arguments, ["string"]);
  return isMicroAppInState(microAppName, "loading");
}

export function isMicroAppInState(microAppName, state) {
  validates(arguments, ["string", "string"]);
  if (state !== "loading" && state !== "loaded") {
    throw `wrong state for manifest (state: "${state}")`;
  }
  const { loadedMicroApps } = store.getState();
  return (
    typeof loadedMicroApps[microAppName] === "object" &&
    loadedMicroApps[microAppName].state === state
  );
}
