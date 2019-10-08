(function() {
  window.MfMaestro.registerMicroApp("users-master", {
    start: (appNode, params, options) => {
      console.log(
        `%cstarting users-master in ${options.groupRef}`,
        "color:violet",
        options
      );
      start(appNode, params, options);
    },
    stop: (appNode, options) => {
      console.log(
        `%cstopping users-master in ${options.groupRef}`,
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
    <div data-id="app" style="background:#00ff57;padding:20px;width:400px;">
    <p data-id="title">users-master@${groupRef} : click a color</p>
    <ul data-id="colors">
      <li data-id="user-1">User 1</li>
      <li data-id="user-2">User 2</li>
      <li data-id="user-3">User 3</li>
    </ul>
    <button data-id="end">finish</button>
    <div data-id="console"></div>
  </div>`;
    appNode
      .querySelector("[data-id='end']")
      .addEventListener("click", e => events.emit("users:master:end"));
    appNode
      .querySelector("[data-id='colors']")
      .addEventListener("click", e =>
        events.emit("users:master:userClicked", e.target.innerHTML)
      );
  }
})();
