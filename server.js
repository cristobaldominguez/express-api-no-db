import cors from 'cors'
import dotenv from 'dotenv'
import { port } from './config.js'
import express from 'express'
import expressSanitizer from 'express-sanitizer'

// ErrorHandling
import 'express-async-errors'

// Routes
import mainRoutes from './routes/main.js'
import authRoutes from './routes/auth.js'
import todosRoutes from './routes/todos.js'

// Controllers
import { authenticate, set_user } from './services/auth_services.js'

// Middlewares
import errorMiddleware from './middlewares/error_middleware.js'
import setContentType from './middlewares/set_content_type.js'

// Helpers
import { non_existent_route } from './helpers/non_existent_route.js'
import checkValidJSON from './middlewares/check_valid_JSON_middleware.js'

// dotEnv Config
dotenv.config()

// Server
const app = express()

app.use(cors())

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Check JSON Formatting
app.use(checkValidJSON)

// express-sanitizer middleware
app.use(expressSanitizer())

// Sets Content-Type header
app.use(setContentType)

// Public Folder
app.use(express.static('public'))

// App Routes
app.use(mainRoutes)
app.use('/auth', authRoutes)
app.use('/todos', authenticate, set_user, todosRoutes)

// Redirect to 404 Page
app.get('*', non_existent_route)

app.use(errorMiddleware)

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
