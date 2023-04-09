import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'
import CustomError from '../errors/custom_error.js'

// Import Config
import { email_regex } from '../config.js'

// DotEnv
const accessTokenSecret = process.env.SECRET_KEY

if (!accessTokenSecret) console.error('Error: No SECRET_KEY inside .env file')

// POST /auth/signup
async function post_signup(req) {
  if (!req.body.email) throw new ValidationError({ message: 'Email must to be present.', field: 'email' })
  if (!req.body.password) throw new ValidationError({ message: 'Password must to be present.', field: 'password' })
  if (!req.body.password_confirm) throw new ValidationError({ message: 'Password Confirm must to be present.', field: 'password_confirm' })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password, password_confirm, firstName, lastName } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: 'Email field have not a valid value.' }) }

  if (!(email && password)) return new AuthError({ message: 'Data not formatted properly' })
  if (password !== password_confirm) return new AuthError({ message: 'Password and password confirm fields doesn\'t match' })

  // creating a new user
  const user = { email, password, firstName, lastName }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt)

  try {
    const saved_user = create_user(user)
    return generate_token({ user: saved_user })

  } catch (err) {
    if (err.is_an_error) return req.error = err

    return new CustomError()
  }
}

// POST /auth/login
async function post_login(req) {
  if (!req.body.email) throw new ValidationError({ message: 'Email must to be present.' })
  if (!req.body.password) throw new ValidationError({ message: 'Password must to be present.' })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: 'Email field have not a valid value.' }) }

  const user = await get_user_by({ email })
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (validPassword) {
      return generate_token({ user })

    } else {
      return new AuthError({ message: 'Invalid email or password', status: 400 })
    }

  } else {
    return new AuthError({ message: 'Invalid email or password', status: 401 })
  }
}

// Middlewares
function authenticate(req, res, next) {
  // Get token
  const jwt_auth = req.headers.authorization
  const token = jwt_auth ? get_token_from_jwt(jwt_auth) : null
  if (!token) return res.send(401, 'Missing Authorization Header')

  // Verify token
  jwt.verify(token, accessTokenSecret, (err, _) => {
    if (err) return res.send(401, 'Missing Authorization Header')

    req.token = token
    next()
  })
}

function set_user(req, _, next) {
  if (!req.token) return req.user = null

  jwt.verify(req.token, accessTokenSecret, (err, user) => {
    if (err) return req.user = null

    req.user = user
    next()
  })
}

function get_token_from_jwt(bearer) {
  return bearer.split(' ')[1]
}

function generate_token({ user }) {
  const token = jwt.sign(user, accessTokenSecret)
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
    accessToken: token
  }
}

export {
  set_user,
  authenticate,
  generate_token
}

export { post_signup, post_login }
