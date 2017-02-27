const load = (appId) => new Promise((resolve, reject) => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId,
      xfbml: true,
      version: 'v2.8'
    })

    return resolve()
  }

  const firstJS = document.getElementsByTagName('script')[0]
  let sdk

  if (document.getElementById('facebook-jssdk')) {
    return resolve()
  }

  sdk = document.createElement('script')

  sdk.id = 'facebook-jssdk'
  sdk.src = '//connect.facebook.net/en_US/sdk.js'
  // js.addEventListener('load', (err) => console.log(err))

  firstJS.parentNode.insertBefore(sdk, firstJS)
})

const checkLogin = () => new Promise((resolve, reject) => {
  window.FB.getLoginStatus((response) => {
    switch (response.status) {
      case 'connected':
        return resolve(response.authResponse)
      case 'not_authorized':
      case 'unknown':
        return resolve()
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
