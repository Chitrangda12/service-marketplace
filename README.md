#  Service Marketplace

A full-stack service marketplace platform where users can explore services, book them, and leave reviews after completion.

---

##  Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Frontend (In Progress )
- React.js

---

## Features

- JWT-based authentication
- Role-based authorization for users and providers
- Provider service creation and service listing
- Booking system with status management
- Review and rating system after completed bookings
- Trust Score calculation based on rating, completed bookings, and service activity
- Secure environment configuration using `.env`

---

## Project Structure
/backend
├── controllers
├── models
├── routes
├── middleware
├── config
└── server.js
/frontend (coming soon)


## Installation & Setup

### 1. Clone the repository
    ```bash
    git clone <repository-url>

### 2. Install backend dependencies
    ```bash
    cd backend
    npm install

### 3. Create `.env` file
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret_key

### 4. Run backend server
    ```bash
    npm run dev


##  API Endpoints (Sample)
### Auth
- POST `/api/users/register`
- POST `/api/users/login`
### Services
- GET `/api/services`
- POST `/api/services`
### Bookings
- POST `/api/bookings`
- PUT `/api/bookings/:id`
### Reviews
- POST `/api/reviews`
- GET `/api/reviews/:serviceId`
