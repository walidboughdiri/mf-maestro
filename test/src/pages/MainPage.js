import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Topics from "./Topics";
export default function MainPage(props) {
  return (
    <div>
      Main Menu
      <ul data-id="menu">
        <li>
          <Link data-id="home" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link data-id="about" to="/about/12/charlie">
            Demo dynamic props & navigation
          </Link>
        </li>
        <li>
          <Link data-id="topics" to="/topics">
            Demo master/detail
          </Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about/:id/:name" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  );
}
