🔗 [NPM Package](https://www.npmjs.com/package/fine-nuxt-tools)

# FINE Nuxt Tools

Various tools for working with Nuxt applications @wearefine

## Installation

1. `yarn add fine-nuxt-tools` or `npm i fine-nuxt-tools`

## Usage

Provided functions + packages:

**example.js**

```js
console.log(`code`)
```

Talk about code

## Options

Talk about options, exports:

```js
let authHeader = basicAuthHeader('blah:blub')
console.log(authHeader) // 'Basic YmxhaDpibHVi'
```

## TODO

### NuxtConfigBuilder

- [x] Pull standardized auth, proxy, and apollo config from Nuxt codebases
- [ ] Add error checking to ensure required environmentVarLookups are present
- [ ] Add error reporting / trycatch to various levels of config generation
- [ ] Add dotnev-flow as dev-dep, .env, and a mock test case in test/index.js