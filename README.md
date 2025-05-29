# Express.js RESTful API Assignment

This project is a RESTful API built with Express.js to manage a collection of products. It features proper routing, custom middleware for logging, authentication, validation, comprehensive error handling, and advanced API features like filtering, pagination, and search.

## Getting Started

### Prerequisites
- Node.js v18 or higher  
- npm or yarn  
- Postman, Insomnia, or curl for API testing

### Installation
1. Clone your GitHub Classroom repository:  
```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-mutheeEverlyn.git
cd week-2-express-js-assignment-mutheeEverlyn
```
2. Install dependencies:  
```bash
pnpm install
```
3. Create a `.env` file based on `.env.example`:  
```
API_KEY=your-secure-api-key
PORT=3000
```
Replace `your-secure-api-key` with your chosen secret string. This key is required for API authentication.

4. Start the server:  
```bash
pnpm start
```
The server will run on `http://localhost:3000` (or the port you set in `.env`).

## Authentication

All API endpoints require a valid API key sent via the HTTP header:  
```
x-api-key: your-secure-api-key
```
Requests without this key or with an invalid key will receive a **401 Unauthorized** response.

## API Endpoints

1. Get all products  
`GET /api/products`  
Supports optional query parameters:  
- `category` — filter products by category (case-insensitive)  
- `search` — search products by name (case-insensitive)  
- `page` — page number for pagination (default: 1)  
- `limit` — number of products per page (default: 10)  

2. Get a product by ID  
`GET /api/products/:id`

3. Create a new product  
`POST /api/products`

4. Update a product  
`PUT /api/products/:id`

5. Delete a product  
`DELETE /api/products/:id`

## Middleware Summary

- Logger: Logs method, URL, and timestamp for each request  
- Authentication: Verifies API key in `x-api-key` header  
- Validation: Validates product data on POST and PUT  
- Error Handling: Sends appropriate JSON error responses

## Error Responses

| Status Code | Error Type           | Message                        |
|-------------|----------------------|--------------------------------|
| 400         | ValidationError      | Invalid product data           |
| 401         | Unauthorized         | API key missing or invalid     |
| 404         | NotFoundError        | Product not found              |
| 500         | InternalServerError  | Something went wrong           |

## Environment Variables (.env)

```
API_KEY=your-secure-api-key
PORT=3000
```