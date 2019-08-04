import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadAndStoreManifest } from "./loadServiceManifest";
import { loadMicroAppJsFile } from "./loadMicroAppJsFile";
import { uuidv4 } from "./helpers";
import {
  addMicroAppLoadWatcher,
  isManifestLoaded,
  isMicroAppLoaded,
  microAppConfigFromState
} from "./GlobalState";
import NativeMicroApp from "./MicroAppTypes/NativeMicroApp";
const renderers = {
  elm: NativeMicroApp
};

export default function MicroAppComponent(props) {
  const [loadStatus, setLoadStatus] = useState("init");
  const [isMicroAppLaunchable, setMicroAppLaunchable] = useState(
    isMicroAppLoaded(props.app)
  );
  const [wrapperId, setWrapperId] = useState(props.app + "@" + uuidv4());
  console.log(`%c${wrapperId}`, "color:red;", props);
  const manifestUrl =
    props.manifestUrl || `/${props.serviceName}/assets/components.json`;

  const { t } = useTranslation();
  let Renderer = null;
  if (isManifestLoaded(manifestUrl, wrapperId)) {
    const microAppConfig = microAppConfigFromState(
      wrapperId,
      manifestUrl,
      props.app
    );
    if (typeof microAppConfig !== "object") return;
    Renderer = renderers[microAppConfig.type];
  }
  if (!isMicroAppLoaded(props.app)) {
    addMicroAppLoadWatcher(
      props.app,
      () => {
        if (isMicroAppLaunchable === false) {
          setMicroAppLaunchable(true);
        }
      },
      wrapperId
    );
  }
  useEffect(() => {
    async function loadMicroApp() {
      switch (await loadAndStoreManifest(manifestUrl)) {
        case "loading":
          if (loadStatus !== "loading manifest")
            setLoadStatus("loading manifest");
          return;
        case "loaded":
          break;
        case true:
          break;
      }
      switch (loadMicroAppJsFile(manifestUrl, props.app, wrapperId)) {
        case "loaded":
          setMicroAppLaunchable(true);
          break;
        case "loading":
          if (loadStatus !== "loading micro app code file")
            setLoadStatus("loading micro app code file");
          break;
      }
    }
    loadMicroApp();
  });

  if (!isMicroAppLaunchable) {
    return (
      <div>
        {wrapperId} - {loadStatus}
      </div>
    );
  }
  return (
    <Renderer
      type="micro-app-component"
      app={props.app}
      wrapperId={wrapperId}
    />
  );
}
