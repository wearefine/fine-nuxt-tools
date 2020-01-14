import basicAuthHeader from './basic-auth-header'

export default function buildAuthConfig(env) {
  const backendAuthEncoded = basicAuthHeader(env.backendAuth)
  return {
    backendAuthEncoded,
    gqlAuthHeader: backendAuthEncoded ? { Authorization: backendAuthEncoded } : {},
    gqlAuthType: backendAuthEncoded ? { authenticationType: 'Basic' } : {},
    proxyAuth: backendAuthEncoded ? { auth: env.backendAuth } : {}
  }
}
