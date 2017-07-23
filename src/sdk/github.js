import uuid from 'uuid/v5'

import { getQueryStringValue, responseTextToObject } from '../utils'

const GITHUB_API = 'https://api.github.com'
const GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token'

let githubAuth
let githubAppId
let githubAppSecret
let githubRedirect
let githubAccessToken

// Load fetch polyfill for browsers not supporting fetch API
if (!window.fetch) {
  require('whatwg-fetch')
}

/**
 * Fake Github SDK loading (needed to trick RSL into thinking its loaded).
 * @param {string} appId
 * @param {string} redirect
 * @param {string} appSecret
 */
const load = (appId, redirect, appSecret) => new Promise((resolve, reject) => {
  githubAppId = appId
  githubAppSecret = appSecret
  githubRedirect = `${redirect}%3FrslCallback%3Dgithub`
  githubAuth = `http://github.com/login/oauth/authorize?client_id=${githubAppId}&redirect_uri=${githubRedirect}&scope=user&state=${uuid(redirect, uuid.URL)}`

  if (getQueryStringValue('rslCallback') === 'github') {
    getAccessToken()
      .then((accessToken) => {
        githubAccessToken = accessToken

        return resolve(githubAccessToken)
      })
      .catch((err) => reject(err))
  } else {
    return resolve()
  }
})

/**
 * Checks if user is logged in to app through LinkedIn.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/#redirect-urls
 */
const checkLogin = (autoLogin = false) => {
  if (autoLogin) {
    return login()
  }

  if (!githubAccessToken) {
    return Promise.reject('No access token available')
  }

  return new Promise((resolve, reject) => {
    window.fetch(`${GITHUB_API}/user?access_token=${githubAccessToken.access_token}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err))
  })
}

/**
 * Trigger LinkedIn login process.
 * This code only triggers login request, response is handled by a callback handled on SDK load.
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps
 */
const login = () => new Promise((resolve) => {
  checkLogin()
    .then((response) => resolve(response))
    .catch(() => {
      window.open(githubAuth, '_self')
    })
})

/**
 * Get access token with authorization code
 * @see https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps
 */
const getAccessToken = () => new Promise((resolve, reject) => {
  const authorizationCode = getQueryStringValue('code')

  if (!authorizationCode) {
    return reject('Authorization code not found')
  }

  window.fetch(`${GITHUB_ACCESS_TOKEN}?client_id=${githubAppId}&client_secret=${githubAppSecret}&code=${authorizationCode}&redirect_uri=${githubRedirect}`, {
    method: 'GET'
  })
    .then((response) => response.text())
    .then((text) => responseTextToObject(text))
    .then((response) => {
      if (response.error) {
        return reject(`Failed to get GitHub access token (${response.error}: ${response.error_description} - ${response.error_uri})`)
      }

      return resolve(response)
    })
    .catch((err) => reject(err))
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 */
const generateUser = (response) => ({
  profile: {
    id: response.id,
    name: response.name,
    firstName: response.name,
    lastName: response.name,
    email: response.email,
    profilePicURL: response.avatar_url
  },
  token: {
    accessToken: githubAccessToken.access_token,
    expiresAt: Infinity // Couldn’t find a way to get expiration time
  }
})

export default {
  checkLogin,
  generateUser,
  getAccessToken,
  load,
  login
}
