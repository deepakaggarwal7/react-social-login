export default class SocialUser {
  constructor (provider) {
    this._provider = provider

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
    this._provider = provider
  }

  get provider () {
    return this._provider
  }

  set profile (profile) {
    this._profile = profile
  }

  get profile () {
    return this._profile
  }

  set token (token) {
    this._token = token
  }

  get token () {
    return this._token
  }
}
