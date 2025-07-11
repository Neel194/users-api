# 📊 HTTP Status Codes Used in This Project

This document lists all HTTP status codes used across the API and when they are applied.  
It follows standard REST API conventions and helps maintain consistency across all routes.

---

## ✅ Success Responses

| Code | Status             | Description                                      |
|------|--------------------|--------------------------------------------------|
| 200  | OK                 | Request succeeded — typically for GET, PUT, DELETE |
| 201  | Created            | New resource was successfully created (POST)    |
| 204  | No Content         | Success with no response body (optional on DELETE) |

---

## ⚠️ Client Errors

| Code | Status             | When Returned                                  |
|------|--------------------|-------------------------------------------------|
| 400  | Bad Request        | Validation failed (handled by Zod)             |
| 401  | Unauthorized       | No auth token present (to be added with JWT)   |
| 403  | Forbidden          | Auth token present, but access is denied       |
| 404  | Not Found          | Resource like User not found by ID             |
| 409  | Conflict           | Duplicate data (e.g., existing email)          |

---

## 🔥 Server Errors

| Code | Status             | When Returned                                  |
|------|--------------------|-------------------------------------------------|
| 500  | Internal Server Error | Unexpected errors — database crash, etc. |

---

## 🛡️ Error Handling Strategy

- All errors are handled using a centralized middleware in `middlewares/errorHandler.js`
- Controllers use:
  ```js
  const error = new Error("Message here");
  error.statusCode = 404;
  return next(error);
