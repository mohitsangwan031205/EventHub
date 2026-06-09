# EventHub - Event and Media Management Platform

## Live Demo

🌐 Frontend: https://event-hub-coral-iota.vercel.app

⚙️ Backend API: https://eventhub-9am8.onrender.com

📂 GitHub Repository: https://github.com/mohitsangwan031205/EventHub

---

## Overview

EventHub is a full-stack MERN-based Event and Media Management Platform designed to simplify event organization, media sharing, and user interaction. The platform enables users to create and manage events, upload and organize event media, interact through likes and comments, receive notifications, and securely manage content through role-based access control.

The application integrates MongoDB Atlas for database management, Cloudinary for cloud-based media storage, and modern deployment solutions using Vercel and Render.

---

## Features

### Event Management

* Create new events
* View event details
* Edit existing events
* Delete events
* Event categorization
* Event location and date management

### Media Management

* Upload event images
* Bulk image upload support
* Drag and drop image upload
* Image preview before upload
* Public and private media visibility
* Cloudinary image storage
* Bulk media deletion
* Media gallery for every event

### User Interaction

* Like images
* Comment on images
* Favorite images
* Dedicated Favorites page
* Share media functionality

### Notifications

* Real-time notification system
* Notifications for likes
* Notifications for comments
* Read/unread notification tracking

### Security & Access Control

* JWT Authentication
* User registration and login
* Protected routes
* Role-based authorization
* Admin dashboard
* User role management
* Manage users functionality

### Download Features

* Download event images
* Watermarked image downloads
* Dynamic watermark containing user and event information

### UI & User Experience

* Responsive design
* Modern card-based layout
* Interactive gallery
* Hover effects and animations
* Clean navigation system
* Mobile-friendly interface

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Cloud Services

* Cloudinary

### Authentication

* JSON Web Tokens (JWT)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
EventHub
│
├── client
│   ├── src
│   ├── public
│   └── vite.config.js
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── app.js
│
└── README.md
```

---

## Database Models

* User
* Event
* Media
* Like
* Comment
* Favorite
* Notification

---

## Core Functionalities

### Authentication System

* Secure user registration
* User login
* JWT token generation
* Protected API endpoints

### Event Media Workflow

1. User creates an event
2. User uploads media files
3. Images are stored in Cloudinary
4. Images become visible in the event gallery
5. Other users can interact through likes, comments, and favorites

### Notification Workflow

1. User likes or comments on an image
2. Notification is generated automatically
3. Image owner receives notification
4. Notifications can be marked as read

---

## Installation

### Clone Repository

```bash
git clone https://github.com/mohitsangwan031205/EventHub.git
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the server directory:

```env
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Deployment

### Frontend

Deployed on Vercel

https://event-hub-coral-iota.vercel.app

### Backend

Deployed on Render

https://eventhub-9am8.onrender.com

---

## Future Improvements

* AI-powered image tagging
* Advanced media search
* Event analytics dashboard
* User profile customization
* Email notifications
* Image moderation tools
* Video upload support
* Mobile application

---

## Learning Outcomes

Through this project, I gained practical experience in:

* MERN Stack Development
* REST API Design
* Authentication & Authorization
* Cloud Storage Integration
* Database Modeling
* Deployment & DevOps
* Responsive UI Design
* State Management
* Real-world Full Stack Application Development

---

## Author

Mohit Kumar

Chemical Engineering, IIT Roorkee

GitHub: https://github.com/mohitsangwan031205

---

## License

This project is developed for educational and academic purposes.
