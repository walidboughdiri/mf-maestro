import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadAndStoreManifest } from "./loadServiceManifest";
import { loadMicroAppJsFile } from "./loadMicroAppJsFile";
import { addMicroAppLoadWatcher } from "./store/states/loadCallbacks";
import { getMicroAppLoadingComponent } from "./store/states/app";
import {
  isManifestLoaded,
  microAppConfigFromState,
} from "./store/states/loadedManifests";
import {
  isMicroAppLoaded,
  microAppState,
} from "./store/states/loadedMicroApps";
import NativeMicroApp from "./MicroAppTypes/NativeMicroApp";
import useEvents from "./effects/useEvents";

const microAppTypes = {
  elm: NativeMicroApp,
};

export default function MicroAppComponent(props) {
  const [loadStatus, setLoadStatus] = useState("init");
  const [isMicroAppLaunchable, setMicroAppLaunchable] = useState(
    isMicroAppLoaded(props.app)
  );
  const [groupRef, scopedEventsFn] = useEvents(props.groupRef);
  console.log(
    `%crendering ${groupRef}/${props.app} component`,
    "color:red;",
    props
  );
  const manifestUrl =
    props.manifestUrl || `/${props.serviceName}/assets/components.json`;

  let Renderer = null;
  if (isManifestLoaded(manifestUrl, groupRef)) {
    const microAppConfig = microAppConfigFromState(
      groupRef,
      manifestUrl,
      props.app
    );
    if (typeof microAppConfig !== "object") return;
    Renderer = microAppTypes[microAppConfig.type];
  }
  if (!isMicroAppLoaded(props.app)) {
    addMicroAppLoadWatcher(
      props.app,
      () => {
        if (isMicroAppLaunchable === false) {
          setMicroAppLaunchable(true);
        }
      },
      groupRef
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
      switch (loadMicroAppJsFile(manifestUrl, props.app, groupRef)) {
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

  const LoadingComponent = getMicroAppLoadingComponent();

  let content = !isMicroAppLaunchable ? (
    <LoadingComponent groupRef={groupRef} loadStatus={loadStatus} />
  ) : (
    <Renderer
      app={props.app}
      autostart={props.autostart}
      cssClass={props.cssClass || props.app}
      groupRef={groupRef}
      microAppState={microAppState(props.app)}
      params={props.params}
      scopedEventsFn={scopedEventsFn}
    />
  );

  return (
    <div id={groupRef} className={props.cssClass}>
      {content}
    </div>
  );
}

MicroAppComponent.propTypes = {
  app: PropTypes.string.isRequired,
  groupRef: PropTypes.string,
  cssClass: PropTypes.string,
  manifestUrl: PropTypes.string.isRequired,
  params: PropTypes.object,
  serviceName: PropTypes.string,
};
