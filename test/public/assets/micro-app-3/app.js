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
  }

  function startMicroApp1(microAppId, params, { events, navigation }) {
    const node = document
      .getElementById(microAppId)
      .querySelector(`[data-id="app-wrapper"]`);
    node.innerHTML = `<div data-id="app">
    <p data-id="title">microApp3@${microAppId}</p>
    <button data-id="b1">navigate from ${microAppId}</button>
    <button data-id="b2">send loadApp event</button>
    <div data-id="console" once-event="0"></div>
  </div>`;
    startEventsListeners(events, node.querySelector("[data-id='console']"));
  }
})();
