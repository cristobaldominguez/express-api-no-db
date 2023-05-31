import crypto from 'crypto'
import User from '../Models/User.js'

// User Creation
function create_user({ firstName, lastName, email, password }) {
  const user = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    password
  }

  User.add(user)
  return user
}

function get_user_by(obj) {
  const user = User.find(usr => Object.keys(obj).every(param => usr[param] === obj[param]))
  if (!user) return null

  return user
}

export {
  create_user,
  get_user_by
}
