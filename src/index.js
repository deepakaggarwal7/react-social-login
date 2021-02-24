import Promise from 'bluebird'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import config from './config'
import sdk from './sdk'
import SocialUser from './SocialUser'
import { cleanLocation, omit } from './utils'

export { default as OldSocialLogin } from './component'

// Enable Promises cancellation
Promise.config({
  cancellation: true
})

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
    field: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    gatekeeper: PropTypes.string,
    getInstance: PropTypes.func,
    onLoginFailure: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    onLogoutFailure: PropTypes.func,
    onLogoutSuccess: PropTypes.func,
    provider: PropTypes.oneOf(config.providers).isRequired,
    redirect: (props, propName, componentName) => {
      if (props.provider === 'instagram' && (!props[propName] || typeof props[propName] !== 'string')) {
        return new Error(`Missing required \`${propName}\` prop of type \`string\` on ${componentName}.`)
      }
    },
    scope: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    version: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.isStateless = !WrappedComponent.prototype.render
    this._isMounted = null

    this.state = {
      isLoaded: false,
      isConnected: false,
      isFetching: false
    }

    // Load required SDK
    this.sdk = sdk[props.provider]
    this.accessToken = null
    this.fetchProvider = props.provider === 'instagram' || props.provider === 'github'
    this.loadPromise = Promise.resolve()
    this.node = null

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setInstance = this.setInstance.bind(this)
  }

  /**
   * Loads SDK on componentDidMount and handles auto login.
   */
  componentDidMount () {
    const { appId, autoCleanUri, autoLogin, field, gatekeeper, redirect, scope, version } = this.props

    this._isMounted = true

    this.loadPromise = this.sdk.load({ appId, field, gatekeeper, redirect, scope, version })

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
                .catch(this.onLoginFailure)
            } else {
              this.sdk.checkLogin(true)
                .then(this.onLoginSuccess, this.onLoginFailure)
            }
          }
        })

        return null
      }, this.onLoginFailure)
  }

  componentWillReceiveProps (nextProps) {
    const { appId, gatekeeper, provider } = this.props

    if (provider === 'github' && !gatekeeper && appId !== nextProps.appId) {
      this.setState(() => ({
        isLoaded: false,
        isFetching: false,
        isConnected: false
      }), () => {
        this.sdk.load(nextProps.appId).then(() => {
          this.setState((prevState) => ({
            ...prevState,
            isLoaded: true
          }))
        }, this.onLoginFailure)
      })
    }
  }

  componentWillUnmount () {
    this.loadPromise.cancel()
    this.node = null
    this._isMounted = null
  }

  setInstance (node) {
    this.node = node

    if (typeof this.props.getInstance === 'function') {
      this.props.getInstance(node)
    }
  }

  /**
   * Triggers login process.
   */
  login () {
    if (this.state.isLoaded && !this.state.isConnected && !this.state.isFetching) {
      this.setState((prevState) => ({
        ...prevState,
        isFetching: true
      }), () => {
        this.sdk.login().then(this.onLoginSuccess, this.onLoginFailure)
      })
    } else if (this.state.isLoaded && this.state.isConnected) {
      this.props.onLoginFailure('User already connected')
    } else if (this.state.isLoaded && this.state.isFetching) {
      this.props.onLoginFailure('Fetching user')
    } else if (!this.state.isLoaded) {
      this.props.onLoginFailure('SDK not loaded')
    } else {
      this.props.onLoginFailure('Unknown error')
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

    user.profile = socialUserData.profile
    user.token = socialUserData.token
    user.other = socialUserData.other

    // Here we check if component is mounted,
    // so we can update state before
    // triggering login success function
    if (this._isMounted) {
      this.setState((prevState) => ({
        ...prevState,
        isFetching: false,
        isConnected: true
      }), () => {
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(user)
        }
      })
    } else {
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(user)
      }
    }
  }

  /**
   * Handles login failure.
   * @param err
   */
  onLoginFailure (err) {
    const { onLoginFailure } = this.props

    if (this._isMounted) {
      this.setState((prevState) => ({
        ...prevState,
        isFetching: false,
        isConnected: false
      }), () => {
        if (typeof onLoginFailure === 'function') {
          onLoginFailure(err)
        }
      })
    } else {
      if (typeof onLoginFailure === 'function') {
        onLoginFailure(err)
      }
    }
  }

  /**
   * Triggers logout process.
   */
  logout () {
    if (this.state.isLoaded && this.state.isConnected) {
      this.sdk.logout().then(this.onLogoutSuccess, this.onLogoutFailure)
    } else if (this.state.isLoaded && !this.state.isConnected) {
      this.props.onLoginFailure('User not connected')
    } else {
      this.props.onLoginFailure('SDK not loaded')
    }
  }

  /**
   * Handles logout success
   */
  onLogoutSuccess () {
    const { onLogoutSuccess } = this.props

    if (this._isMounted) {
      this.setState((prevState) => ({
        ...prevState,
        isConnected: false
      }), () => {
        if (typeof onLogoutSuccess === 'function') {
          onLogoutSuccess()
        }
      })
    } else {
      if (typeof onLogoutSuccess === 'function') {
        onLogoutSuccess()
      }
    }
  }

  /**
   * Handles logout failure.
   * @param err
   */
  onLogoutFailure (err) {
    if (typeof this.props.onLoginFailure === 'function') {
      this.props.onLoginFailure(err)
    }
  }

  render () {
    const {
      isLoaded,
      isConnected,
      isFetching
    } = this.state

    // Don’t forward unneeded props
    const originalProps = omit(this.props, [
      'appId',
      'version',
      'scope',
      'field',
      'autoCleanUri',
      'autoLogin',
      'gatekeeper',
      'getInstance',
      'onLoginFailure',
      'onLoginSuccess',
      'onLogoutFailure',
      'onLogoutSuccess',
      'provider',
      'redirect',
      'ref'
    ])
    let additionnalProps = {
      isLoaded,
      isConnected,
      isFetching
    }

    if (this.props.onLogoutFailure || this.props.onLogoutSuccess) {
      additionnalProps = {
        triggerLogout: this.logout
      }
    }

    if (!this.isStateless) {
      additionnalProps = {
        ...additionnalProps,
        ref: this.setInstance
      }
    }

    return (
      <WrappedComponent triggerLogin={this.login} {...additionnalProps} {...originalProps} />
    )
  }
}

export default SocialLogin
