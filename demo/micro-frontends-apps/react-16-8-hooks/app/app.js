import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";

function start(appNode, params, options) {
  console.log(`%cstarting ${options.groupRef}`, "color:violet");
  ReactDOM.render(<Home params={params} options={options} />, appNode);
}

function stop(appNode, options) {
  console.log(`%cstopping ${options.groupRef}`, "color:orange");
}
console.log(window.MfMaestro);
if (window.MfMaestro) {
  window.MfMaestro.registerMicroApp("hooked-react-app", { start, stop });
} else {
  // our individual app does not need MfMaestro
  // we build fake start arguments and call start ourself
  // in an html page with just our app
  const callbacksStore = {};
  const appNode = document.getElementById("app-root");
  const params = {};
  const options = buildStubbedMfMaestroOptions(callbacksStore);

  start(appNode, params, options);
}

function buildStubbedMfMaestroOptions(callbacksStore) {
  return {
    groupRef: "hooked-react-app@groupRef",
    events: {
      emit: (event, ...args) =>
        callbacksStore[event]
          ? callbacksStore[event].forEach(cbk => cbk(...args, event))
          : null,
      on: (event, callback, context) =>
        callbacksStore[event]
          ? callbacksStore[event].push(callback)
          : (callbacksStore[event] = [callback]),
    },
  };
}
