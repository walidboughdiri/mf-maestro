import { validate } from "byContract";
import {
  appIsInitialized,
  initializeApp,
  setMicroAppLoadingComponent,
} from "../store/states/app";

export default function configureApp(init, events) {
  validate(init, "function=");
  if (appIsInitialized()) return;
  if (init == undefined) return;
  initializeApp();
  const config = init({
    mutateEvent: events.mutateEvent,
    on: events.on,
    once: events.once,
    redirectOnEvent: events.redirectOnEvent,
  });

  setMicroAppLoadingComponent(config.MicroAppLoadingComponent);
}
