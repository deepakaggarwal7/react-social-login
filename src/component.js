import PropTypes from 'prop-types'
import React, { Component } from 'react'

import sdk from './sdk'
import SocialUser from './SocialUser'

export default class SocialLogin extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    callback: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.node
    ]).isRequired,
    provider: PropTypes.oneOf([
      'facebook',
      'google',
      'linkedin'
    ]).isRequired,
    version: PropTypes.string
  }

  static defaultProps = {
    version: '2.8'
  }

  constructor (props) {
    super(props)

    this.id = 'sl' + Math.floor(Math.random() * 0xFFFF)

    this.handleSocialLoginInvokeSuccess = this.handleSocialLoginInvokeSuccess.bind(this)
    this.handleSocialLoginInvokeFailure = this.handleSocialLoginInvokeFailure.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSocialLoginInvokeSuccess (res) {
    const { callback, provider } = this.props

    // console.log(res)  // Uncomment to check response coming from provider in log

    const user = new SocialUser()
    let userProfile
    let token

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
          idToken: authResponse.id_token,
          scope: authResponse.scope,
          expiresIn: authResponse.expires_in,
          firstIssued_at: authResponse.first_issued_at,
          expiresAt: authResponse.expires_at
        }

        break
      case 'facebook':
        userProfile = {
          id: res.id,
          name: res.name,
          firstName: res.first_name,
          lastName: res.last_name,
          email: res.email,
          profilePicURL: res.picture.data.url
        }
        token = {
          accessToken: res.authResponse.accessToken,
          expiresAt: res.authResponse.expiresIn
        }

        break
      case 'linkedin':
        userProfile = {
          id: window.IN.ENV.auth.member_id,
          name: `${res.values[0].firstName} ${res.values[0].lastName}`,
          firstName: res.values[0].firstName,
          lastName: res.values[0].lastName,
          email: res.values[0].emailAddress,
          profilePicURL: res.values[0].pictureUrl
        }
        token = {
          accessToken: undefined // Couldn't find a way to fetch token
        }

        const expiresIn = new Date()

        expiresIn.setSeconds(expiresIn.getSeconds() + window.IN.ENV.auth.oauth_expires_in)
        user.token.expiresAt = expiresIn

        break
      default:
        throw new Error(`Provider ’${provider}’ isn’t supported.`)
    }

    user.provider = provider
    user.profile = userProfile
    user.token = token

    callback(user, null)
  }

  handleSocialLoginInvokeFailure (err) {
    this.props.callback(null, err)
  }

  handleLogin (e, obj) {
    const { appId, provider, version } = this.props
    const handleSuccess = this.handleSocialLoginInvokeSuccess

    if (provider === 'facebook') {
      window.FB.init({
        appId,
        xfbml: true,
        version: `v${version}`
      })

      // Invoke Facebook Login
      window.FB.login((response) => {
        const loginResponse = response

        window.FB.api('/me', { fields: 'email,name,id,first_name,last_name,picture' }, (profileResponse) => {
          Object.assign(profileResponse, loginResponse)

          handleSuccess(profileResponse)
        })
      }, { scope: 'email' })
    } else if (provider === 'linkedin') {
      window.IN.User.authorize((data) => {
        window.IN.API.Profile('me').fields([
          'id',
          'firstName',
          'lastName',
          'pictureUrl',
          'publicProfileUrl',
          'emailAddress'
        ]).result((profile) => {
          handleSuccess(profile)
        }).error((err) => {
          this.handleSocialLoginInvokeFailure(err)
        })
      })
    }
  }

  componentDidMount () {
    const appId = this.props.appId

    if (this.props.provider === 'google') {
      sdk.google.oldLoad(appId, this.id, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure)
    } else if (this.props.provider === 'facebook') {
      sdk.facebook.oldLoad(appId)
    } else if (this.props.provider === 'linkedin') {
      sdk.linkedin.oldLoad(appId)
    }
  }

  getProfile () {
    window.IN.API.Profile('me').fields([
      'id',
      'firstName',
      'lastName',
      'pictureUrl',
      'publicProfileUrl',
      'emailAddress'
    ]).result(function (profile) {
      alert(profile)
    })
  }

  render () {
    return (
      <div id={this.id} onClick={this.handleLogin}>{this.props.children}</div>
    )
  }
}
