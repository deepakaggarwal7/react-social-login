import React, { Component, PropTypes } from 'react'

import config from './config'
import sdk from './sdk'
import SocialUser from './SocialUser'
import { omit } from './utils'

const SocialLogin = (WrappedComponent) => class SocialLogin extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    autoLogin: PropTypes.bool,
    onLoginFailure: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    provider: PropTypes.oneOf(config.providers).isRequired,
    version: PropTypes.string
  }

  static defaultProps = {
    version: '2.8'
  }

  constructor (props) {
    super(props)

    this.state = {
      isLoaded: false,
      isConnected: false,
      isFetching: false
    }
    this.sdk = sdk[props.provider]

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount () {
    this.sdk.load(this.props.appId)
      .then(() => this.setState((prevState) => ({
        ...prevState,
        isLoaded: true
      }), () => {
        if (this.props.autoLogin) {
          this.sdk.checkLogin().then((authResponse) => {
            this.onLoginSuccess(authResponse)
          })
        }
      }))
  }

  onLoginSuccess (response) {
    const { onLoginSuccess, provider } = this.props
    const user = new SocialUser(provider)
    const socialUserData = this.sdk.generateUser(response)

    this.setState((prevState) => ({
      ...prevState,
      isFetching: false,
      isConnected: true
    }))

    user.profile = socialUserData.profile
    user.token = socialUserData.token

    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(user)
    }

    // const expiresAt = new Date()
    //
    // userProfile = {
    //   id: window.IN.ENV.auth.member_id,
    //   name: `${response.values[0].firstName} ${response.values[0].lastName}`,
    //   firstName: response.values[0].firstName,
    //   lastName: response.values[0].lastName,
    //   email: response.values[0].emailAddress,
    //   profilePicURL: response.values[0].pictureUrl
    // }
    // token = {
    //   accessToken: undefined, // Couldn't find a way to fetch token
    //   expiresAt: expiresAt.setSeconds(expiresAt.getSeconds() + window.IN.ENV.auth.oauth_expires_in)
    // }
  }

  onLoginFailure (err) {
    this.setState((prevState) => ({
      ...prevState,
      isFetching: false,
      isConnected: false
    }))

    if (typeof this.props.onLoginFailure === 'function') {
      this.props.onLoginFailure(err)
    }
  }

  login () {
    if (this.state.isLoaded && !this.state.isConnected && !this.state.isFetching) {
      this.setState((prevState) => ({
        ...prevState,
        isFetching: true
      }))

      this.sdk.login()
        .then((response) => this.onLoginSuccess(response))
        .catch(() => this.onLoginFailure('Login failed'))
    }
  }

  render () {
    const originalProps = omit(this.props, ['appId', 'autoLogin', 'onLoginFailure', 'onLoginSuccess', 'provider', 'version'])

    return (
      <WrappedComponent onClick={this.login} {...originalProps} />
    )
  }
}

export default SocialLogin
