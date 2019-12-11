import mapEnvVars from 'map-env-vars'
import booleanifyObjKeys from './booleanify-obj-keys'
import basicAuthHeader from './basic-auth-header'

const requiredVarLookups = [
  'baseUrl',
  'backendUrl',
  'backendAuth',
  'remoteGqlPath',
  'nuxtGqlPath',
  'proxyGql',
  'fineDebug',
  'port',
  'host'
]

export default class NuxtConfigBuilder {
  constructor(options = {}) {
    this.options = {
      siteName: 'FINE--DEFAULT_SITE_NAME',
      environmentVarConfig: {
        remote_development: 'DEV_',
        staging: 'STAGE_'
      },
      environmentVarLookups: {},
      environmentVarLookupsToBool: [],
      ...options
    }

    this.validateOptions()

    this.env = booleanifyObjKeys(
      mapEnvVars({
        envConfig: this.options.environmentVarConfig,
        varLookups: this.options.environmentVarLookups
      }),
      this.options.environmentVarLookupsToBool
    )

    this.authConfig = this.buildAuthConfig()
    this.proxyConfig = this.buildProxyConfig()
    this.apolloConfig = this.buildApolloConfig()
    this.addModules = this.buildAddModules()
    this.addConfig = this.buildAddConfig()

    return {
      options: this.options,
      siteName: this.options.siteName,
      env: this.env,
      authConfig: this.authConfig,
      proxyConfig: this.proxyConfig,
      apolloConfig: this.apolloConfig,
      addModules: this.addModules,
      addConfig: this.addConfig
    }
  }

  validateOptions() {
    requiredVarLookups.forEach(finalName => {
      if (!this.options.environmentVarLookups[finalName]) {
        throw `environmentVarLookups option requires that '${finalName}' key is provided`
      }
    })
  }

  buildAuthConfig() {
    const backendAuthEncoded = basicAuthHeader(this.env.backendAuth)
    return {
      backendAuthEncoded,
      gqlAuthHeader: backendAuthEncoded ? { Authorization: backendAuthEncoded } : {},
      gqlAuthType: backendAuthEncoded ? { authenticationType: 'Basic' } : {},
      proxyAuth: backendAuthEncoded ? { auth: this.env.backendAuth } : {}
    }
  }

  buildProxyConfig() {
    return this.env.proxyGql
      ? {
          [`${this.env.nuxtGqlPath}`]: {
            ...this.authConfig.proxyAuth,
            target: `${this.env.backendUrl}`,
            pathRewrite: {
              [`^${this.env.nuxtGqlPath}`]: this.env.remoteGqlPath
            }
          }
        }
      : {}
  }

  buildApolloConfig() {
    const gqlHttpEndpoint = this.env.proxyGql
      ? `${this.env.baseUrl}${this.env.nuxtGqlPath}`
      : `${this.env.backendUrl}${this.env.remoteGqlPath}`
    return {
      ...this.authConfig.gqlAuthType,
      tokenName: `${this.options.siteName}-apollo-token`,
      clientConfigs: {
        default: {
          httpEndpoint: gqlHttpEndpoint,
          httpLinkOptions: {
            headers: {
              ...this.authConfig.gqlAuthHeader
            }
          }
        }
      }
    }
  }

  buildAddModules() {
    return this.env.proxyGql ? ['@nuxtjs/proxy'] : []
  }

  buildAddConfig() {
    return {
      proxy: this.proxyConfig,
      apollo: this.apolloConfig,
      server: {
        port: this.env.port,
        host: this.env.host
      }
    }
  }
}
