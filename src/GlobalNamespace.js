import { instantiate, store } from "./GlobalState";
import {
  on,
  once,
  removeListener,
  emit,
  redirectOnEvent,
  mutateEvent,
  reactToEvent
} from "./events";

if (window.MfMaestro === undefined) {
  window.MfMaestro = {
    registerMicroApp: function(microAppName, microAppObject) {
      console.log(`%cregisterMicroApp ${microAppName}`, "color:green;");
      store.dispatch({ microAppName, microAppObject, type: "addMicroApp" });
      instantiate(microAppName);
    },
    on,
    once,
    removeListener,
    emit,
    redirectOnEvent,
    mutateEvent,
    reactToEvent
  };
} else {
  if (typeof window.MfMaestro !== "object") {
    console.log(
      "window.MfMaestro is defined but it is not an object. MfMaestro can't start."
    );
  }
}
