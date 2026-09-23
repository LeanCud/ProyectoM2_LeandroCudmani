# Blog API

https://proyectom2leandrocudmani-production.up.railway.app/api-docs/

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones de un blog.

La API permite crear, consultar, actualizar y eliminar autores y posts. También incluye documentación interactiva mediante Swagger UI.

## Tecnologías

- Node.js
- Express 5
- PostgreSQL
- Vitest y Supertest
- OpenAPI y Swagger UI

## Requisitos

- Node.js 18 o superior
- PostgreSQL 14 o superior
- Git

## Ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/LeanCud/ProyectoM2_LeandroCudmani.git
cd ProyectoM2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

Crear una base de datos PostgreSQL, por ejemplo:

```sql
CREATE DATABASE blog;
```

Luego ejecutar el script que crea las tablas `authors` y `posts`:

```bash
psql -U postgres -d blog -f src/db/setup.sql
```

También puede ejecutarse el contenido de `src/db/setup.sql` desde pgAdmin u otra herramienta de PostgreSQL.

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog
DB_USER=postgres
DB_PASSWORD=tu_contraseña
```

No subir `.env` al repositorio porque contiene credenciales.

### 5. Iniciar la API

```bash
npm start
```

La API quedará disponible en `http://localhost:8080`.

Para desarrollo con reinicio automático:

```bash
npm run dev
```

## Endpoints principales

- `GET /authors`
- `POST /authors`
- `GET /authors/:id`
- `PUT /authors/:id`
- `DELETE /authors/:id`
- `GET /posts`
- `POST /posts`
- `GET /posts/:id`
- `PUT /posts/:id`
- `DELETE /posts/:id`

## Tests

Los tests utilizan una base de datos separada para evitar modificar los datos de desarrollo.

Crear la base de datos de testing:

```sql
CREATE DATABASE blog_test;
```

Ejecutar el esquema en esa base:

```bash
psql -U postgres -d blog_test -f src/db/setup.sql
```

Crear `.env.test` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_test
DB_USER=postgres
DB_PASSWORD=tu_contraseña
```

Ejecutar los tests:

```bash
npm test
```

Ejecutarlos una sola vez, sin modo watch:

```bash
npx vitest run
```

Generar el reporte de cobertura:

```bash
npm run test:coverage
```

Los tests limpian las tablas y cargan datos de prueba antes de cada caso. Por eso debe utilizarse una base de datos exclusiva para testing.

## Documentación OpenAPI

La especificación OpenAPI se encuentra en `src/docs/openapi.yaml`.

Con la API iniciada, abrir Swagger UI en:

```text
http://localhost:8080/api-docs
```

Desde Swagger UI se pueden consultar los endpoints y probar las operaciones de la API.

## Repositorio

[Ver repositorio en GitHub](https://github.com/LeanCud/ProyectoM2_LeandroCudmani)


## Registro de uso de IA

- [Prompt1](<prompt 1-1.png>)
- [Respuesta](respuesta1.1.png)
- [Respuesta](respuesta1.2.png)

- [Prompt2](<prompt 2.png>)
- [Respuesta](respuesta2.png)

- [Prompt3](Prompt3.png)
- [Respuesta](respuesta3.png)