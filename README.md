# Grocery Store App

⚠️ **This project is a work in progress.**  
The current setup may not run as expected. Frontend and backend folders are structured, but some configuration is still missing (e.g., environment variables, data connections, etc.).


## Description
This is a full-stack grocery store web application built with **React** (frontend) and **Node.js with Express** (backend). It allows users to browse products, manage a shopping cart, and place orders. 

The backend handles product data and user orders, while the frontend allows users to interact with the store interface. 

### Features:
- User authentication (Login/Signup)
- Product listing with price, quantity, and description
- Shopping cart with update and removal options
- Order placement and management
- Full CRUD functionality for store owners (manage products)
  
---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Getting Started

#### Clone the repositories:

```bash
git clone https://github.com/emosq369/frontend.git
git clone https://github.com/emosq369/backend.git
```

#### Backend Setup:
Navigate to the backend folder:

bash
Copy
cd backend

Install the required dependencies:

bash
Copy
npm install

Start the server:

bash
Copy
npm start

#### Frontend Setup:
Navigate to the frontend folder:

bash
Copy
cd frontend

Install the required dependencies:

bash
Copy
npm install

Start the frontend development server:

bash
Copy
npm start

Your application should now be live at http://localhost:3000 (or whichever port your frontend is set to).


## API Endpoints (Backend)
GET /api/products - Retrieve all products

POST /api/orders - Create a new order

GET /api/orders - Retrieve all orders (Admin only)

GET /api/products/:id - Get a single product details

POST /api/products - Add a new product (Admin only)

PUT /api/products/:id - Update an existing product (Admin only)

DELETE /api/products/:id - Delete a product (Admin only)

## Contributing
If you'd like to contribute to this project, follow these steps:

Fork the repository

Create a new branch (git checkout -b feature-branch)

Commit your changes (git commit -am 'Add new feature')

Push the branch (git push origin feature-branch)

Create a new Pull Request

## Acknowledgments
Benjy (@Benf17) for the initial project setup and foundational contributions

Node.js, Express, and React for providing an easy-to-use development environment.

Open-source libraries and resources that made this project possible.
