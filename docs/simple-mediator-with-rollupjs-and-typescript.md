# How to setup a base mediator project with rollup and typescript

```
mkdir calions-mediator
npm init
npm i -D rollup
```

here you can test rollup will compile your app.

```
mkdir src
```

create a file ```app.js```and put this code (from rollupjs homepage) :

```
// src/app.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

Then, let's create the foo.js module that our entry point imports :

```
// src/foo.js
export default 'hello world!';
```

create the bundle :

```
rollup src/app.js -o bundle.js -f cjs
```

and you should have a file at the root level with this code :

```
'use strict';

var foo = 'hello world!';

function app () {
  console.log(foo);
}

module.exports = app;
```

Ok, here we did nothing special. Delete files we created :

```
rm bundle.js src/foo.js
```

Now if you try to create the bundle you have an error :

```
rollup src/app.js -o bundle.js -f cjs

src/app.js → bundle.js...
[!] Error: Could not resolve './foo.js' from src/app.js
Error: Could not resolve './foo.js' from src/app.js
    at error (/mediator/node_modules/rollup/dist/rollup.js:10162:30)
    at ModuleLoader.handleMissingImports (/mediator/node_modules/rollup/dist/rollup.js:17237:17)
    at ModuleLoader.<anonymous> (/mediator/node_modules/rollup/dist/rollup.js:17288:26)
    at Generator.next (<anonymous>)
    at fulfilled (/mediator/node_modules/rollup/dist/rollup.js:40:28)
    at <anonymous>
```

Normal since the file ```foo.js```has been deleted.


Add mf-maestro to your bundle :

```
npm install mf-maestro --save
```

and change the ```app.js```code :

```
// app.js
import { startMediator } from "mf-maestro";
import MainPage from "./pages/MainPage";

startMediator("root", MainPage, () => ({}));
```

We start by importing ```startMediator``` function from ```mf-maestro```.
We import the first page of our application.
It's the function that starts the mediator.
It accepts 3 params :

- the id of the html node where we start the mediator in the page
- the first page to show
- for now mf-maestro needs a function (will be fixed soon). We just return an empty object.

Add the MainPage to the project (We recommend to add all pages in a folder "pages" at the project's root) :

```
import React from "react";

export default function MainPage() {
  return (<div>Welcome to our application main page</div>);
}
```

To use jsx, we need to add Babel transpiler ([@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react). We want also to be able to use latest ecmascript features ([@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)). And since they need [@babel/core](https://babeljs.io/docs/en/next/babel-core.html), we add it :

```
npm i -D @babel/core @babel/preset-env @babel/preset-react
```

Rollup does not talk to Babel out of the box. We need to add plugins to connect them :
- [rollup-plugin-node-resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve) to be able to ```import``` modules from node_modules directory
- [rollup-plugin-babel](https://www.npmjs.com/package/rollup-plugin-babel) to use babel features
- [rollup-plugin-commonjs](https://www.npmjs.com/package/rollup-plugin-commonjs) to convert CommonJS to ES6 (required by Rollup)
- we'll also use [rollup-plugin-replace](https://www.npmjs.com/package/rollup-plugin-replace), since React optimize its code when ```process.env.NODE_ENV``` is set to "production".

```
npm i -D rollup-plugin-node-resolve rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-replace
```

To configure all of this, we create a ```rollup.config.js```at project's root :

```
// rollup.config.js
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const NODE_ENV = process.env.NODE_ENV || "development";
const outputFile = NODE_ENV === "development" ? "./dist/dev.js" : "./dist/prod.js";

export default {
  input: 'src/app.js',
  output: {
    file: outputFile,
    format: 'umd',
    name: "myMediator,
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
    babel({
      exclude: "node_modules/**",
    }),
    nodeResolve(),
    commonjs({
      include: [
        'node_modules/**',
      ],
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react-is/index.js': ['isValidElementType'],
        'node_modules/mf-maestro/dist/index.js': ['MicroAppComponent', 'startMediator'],
      }
    }),
  ],
}
```

Nothing special except for ```commonjs()``` function and output format.
The format can be amd, cjs, esm, iife, umd. Here we use umd, since we need something usable in browser and esm (ES6 modules) is not yet compatible with all browsers. Cjs is not good for browsers. When using umd, we need to define a name for the module.  
```commonjs()``` function takes an object argument, and pay attention to ```namedExports```property : for each imported module, it specify the exports. You might need to add manually other ones. If you try to build the bundle and have this kind of error :

```
[!] Error: 'Component' is not exported by node_modules/react/index.js
```

then you know you have to add a line to this property :

```
// rollup.config.js
...
'node_modules/react/index.js': [..., 'Component'],
...
```

To configure Babel, you can use ```.babelrc```file or ```package.json```. Here we use the first solution (nothing special about it) :

```
// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Note that the ```rollup-plugin-babel``` has some extra options compared to babel options. Here we use ```exclude: "node_modules/**"```, but you might be interested by others. Read the plugin's doc on github. It's usefull!

Add npm scripts to build bundles :

```
// package.json
...
"scripts": {
  "build": "rollup -c",
  "build:production": "NODE_ENV=production rollup -c"
},
...
```

Create the bundle :

```
npm run build
```

Ok now we know how to build our app, we need an html page and a server to test it.

For that, we'll use [rollup-plugin-serve](https://www.npmjs.com/package/rollup-plugin-serve) :

```
npm i -D rollup-plugin-serve
```

Create a directory to put your index html page ```public/index.html``` :

```
<!DOCTYPE html>
<html>
<head>
  <title>Rollup mf-maestro demo</title>
</head>
<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="/dev.js"></script>
</body>
</html>
```

and configure ```rollup-plugin-serve``` in ```rollup.config.js``` file :

```
// rollup.config.js
...
import serve from 'rollup-plugin-serve'
...
export default {
  ...
  plugins: [
    ...
    serve({
      contentBase: ['dist', 'public'],
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
    }),
  ]
}
```

```historyApiFallback``` is usefull when you reload a page else the serve will serve 404 not found (read the doc on github).  
We will server on port ```3000``` of ```localhost```, from directories ```dist```(where we compile the js bundle, not in git) and ```public```(where is our html page, in git).

Start the app ```npm run build```and go ```http://localhost:3000/```, you should see "Welcome to our application main page" in the page.

Rollup has a watch mode. To activate it, just add a script to ```package.json``` :

```
// package.json
{
  ...
  "scripts": {
    "start": "rollup -c -w",
    ...
  }
  ...
}
```

You can now start it ```npm start```. Go to your browser, then try to edit something, the page will refresh!

Now the server always starts. We'll change our config and scripts to not start the server when we just want to build the app :

First ```rollup.config.js``` :

```
// rollup.config.js
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve'

const NODE_ENV = process.env.NODE_ENV || "development";
const outputFile = NODE_ENV === "production" ? "./dist/prod.js" : "./dist/dev.js";

const plugins = [
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
    babel({
      exclude: "node_modules/**",
    }),
    nodeResolve(),
    commonjs({
      include: [
        'node_modules/**',
      ],
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react-is/index.js': ['isValidElementType'],
        'node_modules/mf-maestro/dist/index.js': ['startMediator'],
      }
    }),
];

if (process.env.START_SERVER === "true") {
  plugins.push(
    serve({
      contentBase: ['dist', 'public'],
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
    })
  )
}

export default {
  input: 'src/app.js',
  output: {
    file: outputFile,
    format: 'umd'
  },
  plugins,
}
```

We check for the env var **START_SERVER**. If it is true, then we start the server, adding it to the plugins list.

Next we change the npm start script in ```package.json``` :

```
// package.json
...
"scripts": {
    "build": "rollup -c",
    "start": "START_SERVER=true rollup -c",
    "build:production": "NODE_ENV=production rollup -c"
  },
...
```

Cool. We can activate rollup watch mode with the ```-w``` arg :

```
// package.json
...
"scripts": {
    "build": "rollup -c",
    "start": "START_SERVER=true rollup -c -w",
    "build:production": "NODE_ENV=production rollup -c"
  },
...
```

Now when you run ```npm start```, you can change your code and rollup automatically recompile the files.

### add typescript

To add typescript to the project, we need to install the langage package [typescript](https://www.npmjs.com/package/typescript) and the rollup plugin to use it with rollup [rollup-plugin-typescript2](https://www.npmjs.com/package/rollup-plugin-typescript2).

```
npm i -D typescript rollup-plugin-typescript2
```

Add configuration to your ```rollup.config.js``` file :

```
// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
...
const plugins = [
  ...
  typescript(),
  commonjs({
  ...
```

The plugin has several options. You should watch the doc to look if any would be usefull for you (```clean```, ```typescript```,...).

Rename ```src/app.js``` and ```src/pages/MainPage.js``` to ```src/app.ts``` and ```src/pages/MainPage.tsx``` (```tsx```is used for jsx typescript transpilation).

In ```rollup.config.js```, change the input file :

```
...
export default {
  input: 'src/app.ts',
...
```

We need to add a ```tsconfig.json``` file at project's root to [configure](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) the typescript compiler :

```
// tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "jsx": "react",
    "module": "es6",
    "noImplicitAny": true,
    "outDir": "./dist",
    "target": "es5",
    "typeRoots" : [
      "node_modules/@types",
      "./ts_types"
    ]
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "src/**/*"
  ]
}
```

For options, you can refer to the [typescript tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) docs.  
The [```jsx```](https://www.typescriptlang.org/docs/handbook/jsx.html) with ```react``` value allows to transpile jsx code to javascript code.  

**[-----If you don't use the ```noImplicitAny``` option, the next part is useless, go directly after ---]**

Since we use ```"noImplicitAny": true``` options, typescript will throw errors for not typed methods. The ```typeRoots``` is then important since it specifies where typescript can find [type definitions](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types) to include. Here we add all definitions from modules in ```node_modules/@types``` (the ones we are not owner but we need to use) and we add a directory to our project's root where we put our types definitions :

```
mkdir ts_types
mkdir ts_types/mf-maestro
```

And in the ```ts_types/mf-maestro``` add an ```index.d.ts``` file where we write mf-maestro type definitions (a future release will allow you to use the ones in node_modules/@types) :

```
// ts_types/mf-maestro/index.d.ts
declare module 'mf-maestro' {
    export function MicroAppComponent(props: any): any;
    export function startMediator(targetDomElementId: string, MainPage: any, init?: any): void;
    export function useEvents(ref: string): [string,any];
}
```

And for now, we need to add React types to the project, else we have an error from typescript when we try to compile the project :

```
npm install -D @types/react
```

The ```typeRoots``` attributes is required since we specify ```include``` in ```tsconfig.json``` file. If we don't specify it, the whole directory is scanned. So no need to add it in that case.  
Another option would be to put ```ts_types``` directory into ```src```. Since this directory is included, then our types files would be too. There are others usefull options for ```tsconfig.json``` files. Take the time to read the doc. It might be usefull in your case. Here we put only the minimal configuration to run the project.

**[----- end of ```noImplicitAny``` details section -----]**


Now you should be able to ```npm start``` and use typescript!