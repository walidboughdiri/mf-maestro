import React from "react";
import PropTypes from "prop-types";
import { Router } from "react-router-dom";
import { browserHistory } from "./browserHistory";
import useEvents from "./effects/useEvents";
import configureApp from "./services/configureApp";

export default function MediatorApp(props) {
  const [appId, events] = useEvents("MediatorApp");
  configureApp(props.init, events);
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
