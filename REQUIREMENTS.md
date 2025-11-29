# Storefront Backend - Requirements Documentation

This document describes how the Storefront Backend project fulfills each requirement from the Udacity Storefront Backend rubric.

---

## 1. API Architecture and Design

### Endpoint Structure

The API follows RESTful principles with clear separation of concerns:

- **Routing Layer** (`src/routes/`): Defines endpoint paths and HTTP methods
- **Handler Layer** (`src/handlers/`): Contains business logic and request/response handling
- **Model Layer** (`src/models/`): Handles database operations
- **Middleware** (`src/middlewares/`): Authentication and request validation

### Best Practices Implemented

#### Routing
- Routes are organized by resource (users, categories, products, orders, order-products)
- All routes are registered in `src/routes/index.ts` and mounted on the Express app
- Route modules use Express Router for modular organization

#### Controllers/Handlers
- Each handler function is exported and handles a single responsibility
- Handlers use async/await for asynchronous operations
- Error handling is consistent with try-catch blocks
- Appropriate HTTP status codes are returned (201 for creation, 404 for not found, 400 for bad requests, 401 for unauthorized, 500 for server errors)

#### Middleware
- Authentication middleware (`authMiddleware`) protects sensitive routes
- Middleware extracts and validates JWT tokens from Authorization headers
- User ID is attached to request object for use in handlers

#### Error Handling
- All handlers include try-catch blocks
- Error messages are returned in consistent JSON format: `{ error: string }` or `{ message: string }`
- Database errors are caught and returned as appropriate HTTP status codes

### Endpoints by Resource

#### Users (`/users`)
- `POST /users/signup` - Create new user (public)
- `POST /users/login` - Authenticate user (public)
- `GET /users` - Get all users (protected)
- `GET /users/:id` - Get user by ID (protected)
- `PUT /users/:id` - Update user (protected)
- `DELETE /users/:id` - Delete user (protected)

#### Categories (`/categories`)
- `POST /categories` - Create category (protected)
- `GET /categories` - Get all categories (public)
- `GET /categories/:id` - Get category by ID (public)
- `PUT /categories/:id` - Update category (protected)
- `DELETE /categories/:id` - Delete category (protected)

#### Products (`/products`)
- `POST /products` - Create product (protected)
- `GET /products` - Get all products (public)
- `GET /products/:id` - Get product by ID (public)
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

#### Orders (`/orders`)
- `POST /orders` - Create order (protected)
- `GET /orders` - Get all orders (protected)
- `GET /orders/:id` - Get order by ID (protected)
- `GET /orders/user/:userId` - Get orders by user (protected)
- `GET /orders/user/:userId/active` - Get active order for user (protected)
- `PUT /orders/:id` - Update order status (protected)
- `DELETE /orders/:id` - Delete order (protected)

#### Order Products (`/order-products`)
- `POST /order-products` - Add product to order (protected)
- `GET /order-products/order/:orderId` - Get items in an order (protected)
- `GET /order-products/:id` - Get order product by ID (protected)
- `PUT /order-products/:id` - Update order product quantity (protected)
- `DELETE /order-products/:id` - Remove product from order (protected)

---

## 2. Data Models

### Database Schema

The database consists of five main tables with proper relationships and constraints.

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `first_name`: User's first name (required)
- `last_name`: User's last name (required)
- `email`: Unique email address (required, unique constraint)
- `password`: Hashed password using bcrypt (required)
- `created_at`: Timestamp of account creation

**Constraints:**
- Primary key on `id`
- Unique constraint on `email`
- NOT NULL constraints on all required fields

#### Categories Table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `name`: Category name (required, unique)

**Constraints:**
- Primary key on `id`
- Unique constraint on `name`
- NOT NULL constraint on `name`

#### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `name`: Product name (required)
- `description`: Product description (optional)
- `price`: Product price as decimal (required)
- `category_id`: Foreign key to categories table (optional)
- `created_at`: Timestamp of product creation

**Relationships:**
- Foreign key to `categories(id)` with `ON DELETE SET NULL` (if category is deleted, product category_id becomes NULL)

**Constraints:**
- Primary key on `id`
- NOT NULL constraints on `name` and `price`
- Foreign key constraint on `category_id`

#### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `user_id`: Foreign key to users table (required)
- `status`: Order status, defaults to 'active' (required)
- `created_at`: Timestamp of order creation

**Relationships:**
- Foreign key to `users(id)` with `ON DELETE CASCADE` (if user is deleted, their orders are deleted)

**Constraints:**
- Primary key on `id`
- Foreign key constraint on `user_id`
- Default value 'active' for `status`

#### Order Products Table
```sql
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `order_id`: Foreign key to orders table (required)
- `product_id`: Foreign key to products table (required)
- `quantity`: Quantity of product in order (required, must be > 0)

**Relationships:**
- Foreign key to `orders(id)` with `ON DELETE CASCADE` (if order is deleted, order_products are deleted)
- Foreign key to `products(id)` with `ON DELETE CASCADE` (if product is deleted, order_products are deleted)

**Constraints:**
- Primary key on `id`
- Foreign key constraints on `order_id` and `product_id`
- CHECK constraint ensuring `quantity > 0`

### Relationships Summary

1. **Users → Orders**: One-to-many (one user can have many orders)
2. **Orders → Order Products**: One-to-many (one order can have many order_products)
3. **Products → Order Products**: One-to-many (one product can appear in many order_products)
4. **Categories → Products**: One-to-many (one category can have many products)

---

## 3. Security & Authentication

### JWT-Based Authentication

The project implements JSON Web Token (JWT) authentication for securing API endpoints.

#### Token Generation
- Tokens are generated in `src/services/authService.ts` using the `generateToken()` function
- Tokens include the user ID in the payload: `{ userId: number }`
- Tokens expire after 6 hours by default
- Token secret is stored in environment variable `TOKEN_SECRET`

#### Token Verification
- Middleware in `src/middlewares/authMiddleware.ts` verifies tokens on protected routes
- Middleware expects Authorization header in format: `Bearer <token>`
- Invalid or missing tokens return 401 Unauthorized
- Upon successful verification, user ID is attached to the request object as `req.userId`

#### Password Security

**Hashing Implementation:**
- Passwords are hashed using bcrypt in `src/utils/hash.ts`
- Uses a "pepper" value from environment variable `BCRYPT_PASSWORD` (added to password before hashing)
- Uses configurable salt rounds from environment variable `SALT_ROUNDS` (default: 10)
- Password comparison uses `comparePassword()` which applies the same pepper

**Security Features:**
- Passwords are never stored in plain text
- Passwords are never returned in API responses
- Pepper adds an additional layer of security beyond bcrypt hashing
- Salt rounds ensure strong hashing (10 rounds recommended)

#### Protected Routes

**Public Routes:**
- `POST /users/signup` - User registration
- `POST /users/login` - User authentication
- `GET /categories` - List all categories
- `GET /categories/:id` - Get category by ID
- `GET /products` - List all products
- `GET /products/:id` - Get product by ID

**Protected Routes (require JWT token):**
- All user management routes (GET, PUT, DELETE on `/users`)
- All category modification routes (POST, PUT, DELETE on `/categories`)
- All product modification routes (POST, PUT, DELETE on `/products`)
- All order routes (all methods on `/orders`)
- All order-product routes (all methods on `/order-products`)

---

## 4. Database Setup & Migrations

### Migration Tool: db-migrate

The project uses `db-migrate` for database version control and schema management.

#### Migration Files
- Migrations are stored in `migrations/` directory
- Each migration has an up and down SQL file in `migrations/sqls/`
- Migration files follow naming pattern: `###_description.up.sql` and `###_description.down.sql`

#### Migration Sequence
1. `001_create_users.up.sql` - Creates users table
2. `002_create_categories.up.sql` - Creates categories table
3. `003_create_products.up.sql` - Creates products table
4. `004_create_orders.up.sql` - Creates orders table
5. `005_create_order_products.up.sql` - Creates order_products table

#### Environment Configuration

**Development Database:**
- Configured in `database.json` under `dev` section
- Uses `POSTGRES_DB` environment variable (defaults to `store_dev` from database.json)
- Connection details from environment variables or database.json

**Test Database:**
- Configured in `database.json` under `test` section
- Uses `POSTGRES_TEST_DB` environment variable (defaults to `store_test` from database.json)
- Automatically selected when `NODE_ENV=test`

#### Running Migrations

**Apply Migrations:**
```bash
yarn migrate
```

**Rollback Last Migration:**
```bash
yarn rollback
```

#### Database Connection

The database connection is configured in `src/database.ts`:
- Uses `pg` (node-postgres) Pool for connection management
- Automatically selects test database when `NODE_ENV=test`
- Connection parameters from environment variables:
  - `POSTGRES_HOST`
  - `POSTGRES_PORT`
  - `POSTGRES_DB` (development)
  - `POSTGRES_TEST_DB` (testing)
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`

---

## 5. Testing

### Test Framework: Jasmine

The project uses Jasmine as the testing framework with Supertest for HTTP endpoint testing.

#### Test Configuration
- Configuration file: `jasmine.json`
- Test files location: `src/tests/`
- Test file pattern: `**/*[sS]pec.ts`
- Helpers location: `src/tests/helpers/`

#### Test Coverage

**Model Tests** (`src/tests/models/`):
- `userModelSpec.ts` - Tests for UserModel CRUD operations and authentication
- `categoryModelSpec.ts` - Tests for CategoryModel CRUD operations
- `productModelSpec.ts` - Tests for ProductModel CRUD operations
- `orderModelSpec.ts` - Tests for OrderModel CRUD operations and user-specific queries
- `orderProductModelSpec.ts` - Tests for OrderProductModel operations

**Handler Tests** (`src/tests/handlers/`):
- `usersHandlerSpec.ts` - Tests for user endpoints 
- `categoriesHandlerSpec.ts` - Tests for category endpoints
- `productsHandlerSpec.ts` - Tests for product endpoints
- `ordersHandlerSpec.ts` - Tests for order endpoints
- `orderProductsHandlerSpec.ts` - Tests for order-product endpoints

#### Running Tests

**Run All Tests:**
```bash
yarn test
```

**Test Environment:**
- Tests automatically use test database when `NODE_ENV=test`
- Test database is specified by `POSTGRES_TEST_DB` environment variable
- Tests should clean up after themselves (truncate tables or delete test data)

#### Test Structure

Each test suite typically includes:
- Setup and teardown (database cleanup)
- CRUD operation tests
- Error handling tests
- Authentication/authorization tests (for protected routes)
- Edge case tests (not found, invalid input, etc.)

---

## 6. Environmental Variables

The project uses `dotenv` to manage environment variables. All sensitive configuration is stored in a `.env` file (not committed to version control).

### Required Environment Variables

#### Database Configuration
- `POSTGRES_HOST` - PostgreSQL server hostname (default: localhost)
- `POSTGRES_PORT` - PostgreSQL server port (default: 5432)
- `POSTGRES_DB` - Development database name (e.g., `store_dev`)
- `POSTGRES_TEST_DB` - Test database name (e.g., `store_test`)
- `POSTGRES_USER` - PostgreSQL username (e.g., `postgres`)
- `POSTGRES_PASSWORD` - PostgreSQL password

#### Security Configuration
- `BCRYPT_PASSWORD` - Pepper string added to passwords before hashing (required for password security)
- `SALT_ROUNDS` - Number of bcrypt salt rounds (default: 10, recommended: 10-12)
- `TOKEN_SECRET` - Secret key for signing JWT tokens (must be strong and secret)

#### Application Configuration
- `NODE_ENV` - Environment mode: `development`, `test`
  - When set to `test`, application uses `POSTGRES_TEST_DB`
  - When not set or `development`, uses `POSTGRES_DB`
- `PORT` - Server port number (default: 3000)
- `ENV` - Alternative environment variable (can be used instead of NODE_ENV)

### Environment Variables by Context

**Required for Application:**
- `POSTGRES_HOST`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `BCRYPT_PASSWORD`
- `SALT_ROUNDS`
- `TOKEN_SECRET`
- `PORT` (optional, defaults to 3000)

**Required for Testing:**
- All application variables plus:
- `POSTGRES_TEST_DB`
- `NODE_ENV=test` (must be set to use test database)

**Optional:**
- `POSTGRES_PORT` (defaults to 5432)
- `ENV` (alternative to NODE_ENV)

### Example .env File

```env
# Database
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

---

## 7. Instructions for Reviewer

### Prerequisites

1. **Node.js and Yarn**: Ensure Node.js and Yarn are installed
2. **PostgreSQL**: PostgreSQL server must be running
3. **Database Setup**: Create development and test databases

### Step 1: Clone and Install

```bash
git clone <repository-url>
cd store-backend
yarn install
```

### Step 2: Environment Setup

Create a `.env` file in the project root with the following variables:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
BCRYPT_PASSWORD=your-pepper-string
SALT_ROUNDS=10
TOKEN_SECRET=your-jwt-secret-key
NODE_ENV=development
PORT=3000
```

### Step 3: Database Setup

**Create Databases:**
```sql
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```

**Run Migrations:**
```bash
yarn migrate
```

This will create all tables in the development database.

### Step 4: Start the Server

```bash
yarn start
```

The server will start on port 3000 (or the port specified in `PORT` environment variable).

**Alternative - Watch Mode (auto-rebuild):**
```bash
yarn watch
```

### Step 5: Run Tests

**Set Test Environment:**
```bash
# Windows PowerShell
$env:NODE_ENV="test"
```

**Run Tests:**
```bash
yarn test
```

**Note:** Ensure the test database exists and migrations have been run on it, or run migrations with `NODE_ENV=test` set.

### Step 6: Test Endpoints

#### Using Postman or Similar Tool

**1. Create a User (Signup):**
```
POST http://localhost:3000/users/signup
Content-Type: application/json

{
  "first_name": "raghad",
  "last_name": "taq",
  "email": "raghad@example.com",
  "password": "password123"
}
```

**2. Login to Get Token:**
```
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "email": "raghad@example.com",
  "password": "password123"
}
```

Response will include a `token` field. Copy this token.

**3. Use Token for Protected Routes:**
```
GET http://localhost:3000/users
Authorization: Bearer <your-token-here>
```

**4. Create a Category:**
```
POST http://localhost:3000/categories
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "name": "Electronics"
}
```

**5. Create a Product:**
```
POST http://localhost:3000/products
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category_id": 1
}
```

**6. Create an Order:**
```
POST http://localhost:3000/orders
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "status": "active"
}
```

**7. Add Product to Order:**
```
POST http://localhost:3000/order-products
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "order_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

### Testing Checklist

- [ ] Server starts successfully
- [ ] Migrations run without errors
- [ ] All tests pass
- [ ] User signup and login work
- [ ] JWT token is generated and accepted
- [ ] Protected routes require authentication
- [ ] CRUD operations work for all resources
- [ ] Database relationships are enforced
- [ ] Error handling returns appropriate status codes

---

