const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pick } = require('lodash')

const ValidationResult = require('../utils/ValidationResult')
const BaseController = require('./baseController')

class AuthenticationController extends BaseController {
  constructor(options) {
    super(options)
  }

  async getLogin() {
    this.renderPage('authentication/login', { validationMessage: null })
  }

  async postLogin() {
    const jwtSecret = this.app.get('jwtSecret')
    const { email, password } = this.request.body

    const user = await this.models.users.findOne({ where: { email } })

    if (!user) {
      return this.renderPage('authentication/login', {
        validationMessage: 'Neteisingas elektroninis paštas arba slaptažodis',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return this.renderPage('authentication/login', {
        validationMessage: 'Neteisingas elektroninis paštas arba slaptažodis',
      })
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret)

    this.response.cookie(this.app.get('jwtCookieKey'), token, { httpOnly: true }).redirect('/')
  }

  async getSignup() {
    this.renderPage('authentication/signup', { validation: ValidationResult.empty(), formData: {} })
  }

  async postSignup() {
    const jwtSecret = this.app.get('jwtSecret')
    const formData = pick(this.request.body, 'firstName', 'lastName', 'email', 'password')
    const { firstName, lastName, email, password } = formData

    // Validation
    const validation = new ValidationResult()

    if (!firstName) {
      validation.add('firstName', 'Negali būti tuščias')
    }

    if (!lastName) {
      validation.add('lastName', 'Negali būti tuščias')
    }

    if (!email) {
      validation.add('email', 'Negali būti tuščias')
    }

    const sameEmailUser = await this.models.users.findOne({ where: { email } })
    if (sameEmailUser) {
      validation.add('email', 'Šitas elektroninis paštas jau yra naudojamas')
    }

    if (!password) {
      validation.add('password', 'Negali būti tuščias')
    }

    if (password.length < 6) {
      validation.add('password', 'Turi turėti 6 arba daugiau simbolių')
    }

    if (validation.isInvalid) {
      return this.renderPage('authentication/signup', { validation, formData })
    }

    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8))

    const user = await this.models.users.create({ firstName, lastName, email, password: passwordHash })

    const token = jwt.sign({ userId: user.id }, jwtSecret)

    this.response.cookie(this.app.get('jwtCookieKey'), token, { httpOnly: true }).redirect('/')
  }

  async logout() {
    this.response.clearCookie(this.app.get('jwtCookieKey')).redirect('/')
  }

  async getCurrentUser() {
    const { currentUser } = this

    if (currentUser) {
      return this.response.send(pick(currentUser, 'id', 'email', 'firstName', 'lastName'))
    }

    this.response.send({})
  }
}

module.exports = AuthenticationController
