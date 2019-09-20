import Vue from "vue";
import App from "./App.vue";

window.MfMaestro.registerMicroApp("vue-app", {
  start: (appNode, params, options) => {
    console.log(`%cstarting ${options.groupRef}`, "color:violet");
    new Vue({ el: appNode, template: "<App/>", components: { App } });
  },
  stop: (appNode, options) => {
    console.log(`%cstopping ${options.groupRef}`, "color:orange");
  },
});
