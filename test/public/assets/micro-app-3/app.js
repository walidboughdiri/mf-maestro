(function() {
  window.MfMaestro.registerMicroApp("micro-app-3", {
    start: (microAppId, params, options) => {
      console.log(`%cstarting ${microAppId}`, "color:violet", options);
      startMicroApp1(microAppId, params, options);
    },
    stop: microAppId => {
      console.log(`%cstopping ${microAppId}`, "color:orange");
    },
  });

  function startEventsListeners(events, consoleNode) {
    events.once("ma3:onceEvent", () => {
      const onceEvent = parseInt(consoleNode.getAttribute("once-event"));
      consoleNode.setAttribute("once-event", onceEvent + 1);
      consoleNode.innerHTML = `ma3:onceEvent received`;
    });
    events.on("ma3:onceEvent", () => {
      const eventsCount = parseInt(consoleNode.getAttribute("events-count"));
      consoleNode.setAttribute("events-count", eventsCount + 1);
    });
  }
  function startMicroApp1(microAppId, params, { appNode, events, navigation }) {
    appNode.innerHTML = `<div data-id="app" style="background:#ffd87c;padding:20px;width:400px;">
    <p data-id="title">This is a micro-frontend demo in VanillaJS (microApp3@${microAppId})</p>
    <div data-id="console" once-event="0" events-count="0"></div>
  </div>`;
    startEventsListeners(events, appNode.querySelector("[data-id='console']"));
  }
})();
