import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import SocialLogin from '../src'

const handleSocialLogin = (user, err) => {
  console.log(user)
  console.log(err)
}

const PureButton = (props) => (
  <button {...props}>Login with Facebook</button>
)

class Button extends Component {
  render () {
    return (
      <button {...this.props}>Login with Facebook</button>
    )
  }
}

const PureSocialButton = SocialLogin(PureButton)
const SocialButton = SocialLogin(Button)

ReactDOM.render(
  <div>
    <PureSocialButton provider='facebook' appId='1724499281174401' onLoginSuccess={handleSocialLogin} />
    <SocialButton provider='linkedin' appId='1724499281174401' onLoginSuccess={handleSocialLogin} />
  </div>,
  document.getElementById('app')
)
