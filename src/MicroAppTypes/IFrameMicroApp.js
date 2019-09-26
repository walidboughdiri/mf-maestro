import React, { useEffect, useRef } from "react";
import useEvents from "../effects/useEvents";

export default React.memo(IFrameMicroApp);

function IFrameMicroApp(props) {
  const targetUrl = new URL(props.src);
  const iframeNode = useRef(null);
  const [groupRef, events] = useEvents(props.groupRef);

  Object.entries(props.forwards).forEach(([srcEvent, targetEvent]) => {
    events.on(srcEvent, (...args) => forwardMessage(targetEvent, ...args));
  });

  function forwardMessage(...args) {
    iframeNode.current.contentWindow.postMessage(args, targetUrl.origin);
  }
  function receiveMessage(message) {
    if (message.origin !== targetUrl.origin) {
      return;
    }
    if (!props.authorizedEvents.includes(message.data.event)) {
      return;
    }
    switch (message.data.action) {
      case "emit":
        events.emit(message.data.event, message.data.argument);
        break;
    }
  }
  window.addEventListener("message", receiveMessage, false);

  useEffect(() => {
    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, []);

  return <iframe style={props.style} ref={iframeNode} src={props.src}></iframe>;
}
