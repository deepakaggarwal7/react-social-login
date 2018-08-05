import Promise from 'bluebird'

import { rslError } from '../utils'

/**
 * Loads Microsoft's SDK.
 * @see https://docs.microsoft.com/en-us/previous-versions/office/developer/onedrive-live-sdk-reference/hh550837(v%3doffice.15)
 */

const load = ({ appId }) => new Promise((resolve, reject) => {

  if (document.getElementById('micrsofot-client')) {
    return resolve()
  }

  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = '//js.live.net/v5.0/wl.js'
  js.id = 'microsoft-client'

  js.onload = () => {
    window.WL.init({
      client_id: appId,
      redirect_uri: 'https://localhost:8082/',
      scope: "wl.signin", 
      response_type: "token"
    })

    return resolve();
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

/**
 * Checks if user is logged in to app through Microsoft.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthissignedinget
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthcurrentuserget
 */
const checkLogin = () => new Promise((resolve, reject) => {
  const WLAuth = window.WL.getLoginStatus()
  console.log(WLAuth)
  if (!WLAuth.status === 'connected') {
    return reject(rslError({
      provider: 'microsoft',
      type: 'check_login',
      description: 'Not authenticated',
      error: null
    }))
  }

  return resolve(WLAuth.session)
})

/**
 * Trigger Google login process.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2getauthinstance
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin
 */
const login = () => new Promise((resolve, reject) => {
  console.log('attempting login');
  window.WL.login({
    scope: ["wl.signin", "wl.basic"]
  }).then(
    function (response) {
      console.log(response);
    }
  )
})

/**
 * Trigger Google logout.
 * Requires SDK to be loaded first.
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignout
 */
const logout = () => new Promise((resolve, reject) => {
  Window.WL.logout().then(resolve, reject);
})

/**
 * Helper to generate user account data.
 * @param {Object} response
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetbasicprofile
 * @see https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetauthresponseincludeauthorizationdata
 */
const generateUser = (response) => {
  return {
    profile: {
      id: response.first_name,
      name: response.first_name,
      firstName: response.first_name,
      lastName: response.first_name,
      email: response.first_name,
      profilePicURL: response.first_name
    },
    token: {
      accessToken: 'aaa',
      idToken: 'bbb',
      scope: 'ccc',
      expiresIn: 'ccc',
      firstIssued_at: 'ddd',
      expiresAt: 'eee'
    }
  }
}

const oldLoad = (appId, cid, fn, err) => {
  const js = document.createElement('script')

  js.src = '//js.live.net/v5.0/wl.js'
  js.id = 'microsoft-client'

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
  logout,
  oldLoad
}
