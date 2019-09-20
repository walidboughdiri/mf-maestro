import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";

window.MfMaestro.registerMicroApp("hooked-react-app", {
  start: (appNode, params, options) => {
    console.log(`%cstarting ${options.groupRef}`, "color:violet");
    ReactDOM.render(<Home />, appNode);
  },
  stop: (appNode, options) => {
    console.log(`%cstopping ${options.groupRef}`, "color:orange");
  },
});
