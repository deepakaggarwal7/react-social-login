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

export const responseTextToObject = (text) => {
  const keyValuePairs = text.split('&')

  if (!keyValuePairs || keyValuePairs.length === 0) {
    return {}
  }

  return keyValuePairs.reduce((result, pair) => {
    const [key, value] = pair.split('=')

    result[key] = decodeURIComponent(value)

    return result
  }, {})
}

export const cleanLocation = () => {
  if (!window.history || !window.history.pushState) {
    return
  }

  const { protocol, host, pathname, search, hash } = window.location

  const cleanedHash = /access_token/.test(hash) ? '' : hash ? `#${hash}` : ''
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
