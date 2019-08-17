(function() {
  window.MfMaestro.registerMicroApp("micro-app-1", {
    start: (microAppId, params, options) => {
      console.log(`%cstarting ${microAppId}`, "color:violet", options);
      startMicroApp1(microAppId, params, options);
    },
    stop: microAppId => {
      console.log(`%cstopping ${microAppId}`, "color:orange");
    },
  });

  function startMicroApp1(microAppId, params, { events, navigation }) {
    const node = document
      .getElementById(microAppId)
      .querySelector(`[data-id="app-wrapper"]`);
    node.innerHTML = `<div data-id="app">
    <p data-id="title">microApp1@${microAppId}</p>
    <button data-id="b3">emit onceEvent</button>
    <div data-id="console"></div>
  </div>`;
    node
      .querySelector("[data-id='b3']")
      .addEventListener("click", e => events.emit("ma1:onceEvent"));
  }
})();
