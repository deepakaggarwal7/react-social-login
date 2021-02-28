
import { rslError, timestampFromNow } from '../utils'

/**
 * Loads LinkedIn SDK.
 * @param {string} appId
 */
const load = ({ appId }) => new Promise((resolve) => {
  // @TODO: handle errors
  if (document.getElementById('linkedin-client')) {
    return resolve()
  }

  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = '//platform.linkedin.com/in.js?async=true'
  js.id = 'linkedin-client'

  js.onload = () => {
    window.IN.init({
      api_key: appId
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
 * Checks if user is logged in to app through LinkedIn.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
const checkLogin = () => new Promise((resolve, reject) => {
  if (!window.IN.User.isAuthorized()) {
    return reject(rslError({
      provider: 'linkedin',
      type: 'check_login',
      description: 'Not authenticated',
      error: null
    }))
  }

  return getProfile().then(resolve, reject)
})

/**
 * Trigger LinkedIn login popup.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
const login = () => new Promise((resolve, reject) => {
  window.IN.User.authorize(() => checkLogin()
    .then(getProfile)
    .then(resolve)
    .catch(reject))
})

/**
 * Trigger LinkedIn logout.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk Section Additional SDK functions - Log the user out
 */
const logout = () => new Promise((resolve) => {
  window.IN.User.logout(resolve)
})

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developer.linkedin.com/docs/getting-started-js-sdk
 */
const getProfile = () => new Promise((resolve, reject) => {
  window.IN.API.Profile('me').fields([
    'id',
    'firstName',
    'lastName',
    'pictureUrl',
    'publicProfileUrl',
    'emailAddress'
  ]).result(resolve).error((err) => reject(rslError({
    provider: 'linkedin',
    type: 'get_profile',
    description: 'Failed to get user profile',
    error: err
  })))
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
const generateUser = (response) => ({
  profile: {
    id: window.IN.ENV.auth.member_id,
    name: `${response.values[0].firstName} ${response.values[0].lastName}`,
    firstName: response.values[0].firstName,
    lastName: response.values[0].lastName,
    email: response.values[0].emailAddress,
    publicProfileURL: response.values[0].publicProfileUrl,
    profilePicURL: response.values[0].pictureUrl
  },
  token: {
    accessToken: window.IN.ENV.auth.oauth_token,
    expiresAt: timestampFromNow(window.IN.ENV.auth.oauth_expires_in)
  }
})

const oldLoad = (appId) => {
  const id = 'li-client'
  const fjs = document.getElementsByTagName('script')[0]
  let js

  if (document.getElementById(id)) {
    return
  }

  js = document.createElement('script')

  js.id = id
  js.src = '//platform.linkedin.com/in.js?async=true'

  js.onload = () => {
    window.IN.init({
      api_key: appId,
      authorize: true
    })
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
