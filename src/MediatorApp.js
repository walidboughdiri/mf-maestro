import React from "React";
import PropTypes from "prop-types";
import { Router } from "react-router-dom";
import { browserHistory } from "./BrowserHistory";
import useEvents from "./effects/useEvents";
import { appIsInitialized, initializeApp } from "./AppStateStore";

export default function MediatorApp(props) {
  const [appId, events] = useEvents("MediatorApp");

  if (!appIsInitialized() && props.init) {
    initializeApp();
    props.init({
      mutateEvent: events.mutateEvent,
      on: events.on,
      once: events.once,
      redirectOnEvent: events.redirectOnEvent,
    });
  }

  const MainPage = props.mainPage;
  return (
    <Router history={browserHistory}>
      <MainPage />
    </Router>
  );
}

MediatorApp.propTypes = {
  init: PropTypes.func,
  mainPage: PropTypes.elementType.isRequired,
};
