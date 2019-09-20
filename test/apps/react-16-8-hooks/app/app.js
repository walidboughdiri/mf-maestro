import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";

window.MfMaestro.registerMicroApp("hooked-react-app", {
  start: (microAppId, params, options) => {
    console.log(`%cstarting ${microAppId}`, "color:violet");
    ReactDOM.render(<Home />, options.appNode)
  },
  stop: microAppId => {
    console.log(`%cstopping ${microAppId}`, "color:orange");
  },
});
