🔗 [NPM Package](https://www.npmjs.com/package/fine-nuxt-tools)

# FINE Nuxt Tools

Various tools for working with Nuxt applications @wearefine

## Installation

1. `yarn add fine-nuxt-tools` or `npm i fine-nuxt-tools`

## Usage

Provided functions + packages:

**example.js**

```js
import { basicAuthHeader } from 'fine-nuxt-tools'

let authHeader = basicAuthHeader('blah:blub')
console.log(authHeader) // 'Basic YmxhaDpibHVi'
```

Talk about code

## Options

Talk about options, exports:

```js
// ...
```

## TODO

### NuxtConfigBuilder

- [x] Pull standardized auth, proxy, and apollo config from Nuxt codebases
- [x] Add error checking to ensure required environmentVarLookups are present
- [x] Add error reporting / trycatch to various levels of config generation
- [ ] Add dotnev-flow as dev-dep, .env, and a mock test case in test/index.js