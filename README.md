# Storefront Backend API

A RESTful API backend for an e-commerce storefront built with Node.js, Express, TypeScript, and PostgreSQL. This API provides endpoints for managing users, products, categories, orders, and order items with JWT-based authentication.

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt with pepper and salt rounds
- **Migrations**: db-migrate
- **Testing**: Jasmine + Supertest
- **Environment Variables**: dotenv

## Project Structure

```
store-backend/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── database.ts            # PostgreSQL connection pool
│   ├── routes/                # Route definitions
│   │   ├── index.ts           # Main router
│   │   ├── usersRoutes.ts     # User endpoints
│   │   ├── categoriesRoutes.ts
│   │   ├── productsRoutes.ts
│   │   ├── ordersRoutes.ts
│   │   └── orderProductsRoutes.ts
│   ├── handlers/              # Request handlers (controllers)
│   │   ├── usersHandler.ts
│   │   ├── categoriesHandler.ts
│   │   ├── productsHandler.ts
│   │   ├── ordersHandler.ts
│   │   └── orderProductsHandler.ts
│   ├── models/                # Database models
│   │   ├── userModel.ts
│   │   ├── categoryModel.ts
│   │   ├── productModel.ts
│   │   ├── orderModel.ts
│   │   └── orderProductModel.ts
│   ├── middlewares/           # Express middlewares
│   │   └── authMiddleware.ts  # JWT authentication
│   ├── services/              # Business logic services
│   │   └── authService.ts    # JWT token generation/verification
│   ├── utils/                 # Utility functions
│   │   └── hash.ts           # Password hashing utilities
│   └── tests/                 # Test suites
│       ├── models/            # Model tests
│       │   ├── userModelSpec.ts
│       │   ├── categoryModelSpec.ts
│       │   ├── productModelSpec.ts
│       │   ├── orderModelSpec.ts
│       │   └── orderProductModelSpec.ts
│       ├── handlers/          # Handler/endpoint tests
│       │   ├── usersHandlerSpec.ts
│       │   ├── categoriesHandlerSpec.ts
│       │   ├── productsHandlerSpec.ts
│       │   ├── ordersHandlerSpec.ts
│       │   └── orderProductsHandlerSpec.ts
│       └── helpers/           # Test helpers
├── migrations/                 # Database migrations
│   ├── sqls/
│   │   ├── 001_create_users.up.sql
│   │   ├── 002_create_categories.up.sql
│   │   ├── 003_create_products.up.sql
│   │   ├── 004_create_orders.up.sql
│   │   └── 005_create_order_products.up.sql
│   └── 20251127150000-init-tables.js
├── dist/                      # Compiled JavaScript (generated)
├── spec/                      # Jasmine configuration
├── package.json
├── tsconfig.json
├── jasmine.json
├── database.json              # db-migrate configuration
└── .env                       # Environment variables (create this)
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- PostgreSQL (v12 or higher)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd store-backend
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Create environment file:**
   Create a `.env` file in the project root with the following variables:
   ```env
   # Database Configuration
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=store_dev
   POSTGRES_TEST_DB=store_test
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password

   # Security
   BCRYPT_PASSWORD=your-pepper-string-here
   SALT_ROUNDS=10
   TOKEN_SECRET=your-super-secret-jwt-key-here

   # Application
   NODE_ENV=development
   PORT=3000
   ```

4. **Create databases:**
   Connect to PostgreSQL and create the development and test databases:
   ```sql
   CREATE DATABASE store_dev;
   CREATE DATABASE store_test;
   ```

5. **Run migrations:**
   ```bash
   yarn migrate
   ```
   This will create all necessary tables in the development database.

6. **Start the server:**
   ```bash
   yarn start
   ```
   The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Scripts

The following scripts are available in `package.json`:

- **`yarn start`** - Start the server using ts-node (runs TypeScript directly)
- **`yarn watch`** - Start the server in watch mode (auto-rebuilds and restarts on file changes)
- **`yarn migrate`** - Run database migrations (applies all pending migrations)
- **`yarn rollback`** - Rollback the last migration
- **`yarn test`** - Run Jasmine test suite
- **`yarn tsc`** - Compile TypeScript to JavaScript (outputs to `dist/`)

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

### Users

#### Sign Up (Public)
```http
POST /users/signup
Content-Type: application/json

{
  "first_name": "raghad",
  "last_name": "taq",
  "email": "raghad@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": 1,
  "first_name": "raghad",
  "last_name": "taq",
  "email": "raghad@example.com"
}
```

#### Login (Public)
```http
POST /users/login
Content-Type: application/json

{
  "email": "raghad@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get All Users (Protected)
```http
GET /users
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "first_name": "raghad",
    "last_name": "taq",
    "email": "raghad@example.com"
  }
]
```

#### Get User by ID (Protected)
```http
GET /users/:id
Authorization: Bearer <token>
```

#### Update User (Protected)
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "first_name": "Eng.Raghad",
  "last_name": "TAQ",
  "email": "raghadtaq29@example.com"
}
```

#### Delete User (Protected)
```http
DELETE /users/:id
Authorization: Bearer <token>
```

---

### Categories

#### Create Category (Protected)
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Electronics"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Electronics"
}
```

#### Get All Categories (Public)
```http
GET /categories
```

#### Get Category by ID (Public)
```http
GET /categories/:id
```

#### Update Category (Protected)
```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Category"
}
```

#### Delete Category (Protected)
```http
DELETE /categories/:id
Authorization: Bearer <token>
```

---

### Products

#### Create Product (Protected)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category_id": 1
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": "999.99",
  "category_id": 1
}
```

#### Get All Products (Public)
```http
GET /products
```

#### Get Product by ID (Public)
```http
GET /products/:id
```

#### Update Product (Protected)
```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 1099.99,
  "category_id": 1
}
```

#### Delete Product (Protected)
```http
DELETE /products/:id
Authorization: Bearer <token>
```

---

### Orders

#### Create Order (Protected)
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active"
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "status": "active"
}
```

**Note:** The `user_id` is automatically extracted from the JWT token.

#### Get All Orders (Protected)
```http
GET /orders
Authorization: Bearer <token>
```

#### Get Order by ID (Protected)
```http
GET /orders/:id
Authorization: Bearer <token>
```

#### Get Orders by User (Protected)
```http
GET /orders/user/:userId
Authorization: Bearer <token>
```

#### Get Active Order for User (Protected)
```http
GET /orders/user/:userId/active
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "status": "active"
}
```

#### Update Order Status (Protected)
```http
PUT /orders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "complete"
}
```

#### Delete Order (Protected)
```http
DELETE /orders/:id
Authorization: Bearer <token>
```

---

### Order Products

#### Add Product to Order (Protected)
```http
POST /order-products
Authorization: Bearer <token>
Content-Type: application/json

{
  "order_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "id": 1,
  "order_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

#### Get Items in Order (Protected)
```http
GET /order-products/order/:orderId
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "order_id": 1,
    "product_id": 1,
    "quantity": 2
  }
]
```

#### Get Order Product by ID (Protected)
```http
GET /order-products/:id
Authorization: Bearer <token>
```

#### Update Order Product Quantity (Protected)
```http
PUT /order-products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Remove Product from Order (Protected)
```http
DELETE /order-products/:id
Authorization: Bearer <token>
```

---

## Authentication Guide

### How to Use JWT Tokens

1. **Get a token** by logging in:
   ```http
   POST /users/login
   ```
   Copy the `token` from the response.

2. **Include the token** in subsequent requests:
   ```
   Authorization: Bearer <your-token-here>
   ```

### Using Postman

1. After logging in, copy the token from the response.
2. Go to the **Authorization** tab in Postman.
3. Select **Bearer Token** from the Type dropdown.
4. Paste your token in the Token field.
5. All requests will now include the token automatically.

### Token Expiration

Tokens expire after 6 hours. If you receive a 401 Unauthorized error, log in again to get a new token.

---

## Database Schema

### Entity Relationship Diagram (Text-based)

```
┌─────────────┐
│   users     │
├─────────────┤
│ id (PK)     │
│ first_name  │
│ last_name   │
│ email (UK)  │
│ password    │
│ created_at  │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐
│   orders    │
├─────────────┤
│ id (PK)     │
│ user_id(FK) │──┐
│ status      │  │
│ created_at  │  │
└──────┬──────┘  │
       │         │
       │ 1:N     │
       │         │
┌──────▼─────────▼─┐
│ order_products   │
├──────────────────┤
│ id (PK)          │
│ order_id (FK)    │
│ product_id (FK)  │──┐
│ quantity         │  │
└──────────────────┘  │
                      │
┌─────────────────────┘
│
│ N:1
│
┌──────▼──────┐      ┌─────────────┐
│  products   │      │ categories  │
├─────────────┤      ├─────────────┤
│ id (PK)     │      │ id (PK)     │
│ name        │      │ name (UK)   │
│ description │      └──────┬──────┘
│ price       │             │
│ category_id │─────────────┘
│ created_at  │    N:1
└─────────────┘
```

### Tables

#### users
- `id` (SERIAL PRIMARY KEY)
- `first_name` (VARCHAR(100) NOT NULL)
- `last_name` (VARCHAR(100) NOT NULL)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `password` (VARCHAR(255) NOT NULL)
- `created_at` (TIMESTAMP DEFAULT NOW())

#### categories
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(100) UNIQUE NOT NULL)

#### products
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `description` (TEXT)
- `price` (NUMERIC(10,2) NOT NULL)
- `category_id` (INTEGER REFERENCES categories(id) ON DELETE SET NULL)
- `created_at` (TIMESTAMP DEFAULT NOW())

#### orders
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users(id) ON DELETE CASCADE)
- `status` (VARCHAR(50) DEFAULT 'active')
- `created_at` (TIMESTAMP DEFAULT NOW())

#### order_products
- `id` (SERIAL PRIMARY KEY)
- `order_id` (INTEGER REFERENCES orders(id) ON DELETE CASCADE)
- `product_id` (INTEGER REFERENCES products(id) ON DELETE CASCADE)
- `quantity` (INTEGER NOT NULL CHECK (quantity > 0))

### Relationships

- **users** → **orders**: One-to-many (CASCADE delete)
- **orders** → **order_products**: One-to-many (CASCADE delete)
- **products** → **order_products**: One-to-many (CASCADE delete)
- **categories** → **products**: One-to-many (SET NULL on delete)

---

## Testing

### Running Tests

1. **Set test environment:**
   ```bash
   # Windows PowerShell
   $env:NODE_ENV="test"

   ```

2. **Run all tests:**
   ```bash
   yarn test
   ```

### Test Structure

Tests are organized into:
- **Model tests** (`src/tests/models/`): Test database operations
- **Handler tests** (`src/tests/handlers/`): Test API endpoints

### Test Database

Tests use a separate database (`POSTGRES_TEST_DB`) to avoid affecting development data. Ensure:
- The test database exists
- Migrations have been run on the test database
- `NODE_ENV=test` is set when running tests

---

