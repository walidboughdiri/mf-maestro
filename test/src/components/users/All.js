import React, { useState, useEffect } from "react";
import { MicroAppComponent, useEvents } from "mf-maestro";

export default function UsersIndex(props) {
  const [microAppId, events] = useEvents();
  const [[manifestUrl, app], setApp] = useState([null, null]);
  useEffect(() => {
    events.on("users:microApp2", () => {
      console.log('Event received in UsersIndex : "users:microApp2"');
    });
    events.on("users:change", (url, app) => {
      setApp([
        url || "http://localhost:3000/assets/manifest.json",
        app || "micro-app-1",
      ]);
    });
  });

  let content = null;

  if (manifestUrl === null || app === null) {
    content = <div>no app loaded</div>;
  } else {
    content = (
      <MicroAppComponent
        app={app}
        groupRef="usersIndex"
        manifestUrl={manifestUrl}
      />
    );
  }

  return (
    <div className="users-index">
      <div>users index for {app}</div>
      {content}
    </div>
  );
}
