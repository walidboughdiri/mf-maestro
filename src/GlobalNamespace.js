import { instantiate, store, toggleEventsDebug } from "./store/store";
import {
  emit,
  listeners,
  mutateEvent,
  on,
  once,
  redirectOnEvent,
  removeListener,
} from "./events";

if (window.MfMaestro === undefined) {
  window.MfMaestro = {
    registerMicroApp: function(microAppName, microAppObject) {
      console.log(`%cregisterMicroApp ${microAppName}`, "color:green;");
      store.dispatch({ microAppName, microAppObject, type: "addMicroApp" });
      instantiate(microAppName);
    },
    emit,
    listeners,
    mutateEvent,
    on,
    once,
    removeListener,
    redirectOnEvent,
    toggleEventsDebug,
    state: () => store.getState(),
  };
} else {
  if (typeof window.MfMaestro !== "object") {
    console.log(
      "window.MfMaestro is defined but it is not an object. MfMaestro can't start."
    );
  }
}
