*At the beginning, MfMaestro was more a way to share some experiments with the community about micro-[services, frontend] technologies. If you use it, don't think it is the only way to build this kind of app, even if we are trying to make it a really great tool to do this job. Always think someone is already building something better somewhere else. Keep searching, share knowledge, mix and challenge ideas... This is the best way to improve this work.*

**This implementation uses React > 16.8 with functional components and hooks, but we are working on differents versions (Elm next, because we like coding with types and the goddamned compiler!), because we think what is important is the architecture and the patterns, not the language used.**

# MfMaestro

MfMaestro ([npm link](https://www.npmjs.com/package/mf-maestro)) is a frontend [mediator](https://en.wikipedia.org/wiki/Mediator_pattern) to build browser-based applications.    
It works by aggregating at runtime [compatible micro-frontends](#build-hello), served from http servers by independent microservices.  
One of the most important aspect in MfMaestro is to try to keep things SIMPLE, NOT COUPLED, with high cohesion, so each team can release at its own rythm. This was specially important when we designed the event system to synchronize micro-frontends.

You can think of the main motivation as this :

*"As an application creator, I want to build an app with multiple pages, each one with its url. I'm owner (I design) of these pages, my main css, and the routing/navigations rules. On these pages, I will simply put micro-frontends which I'm not owner of. These micro-frontends are exposed on http urls by teams that don't know anything about others applications on the page where they will be added, so they can't react directly to "events" of these others applications to load or change their data. Thus, I use MfMaestro as a mediator to "synchronize" them"*

It's a kind of pattern/DSL/framework (you can stay "high", almost only declarative/config, or go deep with more programming skills) to build your application with few steps :

1. Create **one or many micro-frontend apps** compatible with MfMaestro dynamic load mechanism ([demo](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-1/app.js)) and a manifest file ([demo](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/manifest.json)), and put them on a webserver
2. Create **your main application** (the one loading your micro-frontends) with mf-maestro npm package (a simple npm init and npm install)
3. Add pages folder with your first page ([see demo](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/Home.js))
4. Add microfrontends to pages with our react component ```MicroAppComponent```. It's as simple as : ```<MicroAppComponent app="microapp-name-in-manifest" manifestUrl="https://...manifest-url..." />```
5. Start your app. Your page should load and micro-frontends will load from their urls and start.
6. Now you can go deeper : improve your app with events, routing, navigation, create more complex MicroAppComponent component to handle specific logic... everything that allows you to build a real and more complex app than a simple "hello micro-frontend".

## Repository organization

 - in ```src``` you find the Mediator source code.
 - in ```test```, you find a demo application with its tests :
 	- in ```test/apps```, you find micro-frontends coded with different frameworks to use in the demo. The build destination directories are always ```test/public/assets/apps-[framework name]```. They are all independent and have their own npm/webpack config.
 	- in ```test/tests```, you have the tests suite.
 	- in ```test/public```, you have all files exposed by react dev server to use the demo.
 		- the ```index.html``` is the page loaded when the webpack dev server start
 		- in ```test/public/assets```, you find the different micro-frontends (js and css) we load in the demo while navigating and emitting events. This is also the target directory for ```test/apps``` builds.

## Installation

To add MfMaestro to your project, go to your project directory and add the npm package:

```
npm install mf-maestro --save
```

## Demo

A demo application (also used for integration tests) is availabe in [the```test```directory](https://github.com/calions-app/mf-maestro/tree/master/test)

It loads multiple micro applications, coded with different frameworks and versions (VannillaJS, Elm, Angular, Vue, React, EmberJs). The important mechanisms to look at are tested in the [```test/tests/test.js```](https://github.com/calions-app/mf-maestro/blob/master/test/tests/test.js) file.

To start the demo :

1. Go to mf-maestro root and run ```npm link```
2. Go to ```mf-maestro/test``` directory and run ```npm link mf-maestro```
3. Go to mf-maestro root and run : ```npm run demo```
4. Go to https://localhost:3000/

## Tests

Tests are run using the demo app, with [TestCafe](https://devexpress.github.io/testcafe/). Setup npm links like you would do to run the demo if it is not yet already done.  
Then go to ```mf-maestro/``` root directory and run : ```npm run test```
By default, tests are run with chrome headless, but you can use all [TestCafe](https://devexpress.github.io/testcafe/) functionnalities.

## How to use MfMaestro

As explained in the intro, when we designed MfMaestro, we wanted to build applications by aggregating micro-frontends on pages. This allows to build new online applications efficiently. A team exposes its micro-frontends with a manifest file, available at a url like https://service1.mydomain.com/mf_maestro.json, with this structure :

```
{
  "micro-app-2": {
    "css": "/service2/assets/micro-app-2/app.2342.css", <= micro-frontend css
    "url":"/service2/assets/micro-app-2/app.9876.js" <= micro-frontend code
  },
  "micro-app-1": {
    "css": "/service1/assets/micro-app-1/app.4536.css",
    "url":"/service1/assets/micro-app-1/app.9876.js"
  }
  ...
}
```
You can think of manifests as kind of API to get micro-frontends code (js) and design (css).

It's a json stucture, where the keys are the names of the apps we will use as props in the MicroAppComponent on pages :  
```<MicroAppComponent app="micro-app-2" manifestUrl="https://service1.mydomain.com/mf_maestro.json" />```

You can have a look at our 2 manifest files ([1](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/manifest.json) and [2](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/manifest2.json)) in the demo application. And look how we build a [page](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/Home.js) : it's almost only declarative at the beginning. Simple and fast to start!

When MfMaestro find the ```MicroAppComponent``` component in a page, it will load the manifest declared in prop ```manifestUrl```, then use the ```app``` prop to load the associated javascript and css.

The manifest and javascript is cached in the Redux store of MfMaestro. The css is added to the dom. When the micro-frontend is unmounted, the cached data will be used when MfMaestro wants to mount another instance of the same micro-frontend : that means no manifest or javascript files loaded twice. Same if you navigate to another page. The state is global to your application.

If you put many times the same micro-frontend on a page (we tried with more than 1000), MfMaestro gracefully handle load and start of all instances, loading only one time the manifest and the js code, and automatically starting all instances when everything is ready. Don't worry about this!

When you build your service applications, you should add to your process the automatic generation of manifest files.

### How to build a micro-frontend application to be compatible with MfMaestro

	<a name="build-hello">*</a> The simplest application can be :

```
  window.MfMaestro.registerMicroApp("micro-app-1", {
    start: (targetAppNode, params, options) => {
      // we'll detail params and options later,
      //they are just here so you know there are usefull things send to the start function :)
      console.log(`starting ${options.groupRef}`);
    },
    stop: (targetAppNode, options) => {
      console.log(`stopping ${options.groupeRef}`);
    },
  });
```

This code could go in the ```app.9876.js``` file for example.

To be usable by MfMaestro, your micro-frontend code always start by calling the ```window.MfMaestro.registerMicroApp``` function with the name of your app (the same name used in the manifest key) and a { start, stop } object as arguments.  
The ```start```method is called when MfMaestro mounts the MicroAppComponent component, and ```stop``` when it unmounts.  
Usually you put in ```start``` function the code to start your [Elm]()/[React]()/[Vue]()/[Angular]()/[EmberJS]()/[VanillaJS]()... application, add events listening and reactions, navigation rules to use modals for example, etc etc... But you can do it deeper in your micro-frontend's code. For example, put here common app's behaviours, and add on each page its events to prevent headache in events and navigation handling in one place for the whole app!!!!.
In ```stop``` function, you will usually pay attention to be sure you don't have memory leak when you unmount you micro-frontend, like when you attached an event listener and forget to remove it (But for this specific case, MfMaestro automatically gives you, in the ```options``` argument of the start function, a method to automatically manage events, so you don't have to, see bellow). You have multiple articles on internet about how to create and detect memory leaks in javascript in the browser :

* [https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)
* [https://developers.google.com/web/tools/chrome-devtools/memory-problems/](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)
* ...

So, on our web server, for a microservice, we have N ```.js``` files (one per micro-frontend application, see the demo files here : [1](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-1/app.js), [2](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-2/app.js), [3](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-3/app.js), [4](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/apps-react-15/app.js), [5](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/apps-react-16-8-hooks/app.js), [6](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/apps-vue/app.js)), each one registering in our main application an object with a start and a stop method when it is loaded, and 1 manifest file per service (see demo here: [1](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/manifest.json), [2](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/manifest2.json)) with metadata to tell to our MfMaestro app where to find the js and css files for our micro-frontends.

Our global architecture, in terms of files per service, looks like this:

```
service1:
  mf-maestro-manifest.json (https://service1.mydomain.com/assests/mf-maestro-manifest.json)
  micro-app-1-1.js (https://service1.mydomain.com/assests/js/micro-app-1-1.js)
  micro-app-1-1.css (https://service1.mydomain.com/assests/js/micro-app-1-2.css)
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

### How do we use our micro applications with MfMaestro main app

To load and use micro-frontends, we need to design a main app, where you define your pages, the routing and events.
We call this app the "**Mediator**"  since it is inspired by the [mediator pattern](https://en.wikipedia.org/wiki/Mediator_pattern) ([Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns))

To clarify the terms "pages", "routing" and "events", this is a simple organization for a mediator application :

```
MyMediatorApp/  
  components/ (1)
    users/ (2)
      edit.js
      list.js
      new.js
      show.js
  index.js (3)
  init.js (4)
  pages/ (5)
    MainPage.js (6)
    Page1.js <= here you have a real page with content [see demo file](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/Home.js)
   ...
```

(1) **```components```** directory : put here your own React components for your pages. You decide to create a new component usually when you need to handle specific logic (events handling, side effects...) not available in MfMaestro basic components. You can view an [example](https://github.com/calions-app/mf-maestro/blob/master/test/src/components/users/All.js).

(2) **```components/users```** directory : this directory contains a component with more logic : [see an example](https://github.com/calions-app/mf-maestro/blob/master/test/src/components/users/All.js)

(3) **```index.js```** : this file starts the app ([see an example](https://github.com/calions-app/mf-maestro/blob/master/test/src/index.js)) calling [the ```startMediator```function](https://github.com/calions-app/mf-maestro/blob/master/src/startMediator.js) with 3 args :

- **targetDomElementId** : the id of the dom element where we want to start our app
- **MainPage** : the root component of your app, injected into the [React router](https://github.com/calions-app/mf-maestro/blob/master/src/MediatorApp.js)
- **init** : a function call at the mediator start to configure the application, see bellow init.js (4)

(4) **```init.js```** : this file exports a function (run when [the main app starts](https://github.com/calions-app/mf-maestro/blob/master/src/MediatorApp.js#L10)) used mainly to define how [our events are managed](https://) and config options ([see demo file](https://github.com/calions-app/mf-maestro/blob/master/test/src/init.js)).
The object returned by this function is also used as a [config for our MediatorApp](https://github.com/calions-app/mf-maestro/blob/master/src/services/configureApp.js). For now you can only pass these keys :

- **MicroAppLoadingComponent** : a component to replace the default loading component (what is visible on the page in the micro-frontend destination div while the mediator loads a manifest or a js code file : [default](https://github.com/calions-app/mf-maestro/blob/master/src/MicroAppLoadingComponent.js) and [custom for demo app](https://github.com/calions-app/mf-maestro/blob/master/test/src/components/DemoMicroAppLoadingComponent.js).

(5) **```pages```** directory : all app's pages where we put components/micro-frontends.

(6) **```MainPage.js```** : the main page of our app ([see example](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/MainPage.js)) injected in the ```startMediator```function in ```index.js``` file (3). Usually this page would be your main router.  

### Options and params sent [to start() function](https://github.com/calions-app/mf-maestro/blob/master/src/MicroAppTypes/NativeMicroApp.js) of your micro-frontend

1. appNode

  the dom node where your app put its content. Use it like a normal dom node, nothing special. You can view how to use it [here](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-1/app.js#L13)

2. params

 This is a simple object with params for your app. ```params``` is a merge between prop of your react component and url path params defined in the react router. Url params are passed to all micro-frontends, and prop params are unique for each one. You can view a demo [here for params prop](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/Home.js#L15) and for path params [router](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/MainPage.js#L29) / [micro-frontend](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-2/app.js#L45)

3. options

 ```options``` is an object with these attributes :
 
 * ```groupRef```

 This is the id of the html node where you can find the "app-wrapper" node of your app (the node where your app is injected). You should not need it most of the time. It is not the node where your app starts, but [its parent](https://github.com/calions-app/mf-maestro/blob/master/src/MicroAppTypes/NativeMicroApp.js)

 * <a name="options-events">```events```</a>

  an object with [already binded functions](https://github.com/calions-app/mf-maestro/blob/master/src/effects/useEvents.js#L24) to use events. IMPORTANT : always use these functions to add/remove events, because it will automatically manage events listeners, removing listeners when your app is removed from the dom. Not using these functions can lead to memory leak (your components will be removed from the dom, but will stay in memory because of a reference to a listener). You can view a demo [here](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-2/app.js) with ```emit``` and ```on```

 * <a name="options-navigation">```navigation```</a>

  an object to [block/unblock](https://github.com/calions-app/mf-maestro/blob/master/src/navigation.js) navigation between page transition. Usefull for example if you want to show a modal to your user before he leaves the current page. [demo](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-2/app.js#L20)

 * ```queryParams```

  an object with query params you send to your component from url. The format is [json5](https://json5.org/). This is usefull if you want to intialize components on your page, for example to load a specific resource, or go to a specific page in your component. Since the architecture of MfMaestro is based on pages where you aggregate your components, you can have **one OR many** components on your page. So if you want to initialize each of them, you can't do it with the url. That's why we choosed to use query params for this requirement.

### Options and params sent [to stop() function](https://github.com/calions-app/mf-maestro/blob/master/src/MicroAppTypes/NativeMicroApp.js) of your micro-frontend

```stop```receive the ```appNode```and an options object with ```groupRef``` and ```events```.  
They are (and work the same) the same arguments sent to ```start()``` function.

### How to use query params

  We build pages, with many components on each one. To send paramters to each one, we need a url like

  ```https://mydomain.com/users?microApp1Ref={var1:12,var2:"var2value",...}&microApp2Ref={var1:"hello", var3:"world",...}```

  and be able to send these values in your [micro-frontends ```start``` functions](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-1/app.js).

  To let the mediator connect your url's json5 to a micro-frontend on the page, you need to add a ```groupRef``` prop to your react MicroAppComponent component ([demo](https://github.com/calions-app/mf-maestro/blob/master/test/src/pages/Home.js)), and use this groupRef as the key of your json5 value in your query string (```home1``` here): ```...myUrl?home1={my json5 object}```
  
### The events system in MfMaestro

How do you synchronize micro-frontends on a page, so they can react to what is happening into the application, while you want to be able to put the same micro-frontend on different pages with different micro-frontends each time ? Use the mediator, Luke!

Your micro-frontends react to events. It's their "api".
When you document a micro-frontend, you give the manifest file, but also the list of events it emits or can react to.
But! Since you don't know on which page and with which other micro-frontends it will be aggregated, how can you react to events emitted by others micro-frontends ? Well, in MfMaestro we have [our events list of functions](https://github.com/calions-app/mf-maestro/blob/master/src/effects/useEvents.js) passed to the ```start``` function of your micro-frontend in the [```options.events```](#options-events) parameter :

- **emit(event, ...args)**

emit an event in the system. It accepts these arguments :

	- event : a string, the name of your event.
	- ...args : has many args as you want.
	            They will be passed to the listeners "as is".
	            It's like a payload for your events.

You can view some examples [in the micro app 2 demo code](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-2/app.js).

- **on(event, callback, context)**

add a permanent listener for an event. It takes these arguments :

	- event : a string, the name of the event you want to react to.
	- callback : a function called when the event is received,
	             with all args (those passed to the emit function) as parameters.
	             !! If you want to stop this listener, you'll need to call ```removeListener```
	             with this callback reference (see bellow).
	             Thus, you should store it in a variable and pass it as parameters.
	- context (optional) : the context (the "this") if your callback is not binded.

- **once(event, callback, context)**

same as **on(event, callback, context)**, but reacts only one time to events.

- **redirectOnEvent(event, path, options)**

react to an event by changing the url (page). It takes these arguments :

	- event : a string, the name of the event you want to react to.
	- path : the new url you want to redirect to.
	- options (optional) : an object with these attributes
		- emitBefore : a string, an event emitted before the url's change is done
		- emitAfter : a string, an event emitted after the url's change is done

- **mutateEvent(sourceEvent, targetEvent, transformArgsFn)**

add an event listener to emit ```targetEvent``` when ```sourceEvent``` is emitted. It takes these arguments :

	- sourceEvent : a string, the name of the event you want to react to
	- targetEvent : a string, the name of the event to emit
	- transformArgsFn (optional) : a function that will received all "...args"
	                               passed to emit() to transform them if necessary

- **removeListener(event, callback, context)**

remove a listener. It takes these arguments :

	- event : a string, the name of the event from which you want to remove the listener
	- callback : the listener you added earlier (callback reference)
	- context : a context if needed

We use [eventemitter3](https://github.com/primus/eventemitter3) to manage events. If you want to know more about function params, see the doc [on github](https://github.com/primus/eventemitter3) and the api of [node event emitter](https://nodejs.org/api/events.html).

### The navigation system in MfMaestro

In the options passed to the ```start```function, you have [```options.navigation```](#options-navigation). You find in this object [2 functions](https://github.com/calions-app/mf-maestro/blob/master/src/navigation.js) you can call when you need to block or authorize navigation. This can be usefull for example, if you need to show a modal to the user for validation before leaving a page.

To block a navigation, just call ```options.navigation.blockNavigation()```. For example, you can on a button, set a callback on the ```click``` that will call ```options.navigation.blockNavigation()``` and emit an event to change to change the navigation. MfMaestro (using [history](https://github.com/ReactTraining/history) will store the target url and prevent navigation. You can then show a modal, or ask for a validation or  anything you need to do. You will call another callback when the user react to your UI. In this callback, you will process what you need to do before leaving the page, and call ```options.navigation.unblockNavigation()```. The page will then change.
You can view a [demo here](https://github.com/calions-app/mf-maestro/blob/master/test/public/assets/micro-app-2/app.js#L20)

When you call ```options.navigation.unblockNavigation()```, a message is emited : ```emit("navigation:location:changed", { location: state.targetLocation });```. You can listen to this message if you need to react to it.

## TODO

- add a mechanism to extract the framework from micro-frontend's build and be able to cache an already loaded framework (by version) and give it to a micro-frontend if it needs to. This would reduce micro-frontends sizes, since for now, each one needs to load its own version. This is the main drawback of MfMaestro for now.
- move tests to [cypress.io](https://www.cypress.io/).
- fix this doc
- add list of UI/UX patterns we have been developping
- explain backend realtime architecture
- add realtime frontend architecture
- improve demo to better match real use cases
- add groupRefId on events to "scope" events
- add recommandation for backend architecture to use MfMaestro the most efficient way
- add recommandation "how to write micro-frontends"
- explain dynamic replacement of microfrontend using props
- fix bug : clean events from memory when we replace microfrontends using props (memory leak...)
- add a demo with web components
- explain css architecture and how to use it
- in events redirect or navigate explain how dynamic params works (:id)