(function() {
  window.MfMaestro.registerMicroApp("micro-app-3", {
    start: (appNode, params, options) => {
      console.log(`%cstarting ${options.groupRef}`, "color:violet", options);
      startMicroApp1(appNode, params, options);
    },
    stop: (appNode, options) => {
      console.log(`%cstopping ${options.groupRef}`, "color:orange");
    },
  });

  function startEventsListeners(events, consoleNode, consoleOnceNode) {
    events.once("ma3:event", () => {
      const onceEvent = parseInt(consoleOnceNode.getAttribute("count")) + 1;
      consoleOnceNode.setAttribute("count", onceEvent);
      consoleOnceNode.innerHTML = `events.once("ma3:event") : ${onceEvent} event received at ${Date.now()}`;
    });
    events.on("ma3:event", () => {
      const eventsCount = parseInt(consoleNode.getAttribute("count")) + 1;
      consoleNode.setAttribute("count", eventsCount);
      consoleNode.innerHTML = `events.on("ma3:event") : ${eventsCount} events received`;
    });
  }
  function startMicroApp1(appNode, params, { groupRef, events, navigation }) {
    appNode.innerHTML = `<div data-id="app" style="background:#ffd87c;padding:20px;width:400px;">
    <p data-id="title">This is a micro-frontend demo in VanillaJS (microApp3@${groupRef})</p>
    <div data-id="console" count="0"></div>
    <div data-id="console-once" count="0"></div>
  </div>`;
    startEventsListeners(
      events,
      appNode.querySelector("[data-id='console']"),
      appNode.querySelector("[data-id='console-once']")
    );
  }
})();
