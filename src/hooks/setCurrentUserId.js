module.exports = (field) => (context) => {
  context.data[field] = context.params.user.id
}
