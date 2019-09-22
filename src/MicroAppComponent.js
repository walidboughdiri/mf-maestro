import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import JSON5 from "json5";
import { loadAndStoreManifest } from "./loadServiceManifest";
import { loadMicroAppJsFile } from "./loadMicroAppJsFile";
import { addMicroAppLoadWatcher } from "./store/states/loadCallbacks";
import { getMicroAppLoadingComponent } from "./store/states/app";
import {
  addManifestLoadListener,
  microAppConfigFromState,
} from "./store/states/loadedManifests";
import { getMicroAppState } from "./store/states/loadedMicroApps";
import NativeMicroApp from "./MicroAppTypes/NativeMicroApp";
import useEvents from "./effects/useEvents";
import { withRouter } from "react-router";
import { removeListenersByGroup } from "./events";

const microAppTypes = {};

const loadStatuses = [
  "loadingCode",
  "loadingManifest",
  "manifestLoaded",
  "manifestNotLoaded",
  "propsChanged",
  "canStart",
];

function getLoadStatus(status) {
  if (!loadStatuses.includes(status))
    throw `Trying to get an unknown status : ${status}`;
  return status;
}

function MicroAppComponent(props) {
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
      : NativeMicroApp;

  const microAppState = getMicroAppState(props.app);

  const [loadStatus, setLoadStatus] = useState(
    microAppState
      ? getLoadStatus("canStart")
      : microAppConfig
      ? getLoadStatus("manifestLoaded")
      : getLoadStatus("manifestNotLoaded")
  );
  function updateLoadStatus(status) {
    if (!loadStatuses.includes(status))
      throw `Trying to set an unknown status to loadStatus : ${status}`;
    if (status === loadStatus) return;
    setLoadStatus(status);
  }
  if (
    props.app !== appRef.current ||
    props.manifestUrl !== manifestUrlRef.current
  ) {
    if (
      appRef.current &&
      manifestUrlRef.current &&
      loadStatus === getLoadStatus("canStart")
    ) {
      removeListenersByGroup(props.groupRef);
      updateLoadStatus("propsChanged");
    }
    appRef.current = props.app;
    manifestUrlRef.current = props.manifestUrl;
  }
  useEffect(() => {
    async function loadMicroApp() {
      const lm = await loadAndStoreManifest(manifestUrl);
      if (lm === "loading") {
        if (loadStatus === getLoadStatus("loadingManifest")) return;
        addManifestLoadListener(manifestUrl, `${props.app}@${groupRef}`, () => {
          updateLoadStatus("manifestLoaded");
        });
        updateLoadStatus("loadingManifest");
        return;
      }
      const microAppLoad = loadMicroAppJsFile(manifestUrl, props.app, groupRef);
      switch (microAppLoad) {
        case true:
          if (loadStatus === getLoadStatus("loadingCode")) break;
          addMicroAppLoadWatcher(
            props.app,
            () => updateLoadStatus("canStart"),
            groupRef
          );
          updateLoadStatus("loadingCode");

          break;
        case "loaded":
          if (loadStatus === getLoadStatus("canStart")) break;
          updateLoadStatus("canStart");
          break;
        case "loading":
          if (loadStatus === getLoadStatus("loadingCode")) break;
          addMicroAppLoadWatcher(
            props.app,
            () => updateLoadStatus("canStart"),
            groupRef
          );
          updateLoadStatus("loadingCode");
          break;
      }
    }
    loadMicroApp();
  });

  const queryVar = new URL(window.location).searchParams.get(groupRef);
  const queryParams = props.queryParser
    ? props.queryParser(queryVar)
    : JSON5.parse(queryVar);

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
        params={{ ...props.params, ...props.match.params }}
        queryParams={queryParams}
        scopedEventsFn={scopedEventsFn}
      />
    );

  const ref = `${props.app}@${groupRef}`;

  return (
    <div id={groupRef} data-app-ref={ref} className={props.cssClass}>
      {content}
    </div>
  );
}

MicroAppComponent.propTypes = {
  app: PropTypes.string.isRequired,
  cssClass: PropTypes.string,
  groupRef: PropTypes.string,
  manifestUrl: PropTypes.string.isRequired,
  params: PropTypes.object,
  queryParser: PropTypes.func,
  serviceName: PropTypes.string,
};

export default withRouter(MicroAppComponent);
