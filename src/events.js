import EventEmitter from "eventemitter3";
import { isEventsDebugActivated } from "./AppStateStore";
import { browserHistory } from "./BrowserHistory";

const eventEmitter = new EventEmitter();

export function once(event, emitted, context) {
  return eventEmitter.once(event, emitted, context);
}
export function on(event, emitted, context) {
  return eventEmitter.on(event, emitted, context);
}
export function removeListener(event, emitted, context) {
  return eventEmitter.removeListener(event, emitted, context);
}
export function removeAllListener(event) {
  return eventEmitter.removeAllListener(event);
}
export function listeners(event) {
  return eventEmitter.listeners(event);
}
export function emit(event, ...args) {
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

export function redirectOnEvent(message, path, { emitBefore, emitAfter } = {}) {
  on(message, (args = {}) => {
    emitBefore && emit(emitBefore);
    // We replace parameters in path by args value. Parameters start with `:`
    const parsedPath = (path.match(/:\w+/g) || []).reduce(
      (p, arg) => p.replace(arg, args[arg.substr(1)]),
      path
    );
    browserHistory.push(parsedPath);
    emitAfter && emit(emitAfter);
  });
}
export function mutateEvent(sourceEvent, targetEvent, transformArgsFn) {
  on(sourceEvent, (...args) => {
    if (!args.length) {
      return emit(targetEvent);
    }
    return typeof transformArgsFn === "function"
      ? emit(targetEvent, transformArgsFn(...args))
      : emit(targetEvent, ...args);
  });
}
export function reactToEvent(message, fn) {
  if (typeof fn !== "function") {
    console.log(
      `trying to add a reaction funtion, but the reactionFunction argument is not a function:`,
      fn
    );
    return;
  }
  on(message, fn);
}
