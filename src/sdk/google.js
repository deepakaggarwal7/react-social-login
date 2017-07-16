const load = (appId) => new Promise((resolve, reject) => {
  const firstJS = document.getElementsByTagName('script')[0]
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
    })
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

const checkLogin = () => new Promise((resolve, reject) => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance()

  if (!GoogleAuth.isSignedIn.get()) {
    return reject()
  }

  return resolve(GoogleAuth.currentUser.get())
})

const login = () => new Promise((resolve, reject) => {
  checkLogin()
    .then((profile) => resolve(profile))
    .catch(() => {
      const GoogleAuth = window.gapi.auth2.getAuthInstance()

      GoogleAuth.signIn().then(
        () => GoogleAuth.currentUser.get(),
        () => reject())
    })
})

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
      expiresAt: authResponse.expires_at
    }
  }
}

export default {
  checkLogin,
  generateUser,
  load,
  login
}
