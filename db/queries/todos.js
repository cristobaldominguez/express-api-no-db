import crypto from 'crypto'
import ValidationError from '../../errors/validation_error.js'
import AccessError from '../../errors/access_error.js'
import AuthError from '../../errors/auth_error.js'
import Todo from '../Models/Todo.js'
import isEmpty from '../../helpers/is_empty.js'

async function get_todos({ from: user }) {
  return Todo.filter(todo => todo.userId === user.id)
}

async function post_todo({ user, body }) {
  if (!body.content) throw new ValidationError({ message: 'Content must to be present.', field: 'content' })

  const { content } = body
  const done = body.done === undefined ? false : body.done

  const currentDate = Date.now()
  const todo = {
    id: crypto.randomUUID(),
    content,
    done,
    createdAt: currentDate,
    updatedAt: currentDate,
    userId: user.id
  }

  Todo.add(todo)
  return todo
}

async function update_todo({ user, body, params }) {
  const { id } = params
  if (isEmpty(body)) throw new ValidationError({ message: 'To edit this ToDo, you must to provide any content.', field: 'content' })

  const todo = Todo.find(todo => todo.id === id && todo.userId === user.id)
  if (!todo) throw new AccessError({ message: 'ToDo Not Found.', status: 404 })

  const content = body.content ?? todo.content
  const done = body.done ?? todo.done

  const newTodo = {
    ...todo,
    content,
    done,
    updatedAt: Date.now()
  }

  Todo.update(newTodo)
  return newTodo
}

async function delete_todo({ user, params }) {
  const { id } = params

  const todo = Todo.find(todo => todo.id === id)
  if (todo.userId !== user.id) throw new AuthError({ message: 'not authorized to delete this task' })

  Todo.delete(todo)
  return { deleted: true, id }
}

export {
  get_todos,
  post_todo,
  update_todo,
  delete_todo
}
