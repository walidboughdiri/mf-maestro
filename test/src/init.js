import DemoMicroAppLoadingComponent from "./components/DemoMicroAppLoadingComponent";

export default function init({ mutateEvent, redirectOnEvent }) {
  mutateEvent("ma1:onceEvent", "init:ma1:onceEvent");
  redirectOnEvent("redirect:home", "/", {
    emitBefore: "redirect:home:emitBeforeEvent",
    emitAfter: "redirect:home:emitAfterEvent",
  });

  return {
    MicroAppLoadingComponent: DemoMicroAppLoadingComponent,
  };
}
