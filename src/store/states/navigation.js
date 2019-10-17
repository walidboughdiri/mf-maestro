import { validates } from "../../helpers";
import { store } from "../store";

export function navigationState() {
  return store.getState().navigation;
}

export function storeBlockedNavigation(targetLocation, unblockFn) {
  validates(arguments, ["string", "function"]);
  store.dispatch({
    targetLocation,
    type: "storeBlockedNavigation",
    unblockFn,
  });
}

export function resetNavigation() {
  store.dispatch({
    type: "resetNavigation",
  });
}
