import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as navigation from "../navigation";

export default React.memo(NativeMicroApp);

function NativeMicroApp(props) {
  const appNode = useRef(null);
  useEffect(() => {
    props.microAppState.start(props.groupRef, props.params, {
      appNode: appNode.current,
      events: props.scopedEventsFn,
      navigation,
      queryParams: props.queryParams,
    });

    return () => {
      props.microAppState.stop(props.groupRef);
    };
  }, []);
  return (
    <div data-id="app-wrapper" className="app-wrapper" ref={appNode}></div>
  );
}

NativeMicroApp.propTypes = {
  app: PropTypes.string.isRequired,
  cssClass: PropTypes.string,
  groupRef: PropTypes.string.isRequired,
  microAppState: PropTypes.object.isRequired,
  queryParams: PropTypes.object,
  params: PropTypes.object,
  scopedEventsFn: PropTypes.objectOf(PropTypes.func).isRequired,
};
