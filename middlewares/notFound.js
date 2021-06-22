const createError = require("http-errors")

const notFound = (req, res, next) => {
  next(createError(404, 'Requested URL is not correct.'))
}

module.exports = notFound