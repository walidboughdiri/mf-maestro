export default function loadCallbacksReducer(state = {}, action) {
  switch (action.type) {
    case "deleteMicroAppLoadWatchers":
      delete state[action.appName];
      return state;
    case "addMicroAppLoadWatcher":
      if (typeof state[action.appName] !== "object") {
        state[action.appName] = {};
      }
      return {
        ...state,
        [action.appName]: {
          ...state[action.appName],
          [action.wrapperId]: action.callback,
        },
      };
    default:
      return state;
  }
}
