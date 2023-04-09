import express from 'express'

// Import Controllers
import { authenticate, set_user } from '../services/auth_services.js'
import * as todo_controller from '../controllers/todos_controller.js'

// Router Creation
const router = express.Router()

// Routes
// /todos/
router.route('/')
  .get(authenticate, set_user, todo_controller.read_todos)
  .post(authenticate, set_user, todo_controller.create_todo)

router.route('/:id')
  .put(authenticate, set_user, todo_controller.edit_todo)
  .patch(authenticate, set_user, todo_controller.edit_todo)
  .delete(authenticate, set_user, todo_controller.destroy_todo)

export default router
