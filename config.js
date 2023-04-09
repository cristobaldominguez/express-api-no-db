import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// dotEnv Config
dotenv.config()

const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const redirect = {
  after: {
    login: '/',
    logout: '/',
    signup: '/',
  },
  for_unauthorized: '/auth/login'
}

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))

const usersFilePath = path.join(root, '/db/users.json')
const toDosFilePath = path.join(root, '/db/todos.json')

export { 
  port,
  root,
  redirect,
  email_regex,
  usersFilePath,
  toDosFilePath
}
