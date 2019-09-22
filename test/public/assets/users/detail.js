(function() {
  window.MfMaestro.registerMicroApp("users-detail", {
    start: (appNode, params, options) => {
      console.log(
        `%cstarting users-detail in ${options.groupRef}`,
        "color:violet",
        options
      );
      start(appNode, params, options);
    },
    stop: (appNode, options) => {
      console.log(
        `%cstopping users-detail in ${options.groupRef}`,
        "color:orange"
      );
    },
  });

  function start(
    appNode,
    params,
    { groupRef, events, navigation, queryParams }
  ) {
    appNode.innerHTML = `
    <div data-id="app" style="background:#dedeff;padding:20px;width:400px;">
    <p data-id="title">users-detail@${groupRef} : click a color</p>
    <button data-id="end">finish</button>
    <div data-id="console"></div>
  </div>`;
    appNode
      .querySelector("[data-id='end']")
      .addEventListener("click", e => events.emit("users:detail:end"));
    events.on("users:detail:load", (...args) => loadUser(appNode, ...args));
  }

  function loadUser(appNode, userId) {
    appNode.querySelector(
      "[data-id='console']"
    ).innerHTML = `loading user ${userId}`;
  }
})();
