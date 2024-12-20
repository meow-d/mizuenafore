import { post, paramsString, WRITE_TIMEOUT } from '../_utils/ajax.js'
import { basename } from './utils.js'

const WEBSITE = 'https://enafore.social'
const SCOPES = 'read write follow push'

export function registerApplication (instanceName, redirectUri) {
  const url = `${basename(instanceName)}/api/v1/apps`

  const isElectron =
    typeof window !== 'undefined' &&
    window.navigator.userAgent.indexOf('Electron') >= 0
  const clientName = isElectron ? 'Enafore Electron' : process.env.UPSTREAM ? 'Enafore' : process.env.BROWSER ? location.hostname : 'Enafore'

  return post(
    url,
    {
      client_name: clientName,
      redirect_uris: redirectUri,
      scopes: SCOPES,
      website: process.env.BROWSER ? location.origin : WEBSITE
    },
    null,
    { timeout: WRITE_TIMEOUT }
  )
}

export function generateAuthLink (instanceName, clientId, redirectUri) {
  const params = paramsString({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES
  })
  return `${basename(instanceName)}/oauth/authorize?${params}`
}

export function getAccessTokenFromAuthCode (instanceName, clientId, clientSecret, code, redirectUri) {
  const url = `${basename(instanceName)}/oauth/token`
  // Using URLSearchParams here guarantees a content type of application/x-www-form-urlencoded
  // See https://fetch.spec.whatwg.org/#bodyinit-unions
  return post(url, new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    code
  }), null, { timeout: WRITE_TIMEOUT })
}
