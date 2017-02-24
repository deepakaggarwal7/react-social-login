import React, { Component, PropTypes } from 'react'

import config from './config'
import sdk from './sdk'

class SocialUser {
  constructor () {
    this._provider = undefined

    this._profile = {
      id: undefined,
      name: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profilePicUrl: undefined
    }

    this._token = {
      accessToken: undefined,
      expiresAt: undefined
    }
  }

  set provider (provider) {
    if (config.providers.indexOf(provider) === -1) {
      throw new Error(`Provider ’${provider}’ isn’t supported.`)
    }

    this._provider = provider
  }

  get provider () {
    return this._provider
  }

  set profile (profile) {
    const { id, firstName, lastName, email, name, profilePicURL, ...rest } = profile

    if (Object.keys(rest).length > 0) {
      const keys = Object.keys(rest).join(', ')

      console.warn(`The following keys are not supported and thus won’t be saved: ${keys}`)
    }

    this._profile = {
      id,
      name,
      firstName,
      lastName,
      email,
      profilePicURL
    }
  }

  get profile () {
    return this._profile
  }

  set token (token) {
    const { accessToken, expiresAt, ...rest } = token

    if (Object.keys(rest).length > 0) {
      const keys = Object.keys(rest).join(', ')

      console.warn(`The following keys are not supported and thus won’t be saved: ${keys}`)
    }

    this._token = {
      accessToken,
      expiresAt
    }
  }

  get token () {
    return this._token
  }
}

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
    autoLogin: true,
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
            if (authResponse.status === 'connected') {
              this.onLoginSuccess(authResponse)
            }
          })
        }
      }))
  }

  onLoginSuccess (response) {
    const { onLoginSuccess, provider } = this.props
    const user = new SocialUser()
    let userProfile
    let token

    this.setState((prevState) => ({
      ...prevState,
      isFetching: false,
      isConnected: true
    }))

    switch (provider) {
      case 'google':
        const profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
        const authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true)

        userProfile = {
          id: profile.getId(),
          name: profile.getName(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName(),
          email: profile.getEmail(),
          profilePicURL: profile.getImageUrl()
        }
        token = {
          accessToken: authResponse.access_token,
          expiresAt: authResponse.expires_at
        }

        break
      case 'facebook':
        userProfile = {
          id: response.id,
          name: response.name,
          firstName: response.first_name,
          lastName: response.last_name,
          email: response.email,
          profilePicURL: response.picture.data.url
        }
        token = {
          accessToken: response.authResponse.accessToken,
          expiresAt: response.authResponse.expiresIn
        }

        break
      case 'linkedin':
        userProfile = {
          id: window.IN.ENV.auth.member_id,
          name: `${response.values[0].firstName} ${response.values[0].lastName}`,
          firstName: response.values[0].firstName,
          lastName: response.values[0].lastName,
          email: response.values[0].emailAddress,
          profilePicURL: response.values[0].pictureUrl
        }
        token = {
          accessToken: undefined //Couldn't find a way to fetch token
        }

        const expiresAt = new Date()

        expiresAt.setSeconds(expiresAt.getSeconds() + window.IN.ENV.auth.oauth_expires_in)
        user.token.expiresAt = expiresAt

        break
      default:
        throw new Error(`Provider ’${provider}’ isn’t supported.`)
    }

    user.provider = provider
    user.profile = userProfile
    user.token = token

    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(user)
    }
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
    return (
      <WrappedComponent onClick={this.login} {...this.props} />
    )
  }
}

export default SocialLogin
