(function() {
  window.MfMaestro.registerMicroApp("micro-app-2", {
    start: (appNode, params, options) => {
      console.log(
        `%cstarting ma2:${options.groupRef}`,
        "color:violet",
        options
      );
      start(appNode, params, options);
    },
    stop: (appNode, options) => {
      console.log(`%cstopping ma2:${options.groupRef}`, "color:orange");
    },
  });

  function configureListeners(on, outputNode) {
    on("microApp2@usersIndex:mutatedTestEvent", (...args) => {
      outputNode.innerHTML = `received microApp2@usersIndex:mutatedTestEvent ${
        args[0]
      } ${args[1]}`;
    });
  }

  function navigate(e, emit, navigation) {
    if (e.target.getAttribute("blocked")) {
      navigation.unblockNavigation();
      return;
    }

    navigation.blockNavigation();
    e.target.innerHTML = "locked nav > click to unlock";
    e.target.setAttribute("blocked", true);
    emit("microApp2:navigationBlocked", 10, 11);
  }

  function start(
    appNode,
    params,
    { groupRef, events, navigation, queryParams }
  ) {
    appNode.innerHTML = `<div data-id="app" style="background:#ffd87c;padding:20px;width:400px;">
    <p data-id="title">This is a micro-frontend demo in VanillaJS (microApp2@${groupRef})</p>
    <button data-id="b1">navigate from ${groupRef}</button>
    <button data-id="b2">send test event</button>
    <div data-id="console"></div>
  </div>`;
    const button = appNode.querySelector("[data-id='b1']");
    button.addEventListener("click", e => navigate(e, events.emit, navigation));
    appNode
      .querySelector("[data-id='b2']")
      .addEventListener("click", e =>
        events.emit("microApp2@usersIndex:sendTestEvent", "args1")
      );
    configureListeners(events.on, appNode.querySelector("[data-id='console']"));
  }
})();
