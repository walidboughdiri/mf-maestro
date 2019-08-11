export default function loadedMicroApps(state = {}, action) {
  switch (action.type) {
    case "loadMicroApp":
      return {
        ...state,
        [action.microAppName]: {
          state: "loading",
          callback: action.callback,
        },
      };
    case "addMicroApp":
      return {
        ...state,
        [action.microAppName]: {
          state: "loaded",
          ...action.microAppObject,
        },
      };
    default:
      return state;
  }
}
