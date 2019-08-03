import React, { useEffect, useState } from "react";
import loadServiceManifest from "./loadServiceManifest";
import { useTranslation } from "react-i18next";
import {
  addMicroAppLoadWatcher,
  isManifestLoaded,
  isManifestLoading,
  isMicroAppLoaded,
  isMicroAppLoading,
  microAppConfigFromState,
  store
} from "./GlobalState";
import NativeMicroApp from "./MicroAppTypes/NativeMicroApp";
const renderers = {
  elm: NativeMicroApp
};
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
export default function MicroAppComponent(props) {
  const [isMicroAppLaunchable, setMicroAppLaunchable] = useState(false);
  const [wrapperId, setWrapperId] = useState(props.app + "@" + uuidv4());
  console.log(`%c${wrapperId}`, "color:red;", props);
  const manifestUrl =
    props.manifestUrl || `/${props.serviceName}/assets/components.json`;
  console.log(`1 ${wrapperId} manifestUrl au tout début : `, manifestUrl);
  console.log(
    `1 ${wrapperId} manifest loaded: `,
    isManifestLoaded(manifestUrl, wrapperId)
  );

  const { t } = useTranslation();
  let Renderer = null;
  if (isManifestLoaded(manifestUrl, wrapperId)) {
    console.log(`1 ${wrapperId} manifest loaded, setup renderer`);
    const microAppConfig = microAppConfigFromState(
      wrapperId,
      manifestUrl,
      props.app
    );
    console.log(`1 ${wrapperId} microAppConfig:`, microAppConfig);
    if (typeof microAppConfig !== "object") return;
    Renderer = renderers[microAppConfig.type];
  }
  console.log(
    `1 ${wrapperId} is microApp loaded:`,
    isMicroAppLoaded(props.app)
  );
  if (!isMicroAppLoaded(props.app)) {
    console.log(`1 ${wrapperId} microApp not loaded, add loadCallback`);
    addMicroAppLoadWatcher(
      props.app,
      () => {
        console.log(
          "1/LAUNCH : isMicroAppLaunchable vaut : ",
          isMicroAppLaunchable
        );
        if (isMicroAppLaunchable === false) {
          console.log("1/LAUNCH : setMicroAppLaunchable à true", true);
          setMicroAppLaunchable(true);
        }
      },
      wrapperId
    );
  } else {
    console.log(`1 ${wrapperId} microApp loaded, start application`);
  }

  useEffect(() => {
    async function loadMicroApp() {
      if (isManifestLoading(manifestUrl, wrapperId)) {
        console.log(
          `2 ${wrapperId} MicroAppComponent > useEffect/loadMicroApp > manifest is loading, out!`
        );
        return;
      }
      console.log(
        `2 ${wrapperId} MicroAppComponent > useEffect/loadMicroApp > start loading manifest <<<<<<<<<<<<`
      );
      if (!isManifestLoaded(manifestUrl, wrapperId)) {
        console.log(`2 ${wrapperId} on loade le manifeste`);
        await lmanifest();
      }
      if (!isMicroAppLoaded(props.app)) {
        console.log(`2 ${wrapperId} on loade microApp`);
        lMicroApp();
      }

      function lMicroApp() {
        const microAppConfig = microAppConfigFromState(
          wrapperId,
          manifestUrl,
          props.app
        );

        console.log(`3 ${wrapperId} loadMicroAppCode <<<<<<`, microAppConfig);
        if (isMicroAppLoading(props.app)) return;
        store.dispatch({
          type: "loadMicroApp",
          microAppName: props.app
        });
        const script = document.createElement("script");
        script.src = microAppConfig.url;
        document.body.appendChild(script);
      }
    }
    console.log(`2 ${wrapperId} in useEffect loadMicroApp :`, manifestUrl);
    loadMicroApp();
  });
  async function lmanifest() {
    store.dispatch({ type: "loadManifest", url: manifestUrl });
    try {
      let loadedManifest = await loadServiceManifest(manifestUrl);
      if (!loadedManifest.error) {
        console.log(
          `2 ${wrapperId} loadedManifest (apres await):`,
          loadedManifest
        );
        store.dispatch({
          type: "storeManifest",
          url: manifestUrl,
          content: loadedManifest
        });
      }
    } catch (error) {
      store.dispatch({
        type: "storeManifestError",
        url: manifestUrl,
        error
      });
    }
  }

  if (!isMicroAppLaunchable) {
    return <div>{t(`loading micro app ${props.app} in ${wrapperId}`)}</div>;
  }
  return (
    <Renderer
      type="micro-app-component"
      app={props.app}
      wrapperId={wrapperId}
    />
  );
}
