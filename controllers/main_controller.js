// Methods
// GET /
function get_home(req, res) {
  res.json({ message: 'Hello World' })
}

// GET /unauthorized
function get_unauthorized(req, res) {
  res.sendStatus(401)
}

export {
  get_home,
  get_unauthorized
}
