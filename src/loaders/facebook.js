const facebookSDKLoader = (d, cid, appId, fn, err) => {
  const id = 'fb-client'
  const fjs = d.getElementsByTagName('script')[0]
  let js

  if (d.getElementById(id)) {
    return
  }

  js = d.createElement('script')

  js.id = id
  js.src = '//connect.facebook.net/en_US/all.js'

  js.onLoad = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.8'
      })
    }
  }

  fjs.parentNode.insertBefore(js, fjs)
}

export default facebookSDKLoader
