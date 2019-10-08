import React, { useState } from "react";

export default function Home(props) {
  const [count, setCount] = useState(0);

  props.options.events.on("button:clicked", (count, eventName) =>
    console.log(`${eventName} received with args ${count}`)
  );

  const handleClick = () => {
    setCount(count + 1);
    props.options.events.emit("button:clicked", count);
  };

  return (
    <div style={{ background: "#846c93", padding: "20px", width: "400px" }}>
      <p>
        This is a micro-frontend using React {React.version} and hooks to manage
        state
      </p>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
