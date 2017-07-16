const load = (appId) => new Promise((resolve, reject) => {
  const firstJS = document.getElementsByTagName('script')[0]
  const js = document.createElement('script')

  js.src = '//connect.facebook.net/en_US/sdk.js'
  js.id = 'facebook-jssdk'

  window.fbAsyncInit = () => {
    window.FB.init({
      appId,
      xfbml: true,
      version: 'v2.8'
    })

    return resolve()
  }

  if (document.getElementById('facebook-jssdk')) {
    return resolve()
  }

  if (!firstJS) {
    document.appendChild(js)
  } else {
    firstJS.parentNode.appendChild(js)
  }
})

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

const getProfile = () => new Promise((resolve, reject) => {
  window.FB.api('/me', {
    fields: 'email,name,id,first_name,last_name,picture'
  }, (profile) => resolve(profile))
})

export default {
  checkLogin,
  load,
  login
}
