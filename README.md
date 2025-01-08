# KYC Pro

## Overview

**KYC Pro** is a full-stack web application designed to simulate a **Know Your Customer (KYC)** system. This application includes key features such as user registration, ID verification, and reporting functionalities tailored to compliance workflows. The system allows users to submit KYC information, and admins can review and update submission statuses.

## Live Preview

You can view the live version of this application hosted on Google Cloud App Engine.

[Live Preview](https://kyc-pro-447214.el.r.appspot.com/)

---

## Features

1. **User Registration & Authentication**:

   - Role-based access (Admin, User).
   - JWT-based authentication for secure login.
   - Client-side validation for registration and login forms.

2. **KYC Submission**:

   - Users can input their details (name, email) and upload an ID document.
   - Displays feedback on the form submission status (pending, approved, rejected).

3. **Admin Dashboard**:
   - Admins can view a list of users and their KYC statuses.
   - Approve or reject KYC submissions.
   - A KPI section displaying:
     - Total users.
     - Count of approved, rejected, and pending KYC submissions.

---

## Technology Stack

### Frontend

- **React** for building the user interface.
- **React Router** for routing.
- **JWT** for managing authentication.
- **ImageKit** for file storage and image management.

### Backend

- **Node.js** with Express for building RESTful APIs.
- **MongoDB Atlas** for cloud-based database storage.
- **JWT** for secure authentication.
- **ImageKit** for storing ID documents.

---

## Requirements

### Frontend

1. **Authentication**:

   - Implement client-side validation for forms.

2. **KYC Submission**:

   - Users can submit their KYC information (name, email, and uploaded ID).
   - Status feedback for submission (pending, approved, rejected).

3. **Admin Dashboard**:
   - Table with users' details and KYC statuses.
   - Approve/Reject buttons with status updates.

---

### Backend

1. **Authentication and Authorization**:

   - JWT for secure authentication.
   - Role-based access control for admin functionalities.

2. **KYC Management**:

   - API endpoints for submitting and retrieving user KYC data.
   - Admins can update KYC statuses.

3. **Database**:

   - MongoDB (using MongoDB Atlas).

4. **File Storage**:
   - Use **ImageKit** for storing uploaded ID documents.

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/yourusername/kyc-pro.git
cd kyc-pro
```

### 2. Install Dependencies

To install dependencies for both the frontend and backend, use the following npm script:

```
npm run install:all
```

### 3. Frontend Setup

- Navigate to the frontend folder in your project directory.
- Create a .env file and add the following:

```
REACT_APP_API_ENDPOINT=your_backend_endpoint
PUBLIC_URL=your_public_url
```

- To start the frontend React app:

```
npm run start:frontend
```

### 4. Backend Setup

- Navigate to the backend folder in your project directory.
- Create a .env file and add the following:

```
DB_URL=mongodb://your_mongo_db_url
JWT_SECRET=your_jwt_secret_key
SALT_ROUNDS=10
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
FRONTEND_URL=http://localhost:3000

```

- To start the backend server:

```
npm run start:backend
```

## Admin Dashboard Credentials

To test the admin dashboard, use the following credentials:

- Email: admin@kycpro.com
- Password: Password@123

## Environment Variables

Frontend `.env` Variables

```
REACT_APP_API_ENDPOINT: The API endpoint for the backend.
PUBLIC_URL: The public URL of the frontend.
```

Backend `.env` Variables

```
DB_URL: URL to connect to the MongoDB database.
JWT_SECRET: Secret key for JWT authentication.
SALT_ROUNDS: Salt rounds for password hashing.
IMAGEKIT_PUBLIC_KEY: ImageKit public key for uploading images.
IMAGEKIT_PRIVATE_KEY: ImageKit private key for accessing the storage.
IMAGEKIT_URL_ENDPOINT: The ImageKit URL endpoint.
FRONTEND_URL: The URL of the frontend app (e.g., http://localhost:3000).
```

## License

This project is licensed under the MIT License.
