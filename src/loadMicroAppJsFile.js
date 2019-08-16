import { validate } from "byContract";
import { microAppConfigFromState } from "./store/states/loadedManifests";
import {
  isMicroAppLoaded,
  isMicroAppLoading,
} from "./store/states/loadedMicroApps";
import { store } from "./store/store";

export function loadMicroAppJsFile(manifestUrl, microAppName, wrapperId) {
  validate(arguments, ["string", "string", "string"]);
  if (isMicroAppLoading(microAppName)) return "loading";
  if (isMicroAppLoaded(microAppName)) return "loaded";
  const microAppConfig = microAppConfigFromState(
    wrapperId,
    manifestUrl,
    microAppName
  );

  store.dispatch({ type: "loadMicroApp", microAppName });

  const script = document.createElement("script");
  script.src = microAppConfig.url;
  document.body.appendChild(script);

  if (microAppConfig.css) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = microAppConfig.css;
    link.media = "all";

    document.getElementsByTagName("head")[0].appendChild(link);
  }
  return true;
}
