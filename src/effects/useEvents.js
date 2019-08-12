import { validate } from "byContract";
import EventEmitter from "eventemitter3";
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
  validate(arguments, ["string="]);
  const [groupRef] = useState(ref || uuidv4());
  useEffect(() => {
    return () => {
      removeListenersByGroup(groupRef);
    };
  });

  const scopedEventsFn = {
    emit: function(event, ...args) {
      validate(event, "string");
      return validate(emit(event, groupRef, ...args), "boolean");
    },
    mutateEvent: function(sourceEvent, targetEvent, transformArgsFn) {
      validate(arguments, ["string", "string", "function="]);
      return mutateEvent(groupRef, sourceEvent, targetEvent, transformArgsFn);
    },
    on: function(event, callback, context) {
      validate(arguments, ["string", "function", "object="]);
      return validate(on(event, callback, groupRef, context), EventEmitter);
    },
    once: function(event, callback, context) {
      validate(arguments, ["string", "function", "object="]);
      return validate(once(event, callback, groupRef, context), EventEmitter);
    },
    redirectOnEvent: function(event, path, options) {
      validate(arguments, ["string", "string", "Object.<string, string>="]);
      return redirectOnEvent(groupRef, event, path, options);
    },
    removeListener: function(event, callback, context) {
      validate(arguments, ["string", "function", "object="]);
      return validate(
        removeListener(event, callback, groupRef, context),
        EventEmitter
      );
    },
  };

  return validate(
    [groupRef, scopedEventsFn],
    ["string", "Object.<string, function>"]
  );
}
