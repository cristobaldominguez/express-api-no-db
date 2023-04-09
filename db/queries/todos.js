import fs from 'fs'
import crypto from 'crypto'
import jsonTodosData from '../todos.json' assert { type: 'json' }
import ValidationError from '../../errors/validation_error.js'
import { toDosFilePath } from '../../config.js'
import AccessError from '../../errors/access_error.js'
import AuthError from '../../errors/auth_error.js'

async function get_todos({ from: user }) {
  return jsonTodosData.filter(todo => todo.userId === user.id)
}

async function post_todo({ user, body }) {
  if (!body.content) throw new ValidationError({ message: 'Content must to be present.', field: 'content' })

  const { content } = body
  const done = body.done === undefined ? false : body.done

  const todo = {
    id: crypto.randomUUID(),
    content,
    done,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userId: user.id
  }

  const todos = jsonTodosData.concat(todo)
  fs.writeFileSync(toDosFilePath, JSON.stringify(todos), { encoding: 'utf8', flag: 'w' })

  return todo
}

async function update_todo({ user, body, params }) {
  const { id } = params
  if (!body.content) throw new ValidationError({ message: 'Content must to be present.', field: 'content' })

  const todo = jsonTodosData.find(todo => todo.id === id && todo.userId === user.id)
  if (!todo) throw new AccessError({ message: 'ToDo Not Found.', status: 404 })

  const { content } = body
  const done = body.done === undefined ? false : body.done

  const newTodo = {
    ...todo,
    content,
    done,
    updatedAt: Date.now()
  }

  const index = jsonTodosData.findIndex(todo => todo.id === id)
  jsonTodosData[index] = newTodo
  fs.writeFileSync(toDosFilePath, JSON.stringify(jsonTodosData), { encoding: 'utf8', flag: 'w' })

  return newTodo
}

async function delete_todo({ user, params }) {
  const { id } = params

  const todo = jsonTodosData.find(todo => todo.id === id)
  if (todo.userId !== user.id) throw new AuthError({ message: 'not authorized to delete this task' })

  const todos = jsonTodosData.filter(todo => todo.id !== id)
  fs.writeFileSync(toDosFilePath, JSON.stringify(todos), { encoding: 'utf8', flag: 'w' })

  return { deleted: true, id }
}

export {
  get_todos,
  post_todo,
  update_todo,
  delete_todo
}
