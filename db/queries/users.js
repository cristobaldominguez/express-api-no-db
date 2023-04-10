import crypto from 'crypto'
import jsonUsersData from '../users.json' assert { type: 'json' }
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

  const users = jsonUsersData.concat(user)
  User.save(users)

  return user
}

function get_user_by(obj) {
  const user = jsonUsersData.find(usr => Object.keys(obj).every(param => usr[param] === obj[param]))
  if (!user) return null

  return user
}

export {
  create_user,
  get_user_by
}
