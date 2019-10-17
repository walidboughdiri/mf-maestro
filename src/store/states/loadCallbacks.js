import { validates } from "../../helpers";
import { store } from "../store";

export function addMicroAppLoadWatcher(appName, callback, wrapperId) {
  validates(arguments, ["string", "function", "string"]);
  store.dispatch({
    appName,
    callback,
    type: "addMicroAppLoadWatcher",
    wrapperId,
  });
}

export function deleteMicroAppLoadWatchers(microAppName) {
  validates(arguments, ["string"]);
  store.dispatch({ microAppName, type: "deleteMicroAppLoadWatchers" });
}

export function getMicroAppLoadWatchers(microAppName) {
  validates(arguments, ["string"]);
  const watchers = store.getState().loadCallbacks[microAppName];
  return typeof watchers === "object" ? watchers : {};
}
