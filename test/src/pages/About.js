import React from "react";
import { useEvents } from "mf-maestro";
import UsersIndex from "../components/users/All";

export default function About() {
  const [pageRef, events] = useEvents("About");
  events.redirectOnEvent("microApp2:navigationBlocked", "/?from=:from");

  return (
    <div data-id="about-page">
      <h2>About</h2>
      <UsersIndex />
    </div>
  );
}
