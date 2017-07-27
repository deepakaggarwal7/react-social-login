import { rslError } from '../utils'

const GITHUB_API = 'https://api.github.com/graphql'

let githubAppId

// Load fetch polyfill for browsers not supporting fetch API
if (!window.fetch) {
  require('whatwg-fetch')
}

/**
 * Fake Github SDK loading (needed to trick RSL into thinking its loaded).
 * @param {string} appId
 */
const load = (appId) => new Promise((resolve, reject) => {
  if (!appId) {
    return reject(rslError({
      provider: 'github',
      type: 'load',
      description: 'Cannot load SDK without appId',
      error: null
    }))
  }

  githubAppId = appId

  return resolve()
})

/**
 * Checks if user is logged in to app through LinkedIn.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/#redirect-urls
 */
const checkLogin = (autoLogin = false) => {
  if (autoLogin) {
    return login()
  }

  return new Promise((resolve, reject) => {
    window.fetch(GITHUB_API, {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${githubAppId}`
      }),
      body: JSON.stringify({ query: 'query { viewer { id, name, email, avatarUrl } }' })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message || json.errors) {
          return reject(rslError({
            provider: 'github',
            type: 'check_login',
            description: 'Failed to fetch user data',
            error: json
          }))
        }

        return resolve(json)
      })
      .catch(() => reject(rslError({
        provider: 'github',
        type: 'check_login',
        description: 'Failed to fetch user data due to CORS issue',
        error: null
      })))
  })
}

/**
 * Trigger LinkedIn login process.
 * This code only triggers login request, response is handled by a callback handled on SDK load.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps
 */
const login = () => new Promise((resolve, reject) => {
  checkLogin()
    .then((response) => resolve(response))
    .catch((error) => reject(error))
})

/**
 * Helper to generate user account data.
 * @param {Object} viewer
 */
const generateUser = ({ data: { viewer } }) => {
  return {
    profile: {
      id: viewer.id,
      name: viewer.name,
      firstName: viewer.name,
      lastName: viewer.name,
      email: viewer.email,
      profilePicURL: viewer.avatarUrl
    },
    token: {
      accessToken: githubAppId,
      expiresAt: Infinity // Couldn’t find a way to get expiration time
    }
  }
}

export default {
  checkLogin,
  generateUser,
  load,
  login
}
