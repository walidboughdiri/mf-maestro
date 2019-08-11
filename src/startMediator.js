import "regenerator-runtime/runtime";
import "./store/store";
import "./GlobalNamespace";
import { validate } from "byContract";
import React from "react";
import ReactDOM from "react-dom";
import MediatorApp from "./MediatorApp";
import "./i18n";
import useEvents from "./effects/useEvents";
import * as events from "./events";
import * as navigation from "./Navigation";
export { events, navigation, useEvents };
export { default as MicroAppComponent } from "./MicroAppComponent";
export { resources as i18nResources, mergeDeep } from "./i18n";

export function startMediator(targetDomElementId, MainPage, init) {
  validate(arguments, ["string", "function", "function"]);

  ReactDOM.render(
    <MediatorApp init={init} mainPage={MainPage} />,
    document.getElementById(targetDomElementId)
  );
}
