import React, { useEffect } from "react";
import { microAppState } from "../AppStateStore";

export default React.memo(function NativeMicroApp(props) {
  useEffect(() => {
    microAppState(props.app).start(props.wrapperId, {});
  }, []);
  return <div id={props.wrapperId}></div>;
});
