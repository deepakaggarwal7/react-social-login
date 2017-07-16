/**
 * Loads Facebook SDK.
 * @param {string} appId
 * @see https://developers.facebook.com/docs/javascript/quickstart
 */
const load = (appId) => new Promise((resolve, reject) => {
  if (document.getElementById('facebook-jssdk')) {
    return resolve()
  }

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

/**
 * Checks if user is logged in to app through Facebook.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
 */
const checkLogin = () => new Promise((resolve, reject) => {
  window.FB.getLoginStatus((response) => {
    switch (response.status) {
      case 'connected':
        return resolve(response.authResponse)
      case 'not_authorized':
      case 'unknown':
        return reject()
    }
  })
})

/**
 * Trigger Facebook login popup.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/docs/reference/javascript/FB.login/v2.9
 */
const login = () => new Promise((resolve, reject) => {
  window.FB.login((response) => {
    switch (response.status) {
      case 'connected':
        getProfile().then((profile) => resolve({ ...profile, ...response.authResponse }))

        break
      case 'not_authorized':
      case 'unknown':
        return reject()
    }
  })
})

/**
 * Gets currently logged in user profile data.
 * Requires SDK to be loaded first.
 * @see https://developers.facebook.com/tools/explorer?method=GET&path=me%3Ffields%3Demail%2Cname%2Cid%2Cfirst_name%2Clast_name%2Cpicture&version=v2.9
 */
const getProfile = () => new Promise((resolve, reject) => {
  window.FB.api('/me', 'GET', {
    fields: 'email,name,id,first_name,last_name,picture'
  }, (profile) => resolve(profile))
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
    accessToken: response.authResponse.accessToken,
    expiresAt: response.authResponse.expiresIn
  }
})

export default {
  checkLogin,
  generateUser,
  load,
  login
}
