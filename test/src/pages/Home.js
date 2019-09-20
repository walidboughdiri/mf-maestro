import React from "react";
import { useTranslation } from "react-i18next";
import { MicroAppComponent } from "mf-maestro";

export default function Home() {
  const { t } = useTranslation();
  const options = { var1: 1 };
  return (
    <div>
      <h2>{t("home")}</h2>
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
