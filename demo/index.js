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

class GitHubLoginWithPersonalToken extends Component {
  constructor (props) {
    super(props)

    this.state = {
      githubToken: ''
    }

    this.trackChange = this.trackChange.bind(this)
  }

  trackChange (e) {
    this.setState({
      githubToken: e.target.value
    })
  }

  render () {
    return (
      <div style={{ marginTop: '1rem' }}>
        <h3>GitHub Authentication with personal token</h3>
        <label htmlFor='gh_token' style={{ display: 'block' }}>GitHub Personal Token</label>
        <input
          id='gh_token'
          type='text'
          onChange={this.trackChange}
          value={this.state.githubToken}
          style={{ display: 'block', marginBottom: '1rem', minWidth: '50%' }}
        />
        {
          this.state.githubToken
            ? <SocialButton
              provider='github'
              appId={this.state.githubToken}
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with GitHub
            </SocialButton>
            : null
        }
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <div>
      { // Amazon only supports HTTPS
        window.location.protocol === 'https:' &&
        <SocialButton
          provider='amazon'
          appId='amzn1.application-oa2-client.26aaf63624854cbcaa084735a0fc47ed'
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Amazon
        </SocialButton>
      }
      <SocialButton
        provider='facebook'
        appId='309479849514684'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Facebook
      </SocialButton>
      { // We don’t use HTTPS because of Gatekeeper, but it can be enabled if Gatekeeper is served over HTTPS
        window.location.protocol !== 'https:' &&
        <SocialButton
          autoCleanUri
          provider='github'
          gatekeeper='http://localhost:9999'
          appId='8a7c2edb2e602d969839'
          redirect='http://localhost:8080'
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with GitHub OAuth
        </SocialButton>
      }
      <SocialButton
        provider='google'
        appId='844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com'
        scope={[
          'https://www.googleapis.com/auth/contacts.readonly'
        ]}
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Google
      </SocialButton>
      <SocialButton
        autoCleanUri
        provider='instagram'
        appId='afdf675d26214280ac9a792afea5651c'
        redirect='https://localhost:8080'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Instagram
      </SocialButton>
      <SocialButton
        provider='linkedin'
        appId='7775kne2guetd0'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with LinkedIn
      </SocialButton>
    </div>
    <GitHubLoginWithPersonalToken />
  </div>,
  document.getElementById('app')
)
