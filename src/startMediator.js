import "regenerator-runtime/runtime";
import "./store/store";
import "./globalNamespace";
import { validate } from "byContract";
import React from "react";
import ReactDOM from "react-dom";
import MediatorApp from "./MediatorApp";
import useEvents from "./effects/useEvents";
import * as events from "./events";
import * as navigation from "./navigation";
export { events, navigation, useEvents };
export { default as IFrameMicroApp } from "./MicroAppTypes/IFrameMicroApp";
export { default as MicroAppComponent } from "./MicroAppComponent";

export function startMediator(targetDomElementId, MainPage, init) {
  validate(arguments, ["string", "function", "function"]);

  ReactDOM.render(
    <MediatorApp init={init} mainPage={MainPage} />,
    document.getElementById(targetDomElementId)
  );
}
