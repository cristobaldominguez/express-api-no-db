import fs from 'fs'
import crypto from 'crypto'
import { usersFilePath } from '../../config.js'
import jsonUsersData from '../users.json' assert { type: 'json' }

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
  fs.writeFileSync(usersFilePath, JSON.stringify(users), { encoding: 'utf8', flag: 'w' })

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
