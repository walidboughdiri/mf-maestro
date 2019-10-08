import Vue from "vue";
import App from "./App.vue";

function start(appNode, params, options) {
  console.log(`%cstarting ${options.groupRef}`, "color:violet");
  new Vue({ el: appNode, template: "<App/>", components: { App } });
}

function stop(appNode, options) {
  console.log(`%cstopping ${options.groupRef}`, "color:orange");
}

if (window.MfMaestro) {
  window.MfMaestro.registerMicroApp("vue-app", { start, stop });
} else {
  // our individual app does not need MfMaestro
  // we build fake start arguments and call start ourself
  // in an html page with just our app
  const groupRef = "vue-app@groupRef";
  const callbacksStore = {};
  const appNode = document.getElementById("app-root");
  console.log("appNode", appNode);
  const params = {};
  const options = buildStubbedMfMaestroOptions(groupRef, callbacksStore);

  start(appNode, params, options);
}

function buildStubbedMfMaestroOptions(groupRef, callbacksStore) {
  return {
    groupRef,
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
