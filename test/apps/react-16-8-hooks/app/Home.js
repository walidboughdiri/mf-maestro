import React, { useState } from "react";

export default function Greeting() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ background: "#846c93", padding: "20px", width: "400px" }}>
      <p>
        This is a micro-frontend using React {React.version} and hooks to manage
        state
      </p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
