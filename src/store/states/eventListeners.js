import { validates } from "../../helpers";
import { store } from "../store";

export function addEventListener(storeGroupId, event, callback) {
  validates(arguments, ["string", "string", "function"]);
  store.dispatch({ event, callback, type: "addEventListener", storeGroupId });
}

export function removeEventListener(storeGroupId, event, callback) {
  store.dispatch({
    event,
    callback,
    type: "removeEventListener",
    storeGroupId,
  });
}

export function removeEventListeners(storeGroupId) {
  validates(arguments, ["string"]);
  store.dispatch({ type: "removeEventListeners", storeGroupId });
}

export function getStateForEventsGroup(storeGroupId) {
  validates(arguments, ["string"]);
  return store.getState().eventListeners[storeGroupId] || {};
}
