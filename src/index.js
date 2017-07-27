import PropTypes from 'prop-types'
import React, { Component } from 'react'

import config from './config'
import sdk from './sdk'
import SocialUser from './SocialUser'
import { cleanLocation, omit } from './utils'

export { default as OldSocialLogin } from './component'

/**
 * React Higher Order Component handling social login for multiple providers.
 * @param {Element} WrappedComponent
 * @constructor
 */
const SocialLogin = (WrappedComponent) => class SocialLogin extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    autoCleanUri: PropTypes.bool,
    autoLogin: PropTypes.bool,
    onLoginFailure: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    provider: PropTypes.oneOf(config.providers).isRequired,
    redirect: (props, propName, componentName) => {
      if (props.provider === 'instagram' && !props[propName] && typeof props[propName] !== 'string') {
        return new Error(`Missing required \`${propName}\` prop on ${componentName}.`)
      }
    }
  }

  static defaultProps = {
    autoCleanUri: false
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
    this.fetchProvider = props.provider === 'instagram' || props.provider === 'github'

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.login = this.login.bind(this)
  }

  /**
   * Loads SDK on componentDidMount and handles auto login.
   */
  componentDidMount () {
    const { appId, autoCleanUri, autoLogin, onLoginFailure, redirect } = this.props

    this.sdk.load(appId, redirect)
      .then((accessToken) => {
        if (autoCleanUri) {
          cleanLocation()
        }

        if (accessToken) {
          this.accessToken = accessToken
        }

        this.setState((prevState) => ({
          ...prevState,
          isLoaded: true
        }), () => {
          if (autoLogin || this.accessToken) {
            if (this.fetchProvider && !this.accessToken) {
              this.sdk.login(appId, redirect)
                .catch((err) => this.onLoginFailure(err))
            } else {
              this.sdk.checkLogin(true)
                .then((authResponse) => this.onLoginSuccess(authResponse))
                .catch((err) => this.onLoginFailure(err))
            }
          }
        })
      })
      .catch((err) => onLoginFailure(err))
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
        .catch((err) => this.onLoginFailure(err))
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
