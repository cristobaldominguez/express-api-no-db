# ToDo Server

## EndPoints
### Usuarios
#### Creación de usuarios
Endpoint: POST `/auth/signup`

Campos obligatorios:

- email
- password
- password_confirm

##### Objeto de ejemplo para enviar en el body

```
{
  firstName (string, Nombre del usuario),
  lastName (string, Apellido del usuario),
  email (string, Email del usuario),
  password (string, Constraseña del usuario)
}
```

#### Inicio de Sesión
Endpoint: POST `/auth/login`

Campos obligatorios:

- email
- password

##### Objeto de ejemplo para enviar en el body

```
{
  email (string, Email del usuario),
  password (string, Constraseña del usuario)
}
```

### ToDos

#### listado de todos los ToDo
Endpoint: GET `/todos/`

No es necesario enviar nada más, solo la petición sin contenido.


#### Creación de un ToDo
Endpoint: POST `/todos/`

Campos obligatorios:

- content

##### Objeto de ejemplo para enviar en el body

```
{
  id (string, identificador),
  content (string, contenido del ToDo),
  done (boolean, si se ha realizado o no),
  createdAt (number (timestamp), fecha en que fue creado el Todo),
  updatedAt (number (timestamp), fecha en que fue editado el Todo),
  userId  (number, referencia al id del usuario dueño del ToDo)
}
```

#### Edición de un ToDo
Endpoint: PUT `/todos/:id`

Estructura de la URL (es obligatorio que en la URL aparezca el id del ToDo)

- http://localhost:3000/todos/5e709d7e-5f81-42d4-8a34-0a032dc20b1f

Campos obligatorios:

- content

##### Objeto de ejemplo para enviar en el body

```
{
  id (string, identificador),
  content (string, contenido del ToDo),
  done (boolean, si se ha realizado o no),
  createdAt (number (timestamp), fecha en que fue creado el Todo),
  updatedAt (number (timestamp), fecha en que fue editado el Todo),
  userId  (number, referencia al id del usuario dueño del ToDo)
}
```

#### Eliminación de un ToDo
Endpoint: DELETE `/todos/:id`

Estructura de la URL (es obligatorio que en la URL aparezca el id del ToDo)

- http://localhost:3000/todos/5e709d7e-5f81-42d4-8a34-0a032dc20b1f

