import { validate } from "byContract";
import { store } from "../store";

export function addManifestLoadListener(manifestUrl, ref, listener) {
  validate(arguments, ["string", "string", "function"]);
  return store.dispatch({
    listener,
    manifestUrl,
    ref,
    type: "addManifestLoadListener",
  });
}

export function getManifestLoadListeners(manifestUrl) {
  return store.getState().loadedManifests[manifestUrl].listeners;
}

export function isManifestLoaded(manifestUrl) {
  validate(arguments, ["string"]);
  return isManifestInState(manifestUrl, "loaded");
}

export function isManifestLoading(manifestUrl) {
  validate(arguments, ["string"]);
  return isManifestInState(manifestUrl, "loading");
}

export function isManifestInState(manifestUrl, state) {
  validate(arguments, ["string", "string"]);
  if (state !== "loading" && state !== "loaded") {
    throw `wrong state for manifest (state: "${state}")`;
  }
  const { loadedManifests } = store.getState();
  return (
    manifestUrl in loadedManifests &&
    loadedManifests[manifestUrl].state === state
  );
}

export function microAppConfigFromState(
  componentId,
  manifestUrl,
  microAppName
) {
  validate(arguments, ["string", "string", "string"]);
  if (!isManifestLoaded(manifestUrl, componentId)) return null;
  const manifestState = store.getState().loadedManifests[manifestUrl];
  if (manifestState === undefined) return null;
  return manifestState.content[microAppName];
}
