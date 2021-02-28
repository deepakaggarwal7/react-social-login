export default promise => {
  let hasCanceled_ = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val =>
        hasCanceled_
          ? reject(new Error({ isCanceled: true }))
          : resolve(val)
    )
    promise.catch(
      error =>
        hasCanceled_
          ? reject(new Error({ isCanceled: true }))
          : reject(error)
    )
  })

  return {
    promise: wrappedPromise,
    cancel () {
      hasCanceled_ = true
    }
  }
}
