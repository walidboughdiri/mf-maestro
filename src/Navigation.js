import { browserHistory } from "./BrowserHistory";
import {
  navigationState,
  resetNavigation,
  storeBlockedNavigation
} from "./AppStateStore";
import { emit } from "./events";

export function blockNavigation() {
  const unblockFn = browserHistory.block((location, action) => {
    const targetLocation = location && location.pathname;
    storeBlockedNavigation({ unblockFn, targetLocation });
    emit("io:location:will-change", { targetLocation });
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
  emit("io:location:changed", { location: state.targetLocation });
}
