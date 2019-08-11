import { validate } from "byContract";
import { store } from "../store";

export function addMicroAppLoadWatcher(appName, callback, wrapperId) {
  validate(arguments, ["string", "function", "string"]);
  store.dispatch({
    appName,
    callback,
    type: "addMicroAppLoadWatcher",
    wrapperId,
  });
}

export function deleteMicroAppLoadWatchers(microAppName) {
  validate(arguments, ["string"]);
  store.dispatch({ microAppName, type: "deleteMicroAppLoadWatchers" });
}

export function getMicroAppLoadWatchers(microAppName) {
  validate(arguments, ["string"]);
  const watchers = store.getState().loadCallbacks[microAppName];
  return typeof watchers === "object" ? watchers : {};
}
