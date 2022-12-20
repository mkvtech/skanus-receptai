class ValidationResult {
  static valid() {
    return ValidationResult.empty()
  }

  static empty() {
    return new ValidationResult({})
  }

  static fromSequelize(sequelizeError) {
    return new ValidationResult(
      sequelizeError.errors.reduce((obj, error) => {
        const field = error.path

        if (!obj[field]) {
          obj[field] = []
        }

        obj[field].push(error.message)

        return obj
      }, {})
    )
  }

  constructor(fieldToMessagesMap) {
    this.byField = fieldToMessagesMap ?? {}
  }

  get isValid() {
    return Object.values(this.byField).every((errors) => !errors.length)
  }

  get isInvalid() {
    return !this.isValid
  }

  get allErrorsLength() {
    return Object.values(this.byField).reduce((sum, errors) => sum + errors.length, 0)
  }

  isFieldValid(field) {
    return !this.isFieldInvalid(field)
  }

  isFieldInvalid(field) {
    return this.byField[field] && this.byField[field].length
  }

  getFieldErrors(field) {
    return this.byField[field] || []
  }

  add(field, error) {
    if (!this.byField[field]) {
      this.byField[field] = []
    }

    this.byField[field].push(error)
  }
}

module.exports = ValidationResult
