module.exports = function () {
  return async (req, res, next) => {
    if(!req.authentication) {
      req.authentication = {
        strategy: 'anonymous'
      }
    }

    next()
  }
}
