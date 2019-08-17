# MfMaestro

MfMaestro ([npm link]()) is a [mediator](https://en.wikipedia.org/wiki/Mediator_pattern) to build browser-based applications aggregating micro-applications (or micro-frontends) served by microservices, preventing coupling, with realtime backend state update mechanism.

It's a kind of pattern/DLS/framework to build your application.

You start by creating  your pages (where you aggregate micro-applications) with your routing, how each instanciated micro-application should react to events on the page (emitted by your app or by others micro-applications, or when the routing changes, or any other event you can react to). Start your app... and the magic happens.
.
On the backend side, you can implement a generic mechanism to notify micro-applications of a state's change (see the doc).

## Installation

```

```

## Demo

A demo application is availabe in the  ```test``` directory.

It loads 3 micro applications. The important things to look at are availabel in the ```test/tests/test.js``` file.

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
