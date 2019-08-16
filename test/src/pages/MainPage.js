import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Topics from "./Topics";
export default function MainPage(props) {
  return (
    <div>
      MainPage Content
      <ul data-id="menu">
        <li>
          <Link data-id="home" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link data-id="about" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link data-id="topics" to="/topics">
            Topics
          </Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  );
}
