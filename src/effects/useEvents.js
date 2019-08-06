import { useEffect, useState } from "react";
import { uuidv4 } from "../helpers";
import { removeListenersByGroup } from "../events";

export default function useEvents() {
  const [storeEventGroupId] = useState(uuidv4());
  useEffect(() => {
    return () => {
      removeListenersByGroup(storeEventGroupId);
    };
  });

  return storeEventGroupId;
}
