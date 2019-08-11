import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as navigation from "../navigation";

export default React.memo(NativeMicroApp);

function NativeMicroApp(props) {
  useEffect(() => {
    props.microAppState.start(props.microAppId, props.params, {
      events: props.scopedEventsFn,
      navigation,
    });

    return () => {
      props.microAppState.stop(props.microAppId);
    };
  }, []);
  return <div id={props.microAppId} className={props.cssClass}></div>;
}

NativeMicroApp.propTypes = {
  app: PropTypes.string.isRequired,
  cssClass: PropTypes.string,
  microAppId: PropTypes.string.isRequired,
  microAppState: PropTypes.object.isRequired,
  params: PropTypes.object,
  scopedEventsFn: PropTypes.objectOf(PropTypes.func).isRequired,
};
