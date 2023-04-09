import * as todos_queries from "../db/queries/todos.js"

// Methods
// GET /todos/
async function read_todos(req, res) {
  const todos = await todos_queries.get_todos({ from: req.user })
  if (todos.is_an_error) throw todos

  res.status(200).json(todos)
}

// POST /todos/
async function create_todo(req, res) {
  const todo = await todos_queries.post_todo(req)
  if (todo.is_an_error) throw todo

  res.status(201).json(todo)
}

// PUT /todos/1
async function edit_todo(req, res) {
  const todo = await todos_queries.update_todo(req)
  if (todo.is_an_error) throw todo

  res.status(200).json(todo)
}

// DELETE /todos/1
async function destroy_todo(req, res) {
  const todo = await todos_queries.delete_todo(req)
  if (todo.is_an_error) throw todo

  res.status(200).json(todo)
}

export {
  read_todos,
  create_todo,
  edit_todo,
  destroy_todo
}
