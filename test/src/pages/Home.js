import React from "react";
import { useEvents } from "mf-maestro";
import { useTranslation } from "react-i18next";
import { MicroAppComponent } from "mf-maestro";

export default function Home() {
  const [pageRef, events] = useEvents("Home");
  events.mutateEvent("ma1:event", "ma3:event");
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t("home")}</h2>
      <div style={{ background: "#ffffde" }}>
        <ul
          className="emit-mutate"
          style={{ padding: "10px", listStyle: "none" }}
        >
          <li>
            This demo the mutation of events and micro-frontends decoupling :
          </li>
          <li>microApp1@home1 will emit "ma1:event"</li>
          <li>microApp3@mac3 listens to "ma3:event" with "once" and "on"</li>
          <li>
            MfMaestro will mutate "ma1:event" to "ma3:event", so microApp3@mac3
            can react.
          </li>
        </ul>
        <MicroAppComponent
          app="micro-app-1"
          groupRef="home1"
          manifestUrl="http://localhost:3000/assets/manifest.json"
          params={{ a: 2 }}
        />
        <MicroAppComponent
          app="micro-app-3"
          groupRef="mac3"
          manifestUrl="http://localhost:3000/assets/manifest2.json"
        />
      </div>
      <MicroAppComponent
        app="react-app"
        groupRef="ref-react-app"
        manifestUrl="http://localhost:3000/assets/manifest.json"
      />
      <MicroAppComponent
        app="hooked-react-app"
        groupRef="ref-hooked-react-app"
        manifestUrl="http://localhost:3000/assets/manifest.json"
      />
      <MicroAppComponent
        app="vue-app"
        groupRef="ref-vue-app"
        manifestUrl="http://localhost:3000/assets/manifest.json"
      />
    </div>
  );
}
