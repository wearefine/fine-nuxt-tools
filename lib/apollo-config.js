import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import buildAuthConfig from './build-auth-config'

export default function(context) {
  const authConfig = buildAuthConfig(context.env)
  const gqlHttpEndpoint = context.env.proxyGql
    ? `${context.env.baseUrl}${context.env.nuxtGqlPath}`
    : `${context.env.backendUrl}${context.env.remoteGqlPath}`

  const cache = new InMemoryCache()
  const httpLink = createHttpLink({
    uri: gqlHttpEndpoint,
    headers: {
      ...authConfig.gqlAuthHeader
    }
  })

  const errorHandler = onError(errorContext => {
    let message

    if (errorContext.networkError) {
      message = `Network error: ${errorContext.networkError}`
    } else {
      message = `${JSON.stringify(errorContext.graphQLErrors)}`
    }

    // Push error to logfile via winstonLogger
    if (process.server) {
      const { extractReqInfo } = require('nuxt-winston-log/utils')
      context.app.$winstonLogger.error(message, { ...extractReqInfo(context.req) })
    }

    throw message
  })

  return {
    link: ApolloLink.from([errorHandler, httpLink]),
    cache,
    defaultHttpLink: false
  }
}
