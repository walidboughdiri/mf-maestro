import { validate } from "byContract";
import MicroAppLoadingComponent from "../MicroAppLoadingComponent";
import {
  appIsInitialized,
  initializeApp,
  setMicroAppLoadingComponent,
} from "../store/states/app";

export default function configureApp(init, events) {
  validate(init, "function=");
  if (appIsInitialized()) return;
  initializeApp();
  const config =
    typeof init === "function"
      ? init({
          mutateEvent: events.mutateEvent,
          on: events.on,
          once: events.once,
          redirectOnEvent: events.redirectOnEvent,
        })
      : { MicroAppLoadingComponent };

  setMicroAppLoadingComponent(config.MicroAppLoadingComponent);
}
