import React from "react";
import { useEvents } from "mf-maestro";
import UsersIndex from "../components/users/All";

export default function About() {
  const [pageRef, events] = useEvents("About");
  events.redirectOnEvent("microApp2:navigationBlocked", "/?from=:from");

  const loadApp2 = () => {
    events.emit(
      "users:change",
      "http://localhost:3000/assets/manifest2.json",
      "micro-app-2"
    );
  };

  const loadApp1 = () => {
    events.emit(
      "users:change",
      "http://localhost:3000/assets/manifest.json",
      "micro-app-1"
    );
  };

  return (
    <div data-id="about-page">
      <h2>
        About
        <button data-id="load-app-1" onClick={loadApp1}>
          Load App 1
        </button>
        <button data-id="load-app-2" onClick={loadApp2}>
          Load App 2
        </button>
      </h2>
      <UsersIndex />
    </div>
  );
}
