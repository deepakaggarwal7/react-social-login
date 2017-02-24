
import ReactDOM from 'react-dom'

import SocialLogin from '../src'

const handleSocialLogin = (user, err) => {
  console.log(user)
  console.log(err)
}

const SocialButton = SocialLogin(({ onClick, provider }) => (
  <button onClick={onClick}>Login with {provider}</button>
))

ReactDOM.render(
  <div>
    <FBButton provider='facebook' appId='209060642824026' onLoginSuccess={handleSocialLogin} />
  </div>,
  document.getElementById('app')
)

import ReactDOM from 'react-dom'

import SocialLogin from '../src'

const handleSocialLogin = (user, err) => {
  console.log(user)
  console.log(err)
}

const SocialButton = SocialLogin(({ onClick, provider }) => (
  <button onClick={onClick}>Login with {provider}</button>
))

ReactDOM.render(
  <div>
    <FBButton provider='facebook' appId='209060642824026' onLoginSuccess={handleSocialLogin} />
  </div>,
  document.getElementById('app')
)
