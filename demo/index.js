import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import SocialLogin from '../src'

const handleSocialLogin = (user) => {
  console.log(user)
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

class Button extends Component {
  static propTypes = {
    triggerLogin: PropTypes.func.isRequired
  }

  render () {
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    return (
      <div onClick={this.props.triggerLogin} style={style}>
        { this.props.children }
      </div>
    )
  }
}

const SocialButton = SocialLogin(Button)

ReactDOM.render(
  <div>
    <SocialButton
      provider='facebook'
      appId='1724499281174401'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </SocialButton>
    <SocialButton
      provider='google'
      appId='1085669919173-lslfngv7lb6j9sr7eostmtk54mrdmhc5.apps.googleusercontent.com'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Google
    </SocialButton>
  </div>,
  document.getElementById('app')
)
