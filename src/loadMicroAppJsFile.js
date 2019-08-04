import { validate } from "bycontract";
import {
  isMicroAppLoaded,
  isMicroAppLoading,
  microAppConfigFromState,
  store
} from "./GlobalState";

export function loadMicroAppJsFile(manifestUrl, microAppName, wrapperId) {
  validate(arguments, ["string", "string", "string"]);
  if (isMicroAppLoading(microAppName)) return "loading";
  if (isMicroAppLoaded(microAppName)) return "loaded";
  const microAppConfig = microAppConfigFromState(
    wrapperId,
    manifestUrl,
    microAppName
  );

  store.dispatch({
    type: "loadMicroApp",
    microAppName
  });
  const script = document.createElement("script");
  script.src = microAppConfig.url;
  document.body.appendChild(script);

  return true;
}
