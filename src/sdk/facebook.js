
import { rslError, timestampFromNow } from '../utils'

let facebookScopes = [
  'public_profile',
  'email'
]

/**
 * Loads Facebook SDK.
 * @param {string} appId
 * @param {array|string} scope
 * @param {array|string} version
 * @see https://developers.facebook.com/docs/javascript/quickstart
 */
const load = ({ appId, scope, version }) => new Promise((resolve) => {
  // @TODO: handle errors
  if (document.getElementById('facebook-jssdk')) {
    return resolve()
  }

  if (Array.isArray(scope)) {
    facebookScopes = facebookScopes.concat(scope)
  } else if (typeof scope === 'string' && scope) {
    facebookScopes = facebookScopes.concat(scope.split(','))
  }

  facebookScopes = facebookScopes.reduce((acc, item) => {
    if (typeof item === 'string' && acc.indexOf(item) === -1) {
      acc.push(item.trim())
    }

    return acc
  }, []).join(',')

  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  js.id = 'facebook-jssdk'

  window.fbAsyncInit = () => {
    window.FB.init({
      appId,
      xfbml: true,
      version: version || 'v5.0'
    })

    return resolve()
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

/**
 * Gets Facebook user profile if connected.
 * @param {Object} response
 */
const handleLoginStatus = (response) => new Promise((resolve, reject) => {
  if (!response.authResponse) {
    return reject(rslError({
      provider: 'facebook',
      type: 'auth',
      description: 'Authentication failed',
      error: response
    }))
  }

  switch (response.status) {
    case 'connected':
      getProfile().then((profile) => resolve({
        ...profile,
        ...response.authResponse
      }))

      break
    case 'not_authorized':
    case 'unknown':
      return reject(rslError({
        provider: 'facebook',
        type: 'auth',
        description: 'Authentication has been cancelled or an unknown error occurred',
        error: response
      }))
  }
})

/**
 * Checks if user is logged in to app through Facebook.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
 */
const checkLogin = () => new Promise((resolve, reject) => {
  window.FB.getLoginStatus((response) => handleLoginStatus(response)
    .then(resolve, reject))
})

/**
 * Trigger Facebook login popup.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.login/v2.9
 */
const login = () => new Promise((resolve, reject) => {
  window.FB.login((response) => handleLoginStatus(response)
    .then(resolve, reject), { scope: facebookScopes })
})

/**
 * Trigger Facebook logout.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.logout
 */
const logout = () => new Promise((resolve) => {
  window.FB.logout(resolve)
})

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/tools/explorer?method=GET&path=me%3Ffields%3Demail%2Cname%2Cid%2Cfirst_name%2Clast_name%2Cpicture&version=v2.9
 */
const getProfile = () => new Promise((resolve) => {
  window.FB.api('/me', 'GET', {
    fields: 'email,name,id,first_name,last_name,picture'
  }, resolve)
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
const generateUser = (response) => ({
  profile: {
    id: response.id,
    name: response.name,
    firstName: response.first_name,
    lastName: response.last_name,
    email: response.email,
    profilePicURL: response.picture.data.url
  },
  token: {
    accessToken: response.accessToken,
    expiresAt: timestampFromNow(response.expiresIn)
  }
})

const oldLoad = (appId) => {
  const id = 'fb-client'
  const fjs = document.getElementsByTagName('script')[0]
  let js

  if (document.getElementById(id)) {
    return
  }

  js = document.createElement('script')

  js.id = id
  js.src = '//connect.facebook.net/en_US/all.js'

  js.onLoad = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v3.3'
      })
    }
  }

  fjs.parentNode.insertBefore(js, fjs)
}

export default {
  checkLogin,
  generateUser,
  load,
  login,
  logout,
  oldLoad
}
