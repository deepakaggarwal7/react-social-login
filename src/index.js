import PropTypes from 'prop-types'
import React, { Component } from 'react'

import config from './config'
import sdk from './sdk'
import SocialUser from './SocialUser'
import { getHashValue, getQueryStringValue, omit } from './utils'

export { default as OldSocialLogin } from './component'

// Load fetch polyfill for browsers not supporting fetch API
if (!window.fetch) {
  require('whatwg-fetch')
}

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
    provider: PropTypes.oneOf(config.providers).isRequired,
    redirect: (props, propName, componentName) => {
      if (props.provider === 'instagram' && !props[propName] && typeof props[propName] !== 'string') {
        return new Error(`Invalid prop \`${propName}\` supplied to ${componentName}. Validation failed.`)
      }
    }
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
    this.accessToken = null

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.login = this.login.bind(this)
  }

  /**
   * Loads SDK on componentDidMount and handles auto login.
   */
  componentDidMount () {
    const { appId, autoLogin, provider, redirect } = this.props

    if (provider === 'instagram' && getQueryStringValue('rsl') === 'instagram') {
      if (getQueryStringValue('error')) {
        this.onLoginFailure(`${getQueryStringValue('error_reason')}: ${getQueryStringValue('error_description')}`)
      } else {
        this.accessToken = getHashValue('access_token')
      }
    }

    this.sdk.load(appId, redirect)
      .then(() => this.setState((prevState) => ({
        ...prevState,
        isLoaded: true
      }), () => {
        if (autoLogin || this.accessToken) {
          if (provider === 'instagram' && !this.accessToken) {
            this.sdk.login(appId, redirect)
          } else {
            this.sdk.checkLogin(this.accessToken).then((authResponse) => {
              this.onLoginSuccess(authResponse)
            })
          }
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

      let login = this.sdk.login

      if (this.props.provider === 'instagram') {
        login = this.sdk.login.bind(this, this.accessToken)
      }

      login()
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
