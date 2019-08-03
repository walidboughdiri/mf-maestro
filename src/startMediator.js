import "regenerator-runtime/runtime";
import "./GlobalState";
import "./GlobalNamespace";
import React from "react";
import ReactDOM from "react-dom";
import MediatorApp from "./MediatorApp";
import "./i18n";
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
