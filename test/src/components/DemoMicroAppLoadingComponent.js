import React from "react";
import { useTranslation } from "react-i18next";

export default function DemoMicroAppLoadingComponent(props) {
  const { t } = useTranslation();
  return (
    <span>
      demo loading {props.groupRef} - {t(props.loadStatus)}
    </span>
  );
}
