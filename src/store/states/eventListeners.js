import { validate } from "byContract";
import { store } from "../store";

export function addEventListener(storeGroupId, event, callback) {
  validate(arguments, ["string", "string", "function"]);
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
  validate(arguments, ["string"]);
  store.dispatch({ type: "removeEventListeners", storeGroupId });
}

export function getStateForEventsGroup(storeGroupId) {
  validate(arguments, ["string"]);
  return store.getState().eventListeners[storeGroupId] || {};
}
