# MfMaestro

MfMaestro ([npm link]()) is a [mediator](https://en.wikipedia.org/wiki/Mediator_pattern) to build browser-based applications aggregating micro-applications (or micro-frontends) served by microservices, preventing coupling, with realtime backend state update mechanism.

It's a kind of pattern/DLS/framework to build your application.

You start by creating  your pages (where you aggregate micro-applications) with your routing, how each instanciated micro-application should react to events on the page (emitted by your app or by others micro-applications, or when the routing changes, or any other event you can react to). Start your app... and the magic happens.
.
On the backend side, you can implement a generic mechanism to notify micro-applications of a state's change (see the doc).

## Installation

Go to your project directory and add the npm package:

```
npm install mf-maestro --save
```

## Demo

A demo application (used for integration tests) is availabe in the  ```test``` directory.

It loads 3 micro applications. The important things to look at are availabel in the ```test/tests/test.js``` file.

To start demo :

```
npm run demo
```

Then go to https://localhost:3000/

## Tests

Tests are run in the demo app, with testcafe.

```
npm run test
```

## How to use MfMaestro

define:
- service / micro-service
- micro application/micro app
- main app/mediator

To explain how to use MfMaestro, we will first explain how we architecture microservices so you'll better understand the why of our frontend architecture.

One of the most important things when we design microservices is low-coupling and high cohesion.

To reach this goal, each microservice team should build the backend and the frontend, meaning each microservice will expose to the web all its micro applications.
It will do so with a manifest file, available to an url like https://service1.mydomain.com/mf_maestro.json (you can use any name/url for the file, it doesn't matter, we'll explain why when we show you how to load this file in the app), with this structure:

```
{
  "micro-app-2": {
    "css": "/service2/assets/micro-app-2/app.2342.css",
    "url":"/service2/assets/micro-app-2/app.9876.js"
  }
},
{
  "micro-app-1": {
    "css": "/service1/assets/micro-app-1/app.4536.css",
    "url":"/service1/assets/micro-app-1/app.9876.js"
  }
},
...
```

You can have a look at our 2 manifest files ([1](https://) and [2](https://)) in the demo application.
When you build your service applications, you should add to your process the automatic generation of this file.

### How to build a microapplication to be compatible with MfMaestro

To be loaddable by MfMaestro, an application should expose 1 "start" method. The simplest application can be:
```
  window.MfMaestro.registerMicroApp("micro-app-1", {
    start: (microAppId, params, options) => {
      // we'll detail params and options later, they are just here so you know there are usefull things send to the start function :)
      console.log(`starting ${microAppId}`);
    },
    stop: microAppId => {
      console.log(`stopping ${microAppId}`);
    },
  });
```

This code could go in the ```app.9876.js``` file for example.
(We are still thinking about a better way to register the app than exposing a MfMaestro namespace on the window object, when they are loaded)

So on our web server, for a service, we have n ```.js``` files (one per micro application, see the demo files here : [1](https://), [2](https://), [3](https://)), each one registering in our main application an object with a start and a stop method when it is loaded, and 1 manifest file per service (see demo here: [1](https://), [2](https://)) with metadata to tell to our MfMaestro app where to find the js and css files for our micro frontend.

Our global architecture looks like this:

```
service1:
  mf-maestro-manifest.json (https://service1.mydomain.com/assests/mf-maestro-manifest.json)
  micro-app-1-1.js (https://service1.mydomain.com/assests/js/micro-app-1-1.js)
  micro-app-1-2.css (https://service1.mydomain.com/assests/js/micro-app-1-2.css)
  micro-app-1-2.js (https://service1.mydomain.com/assests/js/micro-app-1-2.js)
  micro-app-1-2.css (https://service1.mydomain.com/assests/js/micro-app-1-2.css)

service2:
  mf-maestro-manifest.json (https://service2.mydomain.com/assests/mf-maestro-manifest.json)
  micro-app-2-1.js (https://service2.mydomain.com/assests/js/micro-app-2-1.js)
  micro-app-2-1.css (https://service2.mydomain.com/assests/js/micro-app-2-1.css)
  micro-app-2-2.js (https://service2.mydomain.com/assests/js/micro-app-2-2.js)
  micro-app-2-2.css (https://service1.mydomain.com/assests/js/micro-app-2-2.css)
...
serviceN:
  mf-maestro-manifest.json (https://serviceN.mydomain.com/assests/mf-maestro-manifest.json)
  micro-app-N-1.js (https://serviceN.mydomain.com/assests/js/micro-app-2-1.js)
  micro-app-N-1.css (https://serviceN.mydomain.com/assests/js/micro-app-2-1.css)
  micro-app-N-2.js (https://serviceN.mydomain.com/assests/js/micro-app-2-2.js)
  micro-app-N-2.css (https://serviceN.mydomain.com/assests/js/micro-app-2-2.css)
  ...
  micro-app-N-M.js (https://serviceN.mydomain.com/assests/js/micro-app-N-M.js)
  micro-app-N-M.css (https://serviceN.mydomain.com/assests/js/micro-app-N-M.js)
```

Urls are examples, you can organize things as you want (manifests ans js files can be separated, it doesn't matter...), but you have the main idea...

### How do we use our micro applications with MfMaestro main app

To load our micro applications, we need a main app, where you define your pages, the routing and events.
We call this app the "Mediator"  since it is inspired by the (mediator pattern)[https://en.wikipedia.org/wiki/Mediator_pattern] ((Design Patterns: Elements of Reusable Object-Oriented Software)[https://en.wikipedia.org/wiki/Design_Patterns])

To clarify the terms pages, routing and events, we show here a simple organization for a main app:

```
MyMediatorApp/
  components/ <= here you'll find your own React components for your pages. You create a component here usually when you need to add logic (events handling, side effects...) to MfMaestro basic components (see demo file)[https://gitlab.com/calions/mf-maestro/blob/master/test/src/components/users/All.js]
    users/ <= here you find all components (if you need to create them) for a part of your app
      edit.js
      list.js
      new.js
      show.js
  index.js <= this file starts the app (see demo file)[https://gitlab.com/calions/mf-maestro/blob/master/test/src/index.js]
  init.js <= this file export a function (run at the main app start) used mainly to define how our events are managed and config options (but you can add anything you want), but you could put this function in index.js (see demo file)[https://gitlab.com/calions/mf-maestro/blob/master/test/src/init.js]
  pages/ <= here you find all pages from the web app
    MainPage.js <= here you can find the routing for example (see demo file)[https://gitlab.com/calions/mf-maestro/blob/master/test/src/pages/MainPage.js]
    Page1.js <= here you have a real page with content (see demo file)[https://gitlab.com/calions/mf-maestro/blob/master/test/src/pages/Home.js]
    ...
```

You have comments in the demo files so you can understand how you build an app.
