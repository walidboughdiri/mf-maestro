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

const loadStatuses = [
  "loadingCode",
  "loadingManifest",
  "propsChanged",
  "canStart",
];

function getLoadStatus(status) {
  if (!loadStatuses.includes(status))
    throw `Trying to get an unknown status : ${status}`;
  return status;
}

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
      ? getLoadStatus("canStart")
      : microAppConfig
      ? getLoadStatus("loadingCode")
      : getLoadStatus("loadingManifest")
  );
  function updateLoadStatus(status) {
    if (!loadStatuses.includes(status))
      throw `Trying to set an unknown status to loadStatus : ${status}`;
    if (status === loadStatus) return;
    setLoadStatus(status);
  }
  console.log(`••••rendering ${groupRef}/${props.app} (${loadStatus})`, props);
  if (
    props.app !== appRef.current ||
    props.manifestUrl !== manifestUrlRef.current
  ) {
    if (
      appRef.current &&
      manifestUrlRef.current &&
      loadStatus === getLoadStatus("canStart")
    )
      updateLoadStatus("propsChanged");
    appRef.current = props.app;
    manifestUrlRef.current = props.manifestUrl;
  }
  if (!microAppState) {
    addMicroAppLoadWatcher(
      props.app,
      () => updateLoadStatus("canStart"),
      groupRef
    );
  }
  useEffect(() => {
    async function loadMicroApp() {
      if ((await loadAndStoreManifest(manifestUrl)) === "loading") {
        updateLoadStatus("loadingManifest");
        return;
      }
      switch (loadMicroAppJsFile(manifestUrl, props.app, groupRef)) {
        case "loaded":
          updateLoadStatus("canStart");
          break;
        case "loading":
          updateLoadStatus("loadingCode");
          break;
      }
    }
    loadMicroApp();
  });

  const LoadingComponent = getMicroAppLoadingComponent();
  let content =
    loadStatus !== getLoadStatus("canStart") ? (
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
