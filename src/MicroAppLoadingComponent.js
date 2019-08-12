import React from "react";
import { useTranslation } from "react-i18next";

export default function MicroAppLoadingComponent(props) {
  const { t } = useTranslation();
  return (
    <span>
      {props.groupRef} - {t(props.loadStatus)}
    </span>
  );
}
