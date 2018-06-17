# feathers-envhelpers

[![Build Status](https://travis-ci.org/crijke/feathers-envhelpers.png?branch=master)](https://travis-ci.org/crijke/feathers-envhelpers)
[![Code Climate](https://codeclimate.com/github/crijke/feathers-envhelpers/badges/gpa.svg)](https://codeclimate.com/github/crijke/feathers-envhelpers)
[![Test Coverage](https://codeclimate.com/github/crijke/feathers-envhelpers/badges/coverage.svg)](https://codeclimate.com/github/crijke/feathers-envhelpers/coverage)
[![Dependency Status](https://img.shields.io/david/crijke/feathers-envhelpers.svg?style=flat-square)](https://david-dm.org/crijke/feathers-envhelpers)
[![Download Status](https://img.shields.io/npm/dm/feathers-envhelpers.svg?style=flat-square)](https://www.npmjs.com/package/feathers-envhelpers)

> Convenience functions to determine the current node environment in Feathers

## Installation

```
npm install feathers-envhelpers --save
```

### API 
This plugin adds the following methods to the app object: 

### `app.isDevelopment()` 
returns true if 
* NODE_ENV is set to 'development'
* NOVE_ENV is not set or empty

### `app.isProduction()`
returns true if NODE_ENV is set to 'production'

### `app.isEnv(name)` 
returns true if Feathers is running in environment with name 'name', eg. `app.isEnv('staging')`

### `app.getEnv()` 
returns process.env.NODE_ENV

### Environment validation

The plugin validates the value of NODE_ENV to ensure it is written in lowercase and
throws an Error otherwise. 

These values will pass:
````js
NODE_ENV=production
NODE_ENV=
NODE_ENV=development
````

These will cause an error to be thrown: 
````js
NODE_ENV=PRODUCTION
NODE_ENV=Staging
````
 
## How to use

Configure the Plugin:

```js
const feathers = require('@feathersjs/feathers');
const envHelpers = require('feathers-envhelpers');

// Initialize the application
const app = feathers();

// Initialize the plugin
app.configure(envHelpers());
```

Then in your application code: 
```
if (app.isDevelopment()){
 // do something in development only
}
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
