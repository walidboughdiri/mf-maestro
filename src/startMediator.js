import "regenerator-runtime/runtime";
import "./AppStateStore";
import "./GlobalNamespace";
import React from "react";
import ReactDOM from "react-dom";
import MediatorApp from "./MediatorApp";
import "./i18n";
import useEvents from "./effects/useEvents";
import { uuidv4 } from "./helpers";
import * as Events from "./events";
export { Events, useEvents, uuidv4 };
export { default as MicroAppComponent } from "./MicroAppComponent";
export { resources as i18nResources, mergeDeep } from "./i18n";

export function startMediator({
  targetDomElementId = "root",
  MainPage,
  mediatorConfig
}) {
  if (typeof MainPage !== "function") {
    throw new Error(`
    Invalid param for MediatorStarter#start() : MainPage.
    This is required and must be a valid React element.
    `);
  }

  if (mediatorConfig && typeof mediatorConfig !== "function") {
    throw new Error(`
    Invalid param for MediatorStarter#start() : mediatorConfigs.
    This is required and must be a function.
    `);
  }

  ReactDOM.render(
    <MediatorApp mainPage={MainPage} />,
    document.getElementById(targetDomElementId)
  );
}
