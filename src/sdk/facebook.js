import Promise from 'bluebird'

import { rslError, timestampFromNow } from '../utils'

let facebookScopes = [
  'public_profile',
  'email'
]

let facebookFields = [
  'email',
  'name',
  'id',
  'first_name',
  'last_name',
  'picture'
]

/**
 * Loads Facebook SDK.
 * @param {string} appId
 * @param {array|string} scope
 * @param {array|string} field
 * @see https://developers.facebook.com/docs/javascript/quickstart
 */
const load = ({ appId, scope, field }) => new Promise((resolve) => {
  // @TODO: handle errors
  if (document.getElementById('facebook-jssdk')) {
    return resolve()
  }
  facebookScopes = handleInput(field, facebookScopes)
  facebookFields = handleInput(field, facebookFields)

  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = '//connect.facebook.net/en_US/sdk.js'
  js.id = 'facebook-jssdk'

  window.fbAsyncInit = () => {
    window.FB.init({
      appId,
      xfbml: true,
      version: 'v2.9'
    })

    return resolve()
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

const handleInput = (input, defaultInput) => {
  let result

  if (Array.isArray(input)) {
    result = defaultInput.concat(input)
  } else if (input && typeof input === 'string') {
    result = defaultInput.concat(input.split(','))
  }

  result = result.reduce((acc, item) => {
    if (typeof item === 'string' && acc.indexOf(item) === -1) {
      acc.add(item.trim())
    }

    return acc
  }, new Set())

  return [...result]
}

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
    fields: facebookFields
  }, resolve)
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
const generateUser = ({ accessToken, id, email, expiresIn, first_name, last_name, name, picture, userID, ...other }) => ({
  profile: {
    id,
    email,
    name,
    firstName: first_name,
    lastName: last_name,
    profilePicURL: picture.data.url
  },
  token: {
    accessToken,
    expiresAt: timestampFromNow(expiresIn)
  },
  other
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
        version: 'v2.8'
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
