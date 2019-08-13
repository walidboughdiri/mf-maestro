import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { loadAndStoreManifest } from "./loadServiceManifest";
import { loadMicroAppJsFile } from "./loadMicroAppJsFile";
import { addMicroAppLoadWatcher } from "./store/states/loadCallbacks";
import { getMicroAppLoadingComponent } from "./store/states/app";
import { microAppConfigFromState } from "./store/states/loadedManifests";
import { getMicroAppState } from "./store/states/loadedMicroApps";
import NativeMicroApp from "./MicroAppTypes/NativeMicroApp";
import useEvents from "./effects/useEvents";

const microAppTypes = {
  elm: NativeMicroApp,
};

export default function MicroAppComponent(props) {
  const appRef = useRef(null);
  const manifestUrlRef = useRef(null);
  const [groupRef, scopedEventsFn] = useEvents(props.groupRef);
  const manifestUrl =
    props.manifestUrl || `/${props.serviceName}/assets/components.json`;
  const microAppConfig = microAppConfigFromState(
    groupRef,
    manifestUrl,
    props.app
  );
  const Renderer =
    microAppConfig && microAppConfig.type
      ? microAppTypes[microAppConfig.type]
      : null;

  const microAppState = getMicroAppState(props.app);

  const [loadStatus, setLoadStatus] = useState(
    microAppState
      ? "startable"
      : microAppConfig
      ? "loading microApp"
      : "loading manifest"
  );
  console.log(`••••rendering ${groupRef}/${props.app} (${loadStatus})`, props);
  if (
    props.app !== appRef.current ||
    props.manifestUrl !== manifestUrlRef.current
  ) {
    if (appRef.current && manifestUrlRef.current && loadStatus === "startable")
      setLoadStatus("props changed");
    appRef.current = props.app;
    manifestUrlRef.current = props.manifestUrl;
  }
  if (!microAppState) {
    addMicroAppLoadWatcher(
      props.app,
      () => setLoadStatus("startable"),
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
          if (loadStatus !== "startable") setLoadStatus("startable");
          break;
        case "loading":
          if (loadStatus !== "loading microApp")
            setLoadStatus("loading microApp");
          break;
      }
    }
    loadMicroApp();
  });

  const LoadingComponent = getMicroAppLoadingComponent();
  let content =
    loadStatus !== "startable" ? (
      <LoadingComponent groupRef={groupRef} loadStatus={loadStatus} />
    ) : (
      <Renderer
        app={props.app}
        autostart={props.autostart}
        cssClass={props.cssClass || props.app}
        groupRef={groupRef}
        microAppState={microAppState}
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
