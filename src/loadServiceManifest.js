import {
  getManifestLoadListeners,
  isManifestLoaded,
  isManifestLoading,
} from "./store/states/loadedManifests";
import { store } from "./store/store";

export async function appManifestLoad(manifestUrl) {
  const response = await fetch(manifestUrl);
  if (!response.ok) {
    switch (response.status) {
      case 404:
        return {
          error: response.statusText,
          errorDetail: `Unable to load the manifest file for '${manifestUrl}' (404)`,
          response,
        };
    }
  }
  const data = await response.json();
  return data;
}

export async function loadAndStoreManifest(manifestUrl) {
  if (isManifestLoading(manifestUrl)) {
    return "loading";
  }
  if (isManifestLoaded(manifestUrl)) {
    return "loaded";
  }
  store.dispatch({ type: "loadManifest", url: manifestUrl });
  try {
    let loadedManifest = await appManifestLoad(manifestUrl);
    if (!loadedManifest.error) {
      const listeners = getManifestLoadListeners(manifestUrl);
      store.dispatch({
        type: "storeManifest",
        url: manifestUrl,
        content: loadedManifest,
      });
      Object.values(listeners).forEach(callback => {
        callback();
      });

      return true;
    }
  } catch (error) {
    console.log(error);
    store.dispatch({
      type: "storeManifestError",
      url: manifestUrl,
      error,
    });
    return "error";
  }
}
