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

export default function useEvents(prefix) {
  validate(arguments, ["string="]);
  const [microAppId] = useState([prefix, uuidv4()].join(":"));
  useEffect(() => {
    return () => {
      removeListenersByGroup(microAppId);
    };
  });

  const scopedEventsFn = {
    emit: function(event, ...args) {
      validate(event, "string");
      return validate(emit(event, microAppId, ...args), "boolean");
    },
    mutateEvent: function(sourceEvent, targetEvent, transformArgsFn) {
      validate(arguments, ["string", "string", "function="]);
      return mutateEvent(microAppId, sourceEvent, targetEvent, transformArgsFn);
    },
    on: function(event, callback, context) {
      validate(arguments, ["string", "function", "object="]);
      return validate(on(event, callback, microAppId, context), EventEmitter);
    },
    once: function(event, callback, context) {
      validate(arguments, ["string", "function", "object="]);
      return validate(once(event, callback, microAppId, context), EventEmitter);
    },
    redirectOnEvent: function(event, path, options) {
      validate(arguments, ["string", "string", "Object.<string, string>="]);
      return redirectOnEvent(microAppId, event, path, options);
    },
    removeListener: function(event, callback, context) {
      validate(arguments, ["string", "function", "object="]);
      return validate(
        removeListener(event, callback, microAppId, context),
        EventEmitter
      );
    },
  };

  return validate(
    [microAppId, scopedEventsFn],
    ["string", "Object.<string, function>"]
  );
}
