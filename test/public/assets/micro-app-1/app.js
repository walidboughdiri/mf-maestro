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

  function startMicroApp1(microAppId, params, { appNode, events, navigation }) {
    appNode.innerHTML = `<div data-id="app" style="background:#ffa7df;padding:20px;width:400px;">
    <p data-id="title">This is a micro-frontend demo in VanillaJS (microApp1@${microAppId})</p>
    <button data-id="b3">emit onceEvent</button>
    <div data-id="console"></div>
  </div>`;
    appNode
      .querySelector("[data-id='b3']")
      .addEventListener("click", e => events.emit("ma1:onceEvent"));
  }
})();
