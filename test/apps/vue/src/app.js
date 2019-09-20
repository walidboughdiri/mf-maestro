import Vue from "vue";
import App from "./App.vue";

window.MfMaestro.registerMicroApp("vue-app", {
  start: (microAppId, params, options) => {
    console.log(`%cstarting ${microAppId}`, "color:violet");
    new Vue({ el: options.appNode, template: "<App/>", components: { App } });
  },
  stop: microAppId => {
    console.log(`%cstopping ${microAppId}`, "color:orange");
  },
});
