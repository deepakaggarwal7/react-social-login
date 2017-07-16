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
