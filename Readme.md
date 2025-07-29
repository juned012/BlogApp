# Blog Web Application

A full-stack blog platform that allows users to **signup**, **login**, **create blog posts**, **view posts**, and **comment** on blogs. Authors have their own dashboard to manage posts, and admin can manage users/posts (if extended). The app is built with **React** on the frontend and **Node.js/Express** with MongoDB on the backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)

## Features

- User Signup with avatar upload
- User Login with JWT Authentication
- Create, Edit, Delete blog posts (Authors only)
- View blog posts (all users)
- Blog post status: Draft or Published
- Add and view comments on blog posts
- Author dashboard for managing own posts
- Protected routes for authors and admins
- Responsive UI with smooth animations
- Blog post tags, categories, reading time, and summary
- Image upload support via URL in blog posts

## Tech Stack

- **Frontend:**
  - React.js
  - React Router DOM
  - Axios for API calls
  - Framer Motion for animations
  - Tailwind CSS for styling
- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose
  - Multer for avatar upload
  - JWT authentication and role-based authorization

---

## API Endpoints

### User Routes

- `POST /api/user/signup` — Register a new user (avatar upload supported)
- `POST /api/user/login` — User login, returns JWT and user info

### Blog Routes

- `POST /api/blog/post-blog` — Create a new blog post (Auth required)
- `GET /api/blog/get-blog` — Get posts of current authenticated user
- `GET /api/blog/all-blog` — Get all published blog posts
- `GET /api/blog/all-blog/:id` — Get single blog post details by ID
- `DELETE /api/blog/delete-blog/:id` — Delete a blog post by ID (Auth required)

### Comment Routes

- `POST /api/comment/:id/post-comment` — Post comment on a blog (Auth required)
- `GET /api/comment/:id/comments` — Get comments for a blog post

## Folder Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/             # Avatar upload storage
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
├── README.md
└── package.json
```

## Usage

### Signup & Login

- Users can create an account with an avatar image.
- Login returns a JWT token stored in `localStorage`.

### Author Actions

- Create new blog posts using the dashboard.
- Edit or delete existing posts.
- Posts can be saved as 'Draft' or 'Published'.

### Viewing Blogs

- All users (including guests) can browse published blogs.
- Clicking on a blog shows detailed content and comments.
- Users can post comments once authenticated.

### Navigation & Routing

- Public routes: Home, Blogs, About, Contact, Blog Details
- Protected routes: Author Dashboard, Admin Dashboard
- Guest routes: Login, Signup (redirect authenticated users)
