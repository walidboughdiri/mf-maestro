import React from "react";

export default function DemoMicroAppLoadingComponent(props) {
  const loadStatus =
    props.loadStatus || "an error occured while loading the component";
  return (
    <span>
      demo loading {props.groupRef} - {loadStatus}
    </span>
  );
}
