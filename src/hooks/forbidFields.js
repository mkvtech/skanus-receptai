const feathersErrors = require('@feathersjs/errors')

module.exports =
  (...fields) =>
  (context) => {
    const errors = []

    fields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(context.data, field)) {
        errors.push({
          field,
          message: 'is not allowed',
        })
      }
    })

    if (errors.length !== 0) {
      throw new feathersErrors.BadRequest({ errors })
    }
  }
