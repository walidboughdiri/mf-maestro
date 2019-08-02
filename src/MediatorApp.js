import React from "React";
import { Router } from "react-router-dom";
import { browserHistory } from "./BrowserHistory";

export default function MediatorApp(props) {
  const MainPage = props.mainPage;
  return (
    <Router history={browserHistory}>
      <div>
        <div>MediaApp</div>
        <MainPage />
      </div>
    </Router>
  );
}
