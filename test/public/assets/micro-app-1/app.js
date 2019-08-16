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

  function configureListeners(on, outputNode) {
    on("testEvent", (...args) => {
      outputNode.innerHTML = "testEvent received with args " + args;
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
    emit("microApp1:navigationBlocked", 1, 2);
  }

  function startMicroApp1(microAppId, params, { events, navigation }) {
    const node = document
      .getElementById(microAppId)
      .querySelector(`[data-id="app-wrapper"]`);
    node.innerHTML = `<div data-id="app">
    <p data-id="title">microApp1@${microAppId}</p>
    <button data-id="b1">navigate from ${microAppId}</button>
    <button data-id="b3">emit onceEvent</button>
    <button data-id="b2">send loadApp event</button>
    <div data-id="console"></div>
  </div>`;
    const button = node.querySelector("[data-id='b1']");
    button.addEventListener("click", e => navigate(e, events.emit, navigation));
    node
      .querySelector("[data-id='b3']")
      .addEventListener("click", e => events.emit("ma1:onceEvent"));
    node
      .querySelector("[data-id='b2']")
      .addEventListener("click", e => events.emit("loadApp2"));
    configureListeners(events.on, node.querySelector("[data-id='console']"));
  }
})();
