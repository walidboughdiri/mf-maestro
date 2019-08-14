import { validate } from "byContract";
import { store } from "./store/store";
import { toggleEventsDebug } from "./store/states/app";
import {
  deleteMicroAppLoadWatchers,
  getMicroAppLoadWatchers,
} from "./store/states/loadCallbacks";
import {
  emit,
  listeners,
  mutateEvent,
  on,
  once,
  redirectOnEvent,
  removeListener,
} from "./events";

function instantiate(microAppName) {
  validate(arguments, ["string"]);
  Object.values(getMicroAppLoadWatchers(microAppName)).forEach(watcher => {
    watcher();
  });
  deleteMicroAppLoadWatchers(microAppName);
}
if (window.MfMaestro === undefined) {
  window.MfMaestro = {
    registerMicroApp: function(microAppName, microAppObject) {
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
