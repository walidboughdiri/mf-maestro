import { useEffect, useState } from "react";
import { uuidv4 } from "../helpers";
import {
  emit,
  on,
  once,
  removeListener,
  removeListenersByGroup
} from "../events";

export default function useEvents(prefix = "") {
  const [microAppId] = useState(prefix + uuidv4());
  useEffect(() => {
    return () => {
      removeListenersByGroup(microAppId);
    };
  });

  const scopedEventsFn = {
    emit,
    on: function(event, callback, context) {
      on(event, callback, microAppId, context);
    },
    once: function(event, callback, context) {
      once(event, callback, microAppId, context);
    },
    removeListener: function(event, callback, context) {
      removeListener(event, callback, microAppId, context);
    }
  };

  return [microAppId, scopedEventsFn];
}
