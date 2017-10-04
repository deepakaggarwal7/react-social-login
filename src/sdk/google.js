import { rslError } from '../utils'

/**
 * Loads Google SDK.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientloadname--------version--------callback
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2initparams
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 */
const load = ({ appId, scope }) => new Promise((resolve, reject) => {
  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  scope = scope ? (Array.isArray(scope) && scope.join(',') || scope) : null

  js.src = '//apis.google.com/js/platform.js'
  js.id = 'gapi-client'

  js.onload = () => {
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: appId,
          scope
        }).then(() => resolve(), (err) => reject(rslError({
          provider: 'google',
          type: 'load',
          description: 'Failed to load SDK',
          error: err
        })))
      } else {
        resolve()
      }
    })
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

/**
 * Checks if user is logged in to app through Google.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthissignedinget
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthcurrentuserget
 */
const checkLogin = () => new Promise((resolve, reject) => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance()

  if (!GoogleAuth.isSignedIn.get()) {
    return reject(rslError({
      provider: 'google',
      type: 'check_login',
      description: 'Not authenticated',
      error: null
    }))
  }

  return resolve(GoogleAuth.currentUser.get())
})

/**
 * Trigger Google login process.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin
 */
const login = () => new Promise((resolve, reject) => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance()

  GoogleAuth.signIn().then(
    () => checkLogin().then(resolve, reject),
    (err) => reject(rslError({
      provider: 'google',
      type: 'auth',
      description: 'Authentication failed',
      error: err
    }))
  )
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetbasicprofile
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetauthresponseincludeauthorizationdata
 */
const generateUser = (response) => {
  const profile = response.getBasicProfile()
  const authResponse = response.getAuthResponse(true)

  return {
    profile: {
      id: profile.getId(),
      name: profile.getName(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
      profilePicURL: profile.getImageUrl()
    },
    token: {
      accessToken: authResponse.access_token,
      idToken: authResponse.id_token,
      scope: authResponse.scope,
      expiresIn: authResponse.expires_in,
      firstIssued_at: authResponse.first_issued_at,
      expiresAt: authResponse.expires_at
    }
  }
}

const oldLoad = (appId, cid, fn, err) => {
  const js = document.createElement('script')

  js.src = 'https://apis.google.com/js/platform.js'
  js.id = 'gapi-client'

  js.onload = () => {
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: appId
        })
      }

      window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, fn, err)
    })
  }

  if (document.getElementsByTagName('script').length === 0) {
    document.appendChild(js)
  } else {
    document.getElementsByTagName('script')[0].parentNode.appendChild(js)
  }
}

export default {
  checkLogin,
  generateUser,
  load,
  login,
  oldLoad
}
