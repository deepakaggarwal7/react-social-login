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

export const responseTextToObject = (text, key) => {
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
