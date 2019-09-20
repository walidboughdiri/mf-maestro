import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./Calculator";

window.MfMaestro.registerMicroApp("react-app", {
  start: (appNode, params, options) => {
    console.log(`%cstarting ${options.groupRef}`, "color:violet");
    ReactDOM.render(<Calculator />, appNode);
  },
  stop: (appNode, options) => {
    console.log(`%cstopping ${options.groupRef}`, "color:orange");
  },
});
