export default function loadedManifestsReducer(state = {}, action) {
  switch (action.type) {
    case "addManifestLoadListener":
      return {
        ...state,
        [action.manifestUrl]: {
          ...state[action.manifestUrl],
          listeners: {
            ...state[action.manifestUrl].listeners,
            [action.ref]: action.listener,
          },
        },
      };
    case "loadManifest":
      return {
        ...state,
        [action.url]: {
          state: "loading",
          content: null,
          listeners: {},
        },
      };
    case "storeManifest":
      return {
        ...state,
        [action.url]: {
          state: "loaded",
          content: action.content,
        },
      };
    case "storeManifestError":
      return {
        ...state,
        [action.url]: {
          state: "error",
          content: action.error,
        },
      };
    default:
      return state;
  }
}
