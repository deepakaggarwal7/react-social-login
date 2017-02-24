import React from 'react'
import ReactDOM from 'react-dom'

import SocialLogin from '../src'

const handleSocialLogin = (user, err) => {
  console.log(user)
  console.log(err)
}

const Button = ({ provider }) => (
  <button>Login with {provider}</button>
)

const FBButton = SocialLogin(Button)

ReactDOM.render(
  <div>
    <FBButton provider='facebook' appId='1688338261458536' onLoginSuccess={handleSocialLogin} />
  </div>,
  document.getElementById('app')
)
