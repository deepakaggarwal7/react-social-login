import PropTypes from 'prop-types'
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
      appId='309479849514684'
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
    <SocialButton
      provider='linkedin'
      appId='81oplz05qxuccs'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with LinkedIn
    </SocialButton>
    <SocialButton
      autoCleanUri
      provider='instagram'
      appId='afdf675d26214280ac9a792afea5651c'
      redirect='http://localhost:8080'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Instagram
    </SocialButton>
    <SocialButton
      autoCleanUri
      provider='github'
      appId='8a7c2edb2e602d969839'
      appSecret='6b9376025f232f4957403d7480e218128bdfc7d6'
      redirect='http://localhost:8080'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with GitHub
    </SocialButton>
  </div>,
  document.getElementById('app')
)
