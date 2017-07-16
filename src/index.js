import PropTypes from 'prop-types'
import React, { Component } from 'react'

import config from './config'
import sdk from './sdk'
import SocialUser from './SocialUser'
import { omit } from './utils'

export { default as OldSocialLogin } from './component'

/**
 * React Higher Order Component handling social login for multiple providers.
 * @param {Element} WrappedComponent
 * @constructor
 */
const SocialLogin = (WrappedComponent) => class SocialLogin extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    autoLogin: PropTypes.bool,
    onLoginFailure: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    provider: PropTypes.oneOf(config.providers).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      isLoaded: false,
      isConnected: false,
      isFetching: false
    }
    // Load required SDK
    this.sdk = sdk[props.provider]

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.login = this.login.bind(this)
  }

  /**
   * Loads SDK on componentDidMount and handles auto login.
   */
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

  /**
   * Triggers login process.
   */
  login () {
    if (this.state.isLoaded && !this.state.isConnected && !this.state.isFetching) {
      this.setState((prevState) => ({
        ...prevState,
        isFetching: true
      }))

      this.sdk.login()
        .then((response) => this.onLoginSuccess(response))
        .catch(() => this.onLoginFailure('Login failed'))
    } else if (this.state.isLoaded && this.state.isConnected) {
      this.props.onLoginFailure('User already connected')
    } else {
      this.props.onLoginFailure('SDK not loaded')
    }
  }

  /**
   * Create SocialUser on login success and transmit it to onLoginSuccess prop.
   * @param {Object} response
   */
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
  }

  /**
   * Handles login failure.
   * @param err
   */
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

  render () {
    // Don’t forward unneeded props
    const originalProps = omit(this.props, ['appId', 'autoLogin', 'onLoginFailure', 'onLoginSuccess', 'provider'])

    return (
      <WrappedComponent triggerLogin={this.login} {...originalProps} />
    )
  }
}

export default SocialLogin
