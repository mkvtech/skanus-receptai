const jwt = require('jsonwebtoken')

module.exports = ({ required }) => {
  return async (req, res, next) => {
    try {
      const { app } = req
      const jwtSecret = app.get('jwtSecret')

      const onFail = required ? () => res.redirect('/login') : next

      const token = req.cookies[app.get('jwtCookieKey')]

      if (!token) {
        return onFail()
      }

      const { userId } = jwt.verify(token, jwtSecret)

      const user = await app.get('sequelizeClient').models.users.findByPk(userId)

      if (!user) {
        return onFail()
      }

      req.currentUser = user

      next()
    } catch (error) {
      next(error)
    }
  }
}
