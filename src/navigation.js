import { browserHistory } from "./browserHistory";
import {
  navigationState,
  resetNavigation,
  storeBlockedNavigation,
} from "./store/states/navigation";
import { emit } from "./events";

export function blockNavigation() {
  const unblockFn = browserHistory.block(location => {
    const targetLocation = location && location.pathname;
    storeBlockedNavigation(targetLocation, unblockFn);
    emit("navigation:location:will-change", { targetLocation });
    //block navigation : https://github.com/ReactTraining/history/blob/master/modules/createBrowserHistory.js
    return false;
  });
}

export function unblockNavigation() {
  const state = navigationState();
  if (typeof state.unblockFn === "function") {
    state.unblockFn();
  }
  if (typeof state.targetLocation === "string") {
    browserHistory.replace(state.targetLocation);
  }
  resetNavigation();
  emit("navigation:location:changed", { location: state.targetLocation });
}
