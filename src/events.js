import { validate } from "byContract";
import EventEmitter from "eventemitter3";
import {
  addEventListener,
  getStateForEventsGroup,
  removeEventListener,
  removeEventListeners,
} from "./store/states/eventListeners";
import { isEventsDebugActivated } from "./store/states/app";
import { browserHistory } from "./browserHistory";

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
  message,
  path,
  { emitBefore, emitAfter } = {},
  onFn
) {
  validate(arguments, [
    "string",
    "string",
    "Object.<string, string>=",
    "function",
  ]);
  onFn(message, (...args) => {
    if (emitBefore) emit(emitBefore);
    const parsedPath = (path.match(/:\w+/g) || []).reduce((p, arg, index) => {
      if (typeof args[index] === "undefined") {
        console.log(
          `WARNING: trying to redirectOnEvent (event: "${message}", path: "${path}"), but there is no arg at index ${index} for path params "${arg}". Maybe the emitted message is missing some args ?`
        );
      }
      return p.replace(arg, args[index]);
    }, path);
    if (browserHistory.location.pathname === parsedPath) return;
    browserHistory.push(parsedPath);
    if (emitAfter) emit(emitAfter);
  });
}
export function mutateEvent(sourceEvent, targetEvent, transformArgsFn, onFn) {
  validate(arguments, ["string", "string|function", "function=", "function"]);
  onFn(sourceEvent, (...args) => {
    const _targetEvent =
      typeof targetEvent === "string" ? targetEvent : targetEvent(...args);
    if (!args.length) {
      return emit(_targetEvent);
    }
    return typeof transformArgsFn === "function"
      ? emit(_targetEvent, ...transformArgsFn(...args))
      : emit(_targetEvent, ...args);
  });
}
