module.exports = function() {
  return (req, res, next) => {
    if (req.session.authentication) {
      req.authentication = req.session.authentication
    }

    next()
  }
}
