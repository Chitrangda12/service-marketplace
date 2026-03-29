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

###  Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access (User / Provider)

### Services
- Providers can create and manage services
- Users can browse available services

### Booking System
- Users can book services
- Booking lifecycle:
  - Pending
  - Completed

### Reviews & Ratings
- Users can review services after completion
- Rating system (1–5 stars)
- Prevents invalid reviews

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
git clone https://github.com/Chitrangda12/service-marketplace.git

### 2. Install backend dependencies
cd backend
npm install

### 3. Create `.env` file
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

### 4. Run backend server
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
