let urlParser

if (typeof window !== 'undefined') {
  urlParser = window.document.createElement('a')
}

/**
 * Create a copy of an object, omitting provided keys.
 * @param {Object} obj Object to copy
 * @param {Array} arr Keys to omit
 * @returns {Object}
 */
export const omit = (obj, arr) => Object.keys(obj).reduce((res, key) => {
  if (arr.indexOf(key) === -1) {
    res[key] = obj[key]
  }

  return res
}, {})

export const parseAsURL = (text) => {
  if (!urlParser) {
    urlParser = window.document.createElement('a')
  }

  urlParser.href = text

  return {
    protocol: urlParser.protocol,
    hostname: urlParser.hostname,
    port: urlParser.port,
    pathname: urlParser.pathname,
    search: urlParser.search,
    hash: urlParser.hash,
    host: urlParser.host,
    toString: function () {
      return `${this.protocol}//${this.host}${this.pathname === '/' ? '' : this.pathname}${this.search}${this.hash}`
    }
  }
}

/**
 * Get key value from url query strings
 * @param {string} key Key to get value from
 * @returns {string}
 */
export const getQueryStringValue = (key) => {
  return decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
}

/**
 * Get key value from location hash
 * @param {string} key Key to get value from
 * @returns {string|null}
 */
export const getHashValue = (key) => {
  const matches = window.location.hash.match(new RegExp(`${key}=([^&]*)`))

  return matches ? matches[1] : null
}

export const cleanLocation = () => {
  if (!window.history || !window.history.pushState) {
    return
  }

  const { protocol, host, pathname, search, hash } = window.location

  const cleanedHash = /access_token/.test(hash) ? '' : hash || ''
  let cleanedSearch = search.split('&').reduce((acc, keyval, i) => {
    const del = /rslCallback=/.test(keyval) ||
      /code=/.test(keyval) ||
      /state=/.test(keyval) ||
      /error=/.test(keyval) ||
      /error_reason=/.test(keyval)

    if (i === 0 && del) {
      return '?'
    } else if (i === 0) {
      return keyval
    } else if (del) {
      return acc
    }

    return `${acc}&${keyval}`
  }, '')

  cleanedSearch = cleanedSearch === '?' ? '' : cleanedSearch

  window.history.pushState({
    html: document.body.innerHTML,
    pageTitle: document.title
  }, '', `${protocol}//${host}${pathname}${cleanedSearch}${cleanedHash}`)

  return true
}

export const rslError = (errorObject) => {
  const error = []

  error.push(`[${errorObject.provider}][${errorObject.type}] ${errorObject.description}`)

  if (errorObject.error) {
    error.push(JSON.stringify(errorObject.error, null, 2))
  }

  return Error(error.join('\n\nORIGINAL ERROR: '))
}

export const timestampFromNow = (duration) => {
  const expiresAt = new Date()

  return expiresAt.setSeconds(expiresAt.getSeconds() + duration)
}
