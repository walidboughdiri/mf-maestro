import { validates } from "../helpers";
import { useEffect, useState } from "react";
import { uuidv4 } from "../helpers";
import {
  emit,
  mutateEvent,
  on,
  once,
  redirectOnEvent,
  removeListener,
  removeListenersByGroup,
} from "../events";

export default function useEvents(ref) {
  validates(arguments, ["string="]);
  const [groupRef] = useState(ref || uuidv4());
  useEffect(() => {
    return () => {
      removeListenersByGroup(groupRef);
    };
  }, []);

  const onFn = function(event, callback, context) {
    validates(arguments, ["string", "function", "object="]);
    on(groupRef + ":" + event, callback, groupRef, context);
    return validates(on(event, callback, groupRef, context), "EventEmitter");
  };

  const scopedEventsFn = {
    emit: function(event, ...args) {
      validates(event, "string");
      return validates(emit(event, ...args, groupRef), "boolean");
    },
    mutateEvent: function(sourceEvent, targetEvent, transformArgsFn) {
      validates(arguments, ["string", "string|function", "function="]);
      return mutateEvent(sourceEvent, targetEvent, transformArgsFn, onFn);
    },
    on: onFn,
    once: function(event, callback, context) {
      validates(arguments, ["string", "function", "object="]);
      once(groupRef + ":" + event, callback, groupRef, context);
      return validates(
        once(event, callback, groupRef, context),
        "EventEmitter"
      );
    },
    redirectOnEvent: function(event, path, options) {
      validates(arguments, ["string", "string", "Object.<string, string>="]);
      return redirectOnEvent(event, path, options, onFn);
    },
    removeListener: function(event, callback, context) {
      validates(arguments, ["string", "function", "object="]);
      removeListener(groupRef + ":" + event, callback, groupRef, context);
      return validates(
        removeListener(event, callback, groupRef, context),
        "EventEmitter"
      );
    },
  };

  return validates(
    [groupRef, scopedEventsFn],
    ["string", "Object.<string, function>"]
  );
}
