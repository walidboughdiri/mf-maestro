import { navigation } from "mf-maestro";
import DemoMicroAppLoadingComponent from "./components/DemoMicroAppLoadingComponent";

export default function init({ mutateEvent, on, once, redirectOnEvent }) {
  mutateEvent("ma1:onceEvent", "ma3:onceEvent");
  redirectOnEvent("microApp2:navigationBlocked", "/", {
    emitBefore: "emitBeforeEvent",
    emitAfter: "emitAfterEvent",
  });

  return {
    MicroAppLoadingComponent: DemoMicroAppLoadingComponent,
  };
}
