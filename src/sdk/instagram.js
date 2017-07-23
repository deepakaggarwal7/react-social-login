import { getHashValue, getQueryStringValue } from '../utils'

const INSTAGRAM_API = 'https://api.instagram.com/v1'

let instagramAuth = 'https://api.instagram.com/oauth/authorize/?response_type=token'
let instagramAppId
let instagramRedirect
let instagramAccessToken

// Load fetch polyfill for browsers not supporting fetch API
if (!window.fetch) {
  require('whatwg-fetch')
}

/**
 * Fake Instagram SDK loading (needed to trick RSL into thinking its loaded).
 */
const load = (appId, redirect) => new Promise((resolve, reject) => {
  instagramAppId = appId
  instagramRedirect = redirect
  instagramAuth = `https://api.instagram.com/oauth/authorize/?client_id=${instagramAppId}&redirect_uri=${instagramRedirect}%3FrslCallback%3Dinstagram&response_type=token`

  if (getQueryStringValue('rslCallback') === 'instagram') {
    if (getQueryStringValue('error')) {
      return reject(`${getQueryStringValue('error_reason')}: ${getQueryStringValue('error_description')}`)
    } else {
      instagramAccessToken = getHashValue('access_token')
    }
  }

  return resolve(instagramAccessToken)
})

/**
 * Checks if user is logged in to app through Instagram.
 * @see https://www.instagram.com/developer/endpoints/users/#get_users_self
 */
const checkLogin = (autoLogin = false) => {
  if (autoLogin) {
    return login()
  }

  if (!instagramAccessToken) {
    return Promise.reject('No access token available')
  }

  return new Promise((resolve, reject) => {
    window.fetch(`${INSTAGRAM_API}/users/self/?access_token=${instagramAccessToken}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.meta.code !== 200) {
          return reject(`${json.meta.error_type}: ${json.meta.error_message}`)
        }

        return resolve({ data: json.data, accessToken: instagramAccessToken })
      }).catch((err) => reject({ fetchErr: true, err })
    )
  })
}

/**
 * Trigger Instagram login process.
 * This code only triggers login request, response is handled by a callback handled on SDK load.
 * @see https://www.instagram.com/developer/authentication/
 */
const login = () => new Promise((resolve, reject) => {
  checkLogin()
    .then((response) => resolve(response))
    .catch((err) => {
      if (!err.fetchErr) {
        window.open(instagramAuth, '_self')
      } else {
        return reject(err.err || err || null)
      }
    })
})

/**
 * Helper to generate user account data.
 * @param {Object} data
 */
const generateUser = (data) => ({
  profile: {
    id: data.data.id,
    name: data.data.full_name,
    firstName: data.data.full_name,
    lastName: data.data.full_name,
    email: undefined, // Instagram API doesn’t provide email (see https://www.instagram.com/developer/endpoints/users/#get_users_self)
    profilePicURL: data.data.profile_picture
  },
  token: {
    accessToken: data.accessToken,
    expiresAt: Infinity
  }
})

export default {
  checkLogin,
  generateUser,
  load,
  login
}