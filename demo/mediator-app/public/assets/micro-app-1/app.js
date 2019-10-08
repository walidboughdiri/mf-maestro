(function() {
  window.MfMaestro.registerMicroApp("micro-app-1", {
    start: (appNode, params, options) => {
      console.log(`%cstarting ${options.groupRef}`, "color:violet", options);
      start(appNode, params, options);
    },
    stop: (appNode, options) => {
      console.log(`%cstopping ${options.groupRef}`, "color:orange");
    },
  });

  function start(
    appNode,
    params,
    { groupRef, events, navigation, queryParams }
  ) {
    appNode.innerHTML = `<div data-id="app" style="background:#ffa7df;padding:20px;width:400px;">
    <p data-id="title">This is a micro-frontend demo in VanillaJS (microApp1@${groupRef})</p>
    <button data-id="emit">click to emit a "ma1:event" event</button>
    <div data-id="console"></div>
  </div>`;
    appNode
      .querySelector("[data-id='emit']")
      .addEventListener("click", e => events.emit("ma1:event"));
  }
})();
