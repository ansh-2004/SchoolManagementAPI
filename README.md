# School Management API

A RESTful API built with **Node.js, Express, and MySQL** to manage school data.
The API allows users to add schools and retrieve a list of schools sorted by proximity to a user’s location.

This project was developed as part of a backend assignment.

---

## Live API

Base URL:

https://schoolmanagementapi-ez1x.onrender.com

Example endpoint:

GET /api/listSchools?latitude=28.61&longitude=77.20

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **mysql2**
* **Postman (API testing)**
* Deployment:

  * Backend: Render
  * Database: Railway

---

## Features

* Add new schools to the database
* Retrieve schools sorted by distance from a given location
* Distance calculation based on latitude and longitude
* Input validation for API requests
* Cloud deployment with a hosted database

---

## Project Structure

```
school-management-api
│
├── controllers
│   └── schoolController.js
│
├── routes
│   └── schoolRoutes.js
│
├── db.js
├── index.js
├── package.json
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/ansh-2004/SchoolManagementAPI.git
cd SchoolManagement
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the root folder.

Example:

```
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_USER=your_database_user
PORT=3000
SQL_PORT=your_database_port

```

### 4. Run the server

```bash
npm start
```

Server will start at:

```
http://localhost:3000
```

---

## Database Schema

Create the following table in your MySQL database:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---

## API Endpoints

### 1. Add School

Adds a new school to the database.

Endpoint:

```
POST /api/addSchool
```

Example Request Body:

```json
{
  "name": "City Public School",
  "address": "Sector 62, Noida",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

Example Response:

```json
{
  "message": "School added successfully"
}
```

---

### 2. List Schools

Returns a list of schools sorted by distance from the user’s location.

Endpoint:

```
GET /api/listSchools
```

Query Parameters:

| Parameter | Description    |
| --------- | -------------- |
| latitude  | User latitude  |
| longitude | User longitude |

Example Request:

```
GET /api/listSchools?latitude=28.61&longitude=77.20
```

Example Response:

```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "dist": 12.45
  }
]
```

---

## Distance Calculation

Distance between the user's location and school location is calculated using geographic coordinates (latitude and longitude).
Schools are then sorted in ascending order based on distance.

---

## Testing the API

The API was tested using Postman.

Steps:

1. Import the provided Postman collection
2. Test the endpoints:

   * POST `/api/addSchool`
   * GET `/api/listSchools`

---

## Deployment

Backend deployed on:

Render

Database hosted on:

Railway

This ensures the API is publicly accessible and connected to a cloud database.

