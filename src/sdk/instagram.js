const INSTAGRAM_API = 'https://api.instagram.com/v1'
let INSTAGRAM_AUTH = 'https://api.instagram.com/oauth/authorize/?response_type=token'
let windowRef = null

/**
 * Fake Instagram SDK loading (needed to trick RSL into thinking its loaded).
 */
const load = (appId, redirect) => new Promise((resolve) => {
  INSTAGRAM_AUTH = `https://api.instagram.com/oauth/authorize/?client_id=${appId}&redirect_uri=${redirect}%3Frsl%3Dinstagram&response_type=token`

  return resolve()
})

/**
 * Checks if user is logged in to app through Instagram.
 * @see https://www.instagram.com/developer/endpoints/users/#get_users_self
 */
const checkLogin = (accessToken) => new Promise((resolve, reject) => {
  window.fetch(`${INSTAGRAM_API}/users/self/?access_token=${accessToken}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.meta.code !== 200) {
        return reject(`${json.meta.error_type}: ${json.meta.error_message}`)
      }

      return resolve(generateUser(json.data, accessToken))
    }).catch((err) => reject('Failed to parse Instagram API response', err))
})

/**
 * Trigger Instagram login process.
 * This code only triggers login request, response is handled by a callback so it’s RSL itself which handles it.
 * @see https://www.instagram.com/developer/authentication/
 */
const login = (accessToken) => new Promise((resolve) => {
  checkLogin(accessToken)
    .then((response) => resolve(response))
    .catch(() => {
      if (windowRef === null || windowRef.closed) {
        windowRef = window.open(INSTAGRAM_AUTH, '_self')
      } else {
        windowRef.focus()
      }

      return resolve()
    })
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @param {string} accessToken
 */
const generateUser = (response, accessToken) => ({
  profile: {
    id: response.id,
    name: response.full_name,
    firstName: response.full_name,
    lastName: response.full_name,
    email: undefined, // Instagram API doesn’t provide email (see https://www.instagram.com/developer/endpoints/users/#get_users_self)
    profilePicURL: response.profile_picture
  },
  token: {
    accessToken,
    expiresAt: Infinity
  }
})

export default {
  checkLogin,
  generateUser,
  load,
  login
}
