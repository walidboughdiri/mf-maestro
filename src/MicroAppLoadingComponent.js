import React from "react";

export default function MicroAppLoadingComponent(props) {
  const loadStatus =
    props.loadStatus || "an error occured while loading the component";
  return (
    <span>
      {props.groupRef} - {loadStatus}
    </span>
  );
}
