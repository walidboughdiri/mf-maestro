(function() {
  window.MfMaestro.registerMicroApp("micro-app-2", {
    start: (microAppId, params, options) => {
      console.log(`%cstarting ma2:${microAppId}`, "color:violet", options);
      start(microAppId, params, options);
    },
    stop: microAppId => {
      console.log(`%cstopping ma2:${microAppId}`, "color:orange");
    },
  });

  function configureListeners(on, outputNode) {
    on("testEvent", (...args) => {
      outputNode.innerHTML = "ma2 : testEvent received with args " + args;
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

  function start(microAppId, params, { events, navigation }) {
    const node = document
      .getElementById(microAppId)
      .querySelector(`[data-id="app-wrapper"]`);
    node.innerHTML = `<div>
    <p>microApp2@${microAppId}</p>
    <button data-id="b1">navigate from ${microAppId}</button>
    <div data-id="console"></div>
  </div>`;
    const button = node.querySelector("[data-id='b1']");
    button.addEventListener("click", e => navigate(e, events.emit, navigation));
    configureListeners(events.on, node.querySelector("[data-id='console']"));
  }
})();
