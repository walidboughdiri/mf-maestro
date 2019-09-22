import React from "react";
import { useEvents } from "mf-maestro";
import { MicroAppComponent } from "mf-maestro";

export default function Topics() {
  const [pageRef, events] = useEvents("Topic");
  events.redirectOnEvent("users:master:end", "/");
  const targetEventFn = function(...args) {
    switch (args[0]) {
      case "User 1":
        return "users-detail1:users:detail:load";
      case "User 2":
        return "users-detail2:users:detail:load";
      default:
        return "users:detail:load";
    }
  };
  events.mutateEvent("users:master:userClicked", targetEventFn);
  return (
    <div>
      <h2>Topics</h2>
      <MicroAppComponent
        app="users-master"
        groupRef="users-master1"
        manifestUrl="http://localhost:3000/assets/manifest.json"
      />
      <MicroAppComponent
        app="users-detail"
        groupRef="users-detail1"
        manifestUrl="http://localhost:3000/assets/manifest.json"
      />
      <MicroAppComponent
        app="users-detail"
        groupRef="users-detail2"
        manifestUrl="http://localhost:3000/assets/manifest.json"
      />
    </div>
  );
}
