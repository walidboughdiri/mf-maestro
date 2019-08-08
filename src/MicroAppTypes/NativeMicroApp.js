import React, { useEffect } from "react";

export default React.memo(function NativeMicroApp(props) {
  useEffect(() => {
    props.microAppState.start(props.microAppId, props.params, {
      events: props.scopedEventsFn
    });

    return () => {
      props.microAppState.stop(props.microAppId);
    };
  }, []);
  return <div id={props.microAppId}></div>;
});
