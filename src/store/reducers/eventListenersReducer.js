export default function eventListenersReducer(state, action) {
  switch (action.type) {
    case "removeEventListener":
      if (
        typeof state[action.storeGroupId] !== "object" ||
        !Array.isArray(state[action.storeGroupId][action.event])
      ) {
        return state;
      }
      return {
        ...state,
        [action.storeGroupId]: {
          ...state[action.storeGroupId],
          [action.event]: state[action.storeGroupId][action.event].filter(
            callback => {
              callback !== action.callback;
            }
          ),
        },
      };
    case "removeEventListeners":
      if (typeof state[action.storeGroupId] === "object") {
        delete state[action.storeGroupId];
      }
      return state;
    case "addEventListener":
      if (typeof state[action.storeGroupId] !== "object") {
        state[action.storeGroupId] = {};
      }
      if (!Array.isArray(state[action.storeGroupId][action.event])) {
        state[action.storeGroupId][action.event] = [action.callback];
        return state;
      }
      if (state[action.storeGroupId][action.event].includes(action.callback)) {
        return state;
      }

      return {
        ...state,
        [action.storeGroupId]: {
          ...state[action.storeGroupId],
          [action.event]: [
            ...state[action.storeGroupId][action.event],
            ...[action.callback],
          ],
        },
      };
    default:
      return state;
  }
}
