import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./Calculator";

window.MfMaestro.registerMicroApp("react-app", {
  start: (microAppId, params, options) => {
    console.log(`%cstarting ${microAppId}`, "color:violet");
    ReactDOM.render(<Calculator />, options.appNode)
  },
  stop: microAppId => {
    console.log(`%cstopping ${microAppId}`, "color:orange");
  },
});
