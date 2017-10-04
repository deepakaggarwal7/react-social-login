import { rslError } from '../utils'

/**
 * Loads Amazon SDK.
 * @param {string} appId
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/install_sdk_javascript.html
 */
const load = ({ appId }) => new Promise((resolve) => {
  // @TODO: handle errors
  if (document.getElementById('amazon-sdk')) {
    return resolve()
  }

  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = '//api-cdn.amazon.com/sdk/login1.js'
  js.id = 'amazon-sdk'
  js.async = true

  window.onAmazonLoginReady = () => {
    window.amazon.Login.setClientId(appId)

    return resolve()
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

/**
 * Checks if user is logged in to app through Amazon.
 * Requires SDK to be loaded first.
 */
const checkLogin = () => new Promise((resolve, reject) => {
  window.amazon.Login.authorize({ scope: 'profile' }, (response) => {
    if (response.error) {
      return reject(rslError({
        provider: 'amazon',
        type: 'auth',
        description: 'Authentication failed',
        error: response
      }))
    }

    return getProfile(response).then(resolve, reject)
  })
})

/**
 * Trigger Amazon login process.
 * Requires SDK to be loaded first.
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/javascript_sdk_reference.html#authorize
 */
const login = () => new Promise((resolve, reject) => {
  return checkLogin()
    .then(resolve, reject)
})

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/javascript_sdk_reference.html#retrieveProfile
 */
const getProfile = (authResponse) => new Promise((resolve, reject) => {
  window.amazon.Login.retrieveProfile(authResponse.access_token, (response) => {
    if (response.error) {
      return reject(rslError({
        provider: 'amazon',
        type: 'get_profile',
        description: 'Failed to get user profile',
        error: response
      }))
    }

    return resolve({ ...authResponse, ...response })
  })
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @see https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/javascript_sdk_reference.html#retrieveProfile
 */
const generateUser = (response) => {
  const expiresAt = new Date()

  return {
    profile: {
      id: response.profile.CustomerId,
      name: response.profile.Name,
      firstName: response.profile.Name,
      lastName: response.profile.Name,
      email: response.profile.PrimaryEmail,
      profilePicURL: undefined // No profile picture available for Amazon provider
    },
    token: {
      accessToken: response.access_token,
      expiresAt: expiresAt.setSeconds(expiresAt.getSeconds() + response.expires_in)
    }
  }
}

export default {
  checkLogin,
  generateUser,
  load,
  login
}
