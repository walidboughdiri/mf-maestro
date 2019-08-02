if (window.MfMaestro === undefined) {
  window.MfMaestro = {
    setupMicroAppCallbacks: appName => {
      if (typeof window.MfMaestro.loadCallbacks[appName] != "object") {
        window.MfMaestro.loadCallbacks[appName] = {};
      }
    },
    instanciate: function(appName) {
      console.log(`-1 in instanciate for ${appName}`);
      if (typeof window.MfMaestro.loadCallbacks[appName] !== "object") {
        console.log(
          `-1 Unable to instanciate micro app components for micro app "${appName}" because loadCallbacks[${appName}] is no an object`
        );
        return;
      }
      console.log(
        "-1 in window.MfMaestro.instanciate > loadCallbacks registered",
        window.MfMaestro.loadCallbacks
      );
      Object.values(window.MfMaestro.loadCallbacks[appName]).forEach(
        instanciateMicroApp => instanciateMicroApp()
      );
    },
    loadCallbacks: {},
    addLoadCallback: function(appName, wrapperId, callback) {
      console.log(`-1 addLoadCallback for ${appName}/${wrapperId}`);
      if (
        typeof window.MfMaestro.loadCallbacks[appName][wrapperId] === "function"
      ) {
        console.log(
          `-1 window.MfMaestro.loadCallbacks[appName][wrapperId] is a function > out!`
        );
        return;
      }
      window.MfMaestro.loadCallbacks[appName][wrapperId] = callback;
    }
  };
} else {
  if (typeof window.MfMaestro !== "object") {
    console.log(
      "window.MfMaestro is defined but it is not an object. MfMaestro can't start."
    );
  }
}
