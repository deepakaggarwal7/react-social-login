const linkedInSDKLoader = (d, cid, appId, fn, err) => {
  const id = 'li-client'
  const fjs = d.getElementsByTagName('script')[0]
  let js

  if (d.getElementById(id)) {
    return
  }

  js = d.createElement('script')

  js.id = id
  js.src = '//platform.linkedin.com/in.js?async=true'

  js.onload = () => {
    window.IN.init({
      api_key: appId,
      authorize: true
    })
  }

  fjs.parentNode.insertBefore(js, fjs)
}

export default linkedInSDKLoader
