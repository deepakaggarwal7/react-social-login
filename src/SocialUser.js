/** Class representing a user social account data. */
export default class SocialUser {
  /**
   * Creates a social user.
   * @param {string} provider
   */
  constructor (provider) {
    this._provider = provider

    this._profile = {
      id: undefined,
      name: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profilePicUrl: undefined,
      gender: undefined
    }

    this._token = {
      accessToken: undefined,
      expiresAt: undefined
    }
  }

  /**
   * Set provider.
   * @param {string} provider
   */
  set provider (provider) {
    this._provider = provider
  }

  /**
   * Get provider.
   * @returns {string}
   */
  get provider () {
    return this._provider
  }

  /**
   * Set profile.
   * @param {Object} profile
   */
  set profile (profile) {
    this._profile = profile
  }

  /**
   * Get profile.
   * @returns {Object}
   */
  get profile () {
    return this._profile
  }

  /**
   * Set token.
   * @param {Object} token
   */
  set token (token) {
    this._token = token
  }

  /**
   * Get token.
   * @returns {Object}
   */
  get token () {
    return this._token
  }
}
