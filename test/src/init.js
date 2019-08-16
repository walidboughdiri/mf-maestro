import { navigation } from "mf-maestro";
import DemoMicroAppLoadingComponent from "./components/DemoMicroAppLoadingComponent";

export default function init({ mutateEvent, on, once, redirectOnEvent }) {
  mutateEvent("ma1:onceEvent", "ma3:onceEvent");
  mutateEvent(
    "microApp2@usersIndex:sendTestEvent",
    "microApp2@usersIndex:mutatedTestEvent"
  );
  redirectOnEvent("microApp2:navigationBlocked", "/", {
    emitBefore: "emitBeforeEvent",
    emitAfter: "emitAfterEvent",
  });
  mutateEvent("microApp1:navigationBlocked", "mutatedSendEvent", function(
    id,
    x,
    y
  ) {
    return [id, x + 1, y + 2];
  });
  on("mutatedSendEvent", (...args) =>
    console.log("mutatedSendEvent > args", args)
  );

  mutateEvent("loadApp2", "MicroApp2:start");

  on("MicroApp2:start", (...args) => {
    console.log("MicroApp2:start > args", args);
  });

  return {
    MicroAppLoadingComponent: DemoMicroAppLoadingComponent,
  };
}
