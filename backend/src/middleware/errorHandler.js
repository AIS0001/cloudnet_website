function notFound(req, res) {
  res.status(404).json({ success: false, error: 'Not found.' })
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ success: false, error: err.publicMessage || 'Something went wrong. Please try again.' })
}

module.exports = { notFound, errorHandler }
