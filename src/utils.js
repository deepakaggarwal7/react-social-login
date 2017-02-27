export const omit = (obj, arr) => Object.keys(obj).reduce((res, key) => {
  if (arr.indexOf(key) === -1) {
    res[key] = obj[key]
  }

  return res
}, {})
