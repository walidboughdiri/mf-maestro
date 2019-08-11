import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { loadAndStoreManifest } from "./loadServiceManifest";
import { loadMicroAppJsFile } from "./loadMicroAppJsFile";
import {
  addMicroAppLoadWatcher,
  isManifestLoaded,
  isMicroAppLoaded,
  microAppConfigFromState,
  microAppState,
} from "./AppStateStore";
import NativeMicroApp from "./MicroAppTypes/NativeMicroApp";
import useEvents from "./effects/useEvents";
const renderers = {
  elm: NativeMicroApp,
};

export default function MicroAppComponent(props) {
  const [loadStatus, setLoadStatus] = useState("init");
  const [isMicroAppLaunchable, setMicroAppLaunchable] = useState(
    isMicroAppLoaded(props.app)
  );
  const [microAppId, scopedEventsFn] = useEvents(props.app);
  console.log(`%crendering ${microAppId} component`, "color:red;", props);
  const manifestUrl =
    props.manifestUrl || `/${props.serviceName}/assets/components.json`;

  const { t } = useTranslation();
  let Renderer = null;
  if (isManifestLoaded(manifestUrl, microAppId)) {
    const microAppConfig = microAppConfigFromState(
      microAppId,
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
      microAppId
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
      switch (loadMicroAppJsFile(manifestUrl, props.app, microAppId)) {
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
        {microAppId} - {loadStatus}
      </div>
    );
  }
  return (
    <Renderer
      app={props.app}
      cssClass={props.cssClass || props.app}
      microAppId={microAppId}
      microAppState={microAppState(props.app)}
      params={props.params}
      scopedEventsFn={scopedEventsFn}
    />
  );
}

MicroAppComponent.propTypes = {
  app: PropTypes.string.isRequired,
  cssClass: PropTypes.string,
  manifestUrl: PropTypes.string.isRequired,
  params: PropTypes.object,
  serviceName: PropTypes.string,
};
