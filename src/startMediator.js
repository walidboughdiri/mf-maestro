import "regenerator-runtime/runtime";
import "./store/store";
import "./globalNamespace";
import React from "react";
import ReactDOM from "react-dom";
import MediatorApp from "./MediatorApp";
import useEvents from "./effects/useEvents";
import * as events from "./events";
import * as navigation from "./navigation";
export { events, navigation, useEvents };
export { default as IFrameMicroApp } from "./MicroAppTypes/IFrameMicroApp";
export { default as MicroAppComponent } from "./MicroAppComponent";
import { validates } from "./helpers";

export function startMediator(targetDomElementId, MainPage, init) {
  validates(arguments, ["string", "function", "function"], "startMediator");

  ReactDOM.render(
    <MediatorApp init={init} mainPage={MainPage} />,
    document.getElementById(targetDomElementId)
  );
}
