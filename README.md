# 👤 User API Backend (Learning Project)

A simple Express.js based backend to manage users (without database) to practice Node fundamentals.

## Features:
- Get all users
- Add new user
- Update user
- Delete user
- Folder Structure with MVC pattern
- JSON-based Dummy in-memory data

## 🔧 Tech Stack

- Node.js
- Express.js
- JavaScript
- Postman for testing

## 📌 API Endpoints

| Method | Route            | Description       |
|--------|------------------|-------------------|
| GET    | `/api/users`     | Get all users     |
| POST   | `/api/users`     | Create user       |
| GET    | `/api/users/:id` | Get user by ID    |
| PUT    | `/api/users/:id` | Update user       |
| DELETE | `/api/users/:id` | Delete user       |

## How to Run:
```bash
npm install
node index.js
