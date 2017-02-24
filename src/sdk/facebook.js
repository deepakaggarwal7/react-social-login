const load = (appId) => new Promise((resolve, reject) => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId,
      xfbml: true,
      version: 'v2.8'
    })

    return resolve()
  }

  ;(function (d, s, id) {
    let js
    const fjs = d.getElementsByTagName(s)[0]

    if (d.getElementById(id)) {
      return
    }

    js = d.createElement(s)

    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'

    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))
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
        getProfile().then((profile) => resolve(Object.assign(profile, response.authResponse)))

        break
      case 'not_authorized':
      case 'unknown':
        return reject()
    }
  })
})

const getProfile = () => new Promise((resolve, reject) => {
  window.FB.api('/me', { fields: 'email,name,id,first_name,last_name,picture' }, (profile) => {
    return resolve(profile)
  })
})

export default {
  checkLogin,
  load,
  login
}
