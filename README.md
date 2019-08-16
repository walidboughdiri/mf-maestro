# MfMaestro

MfMaestro ([npm link]()) is a [mediator](https://en.wikipedia.org/wiki/Mediator_pattern) to build browser-based applications aggregating micro-applications (or micro-frontends) served by microservices, preventing coupling, with realtime backend state update mechanism.
It's a kind of pattern/DLS/framework that you add to your main application.
You then defines your pages (where you aggregate micro-applications) and your routing, how each instanciated micro-application must react to events on the page (emitted by your app or by others micro-applications, or when the routing changes, or any other event you can react to), and start your app... and the magic is happening.
On the backenside, you can implement a generic mechanism to notify micro-applications of a state's change (see the doc)

## Installation

```

```

## Run test

Tests are run in the demo app, with testcafe.
You need to link the package with the demo app using [npm link](https://docs.npmjs.com/cli/link)

```
npm link
cd test
npm ci
npm link mf-maestro
testcafe chrome:headless tests/test.js
```
