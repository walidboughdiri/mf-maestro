import { validate } from "byContract";
import EventEmitter from "eventemitter3";
import {
  addEventListener,
  getStateForEventsGroup,
  removeEventListener,
  removeEventListeners,
} from "./store/states/eventListeners";
import { isEventsDebugActivated } from "./store/states/app";
import { browserHistory } from "./BrowserHistory";

const eventEmitter = new EventEmitter();

export function once(event, callback, storeGroupId, context) {
  validate(arguments, ["string", "function", "string", "object="]);
  addEventListener(storeGroupId, event, callback);
  return validate(eventEmitter.once(event, callback, context), EventEmitter);
}
export function on(event, callback, storeGroupId, context) {
  validate(arguments, ["string", "function", "string", "object="]);
  addEventListener(storeGroupId, event, callback);
  return validate(eventEmitter.on(event, callback, context), EventEmitter);
}
export function removeListenersByGroup(storeGroupId) {
  validate(arguments, ["string"]);
  Object.entries(getStateForEventsGroup(storeGroupId)).forEach(
    ([event, callbacks]) => {
      callbacks.forEach(callback => {
        eventEmitter.removeListener(event, callback);
      });
    }
  );
  removeEventListeners(storeGroupId);
}
export function removeListener(event, callback, microAppId, context) {
  validate(arguments, ["string", "function", "string", "object="]);
  removeEventListener(microAppId, event, callback);
  return validate(
    eventEmitter.removeListener(event, callback, context),
    EventEmitter
  );
}
export function removeAllListeners(event) {
  validate(arguments, ["string"]);
  return eventEmitter.removeAllListeners(event);
}
export function listeners(event) {
  validate(arguments, ["string"]);
  return eventEmitter.listeners(event);
}
export function emit(event, ...args) {
  validate(event, "string");
  if (isEventsDebugActivated() && event.indexOf("devtool") === -1) {
    console.info(
      `%cEvent emitted : %c"${event}"`,
      "color: blue",
      "color: green"
    );
    args.length && console.info("%cwith args : ", "color: blue", ...args);
  }
  eventEmitter.emit(`devtool`, { event, arguments: args });
  return eventEmitter.emit(event, ...args);
}

export function redirectOnEvent(
  eventsGroupId,
  message,
  path,
  { emitBefore, emitAfter } = {}
) {
  validate(arguments, [
    "string",
    "string",
    "string",
    "Object.<string, string>=",
  ]);
  on(
    message,
    (args = {}) => {
      if (emitBefore) emit(emitBefore);
      // We replace parameters in path by args value. Parameters start with `:`
      const parsedPath = (path.match(/:\w+/g) || []).reduce(
        (p, arg) => p.replace(arg, args[arg.substr(1)]),
        path
      );
      if (browserHistory.location.pathname === parsedPath) return;
      browserHistory.push(parsedPath);
      if (emitAfter) emit(emitAfter);
    },
    eventsGroupId
  );
}
export function mutateEvent(
  eventsGroupId,
  sourceEvent,
  targetEvent,
  transformArgsFn
) {
  validate(arguments, ["string", "string", "string", "function="]);
  on(
    sourceEvent,
    (...args) => {
      if (!args.length) {
        return emit(targetEvent);
      }
      return typeof transformArgsFn === "function"
        ? emit(targetEvent, ...transformArgsFn(...args))
        : emit(targetEvent, ...args);
    },
    eventsGroupId
  );
}
