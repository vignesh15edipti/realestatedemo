# SVS Real Estate - Premium Real Estate MERN Platform

Welcome to the official codebase of **SVS Real Estate**, a luxury, secure, and production-ready real estate property portal and management application. Built using the **MERN Stack** (MongoDB, Express.js, React, Node.js), this application enables seamless property browsing for customers and an administrative dashboard panel for broker management.

---

## 🏗️ Tech Stack

### Backend Architecture
* **Node.js & Express.js:** Scalable RESTful API structure.
* **MongoDB & Mongoose:** Schema validations, reference mapping, and search query filters.
* **JWT & bcryptjs:** Secure administrative authentication and hashed credentials.
* **Multer & Cloudinary:** Multi-image uploads with a local disk storage fallback if Cloudinary credentials are not set.

### Frontend Architecture
* **Vite + React:** Modern, high-performance compilation.
* **Redux Toolkit:** Centralized state management for authentication, property listings, and client inquiries.
* **Tailwind CSS v3:** Luxury slate (`#0F172A`) and amber (`#F59E0B`) color palettes, customized typography (Inter), and glassmorphism styling.
* **Framer Motion:** Smooth sliding and fade animations for landing heroes, featured carousels, and grid hover effects.
* **React Hook Form + Yup:** Rigid frontend form validation schemas.
* **React Helmet Async:** Dynamic SEO page titles.

---

## 📁 Repository Folder Structure

```
SVS/
├── client/                  # React + Vite Application
│   ├── public/              # Static public resources
│   └── src/
│       ├── assets/          # Global assets
│       ├── components/      # Reusable UI controls (Navbar, Footer, HeroSearch, Cards, etc.)
│       ├── layouts/         # Frame structures (MainLayout, AdminLayout)
│       ├── pages/           # Pages (Home, Listing, Details, Admin Dashboard, forms, etc.)
│       ├── redux/           # Redux RTK store and action slices
│       ├── services/        # Axios API service clients
│       └── utils/           # Currency and formatting utility helpers
└── server/                  # Express.js REST API
    ├── config/              # MongoDB and Cloudinary configurations
    ├── controllers/         # Routing operations controllers
    ├── middleware/          # Security authentication and Multer uploading wrappers
    ├── models/              # Mongoose data validation schemas
    ├── routes/              # Express routing paths
    ├── scripts/             # Database seeding scripts
    └── uploads/             # Temporary/Local upload backups
```

---

## 🛠️ Prerequisites

* **Node.js** (v18.x or v20.x stable)
* **npm** (v9.x or v10.x)
* **MongoDB** (running locally on standard port `27017` or a MongoDB Atlas connection URI)
* **Cloudinary Account** *(Optional)* - Only required if you wish to host media assets on the cloud. If omitted, the server automatically saves images locally inside [server/uploads/](file:///d:/vibe/SVS/server/uploads) and serves them statically.

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the complete MERN stack application locally.

### 1. Clone & Initialize directories

Run the package installation for both folders:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

Create `.env` configuration files in both folders. Examples have been provided:

#### Backend Config: `server/.env`
Create `server/.env` and supply your variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://vignesh1515official_db_user:O09eVlE2W596OhAo@projects.xqbabtx.mongodb.net/?appName=projects
JWT_SECRET=your_jwt_secret_key_here

# Optional: Add Cloudinary keys to activate cloud uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend Config: `client/.env`
Create `client/.env` and supply the API base URL:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💾 Database Seeding

To clear previous listings and seed 8 realistic properties (with premium Unsplash photographs) and 1 administrator account, run the seed script:

```bash
cd server
npm run seed
```

### 🔑 Default Admin Credentials
* **Email:** `admin@svs.com`
* **Password:** `AdminPassword123`

---

## 🏃 Running the Application Locally

Start the servers in development mode:

### Start Backend API Server
```bash
cd server
npm run dev
```
The API server will listen on `http://localhost:5000`. You can inspect the health check endpoint at `http://localhost:5000/api/health`.

### Start Frontend React Web App
```bash
cd client
npm run dev
```
The Vite development server will open the browser at `http://localhost:3000`.

---

## 🔒 Security Implementations

* **Password Hashing:** Passwords are pre-save hashed via `bcryptjs` with salt difficulty rounds of 10.
* **Authentication Guard:** Admin controllers are wrapped inside the `protect` middleware which verifies JWT Bearer tokens inside request headers.
* **Upload Limits:** Multer limits individual uploads to a maximum file size of `5MB` and checks MIME types, allowing only images (JPEG, PNG, WEBP).
* **Inputs Sanitization:** Express request bodies are validated, and numerical values are parsed inside controllers. Mongoose schemas validate fields against rigid enum lists.
* **CORS Security:** Cross-Origin Resource Sharing is loaded, restricting request sources to designated clients.

---

## 📦 Production Compilation

To compile optimized bundles for production deployments:

### Compile React Client
```bash
cd client
npm run build
```
Vite will compile and compress code assets into the [client/dist/](file:///d:/vibe/SVS/client/dist) folder.

### Start Backend Production Server
```bash
cd server
NODE_ENV=production npm start
```

---

*Designed and developed for SVS Real Estate Private Limited.*
