export default function navigationReducer(state = {}, action) {
  switch (action.type) {
    case "resetNavigation":
      return {};
    case "storeBlockedNavigation":
      return {
        ...state,
        targetLocation: action.targetLocation,
        unblockFn: action.unblockFn,
      };
    default:
      return state;
  }
}
