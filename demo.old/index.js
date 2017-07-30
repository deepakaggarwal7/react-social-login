import React from 'react'
import ReactDOM from 'react-dom'

import { OldSocialLogin as SocialLogin } from '../src'

const handleSocialLogin = (user, err) => {
  console.log(user)
  console.log(err)
}

ReactDOM.render(
  <div>
    <SocialLogin provider='google' appId='1085669919173-lslfngv7lb6j9sr7eostmtk54mrdmhc5.apps.googleusercontent.com' callback={handleSocialLogin}>
      <button>Login with Google</button>
    </SocialLogin>
    <SocialLogin provider='facebook' appId='309479849514684' callback={handleSocialLogin}>
      <button>Login with Facebook</button>
    </SocialLogin>
    <SocialLogin provider='linkedin' appId='81oplz05qxuccs' callback={handleSocialLogin}>
      <button>Login with LinkedIn</button>
    </SocialLogin>
  </div>,
  document.getElementById('app')
)
