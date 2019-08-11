export default function loadedManifestsReducer(state = {}, action) {
  switch (action.type) {
    case "loadManifest":
      return {
        ...state,
        [action.url]: {
          state: "loading",
          content: null,
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
