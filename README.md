# Job Board Server 🚀

Backend for **Job Board**, a job listing and application platform.  
This server powers authentication, job postings, applications, and secure communication between frontend and backend.

---

## ✨ Features

- 🔐 **Authentication** (JWT-based login/signup)
- 📄 **Job postings** (CRUD operations for employers)
- 💼 **Applications** (candidates can apply to jobs)
- 🛡 **Role-based access** (employer / candidate)
- ☁️ **Optional Cloudinary file uploads**
- 🌍 **CORS-enabled** for frontend applications
- 📜 **Swagger API documentation**

---

## 📂 Project Structure

server/
├── models/ # Mongoose schemas (User, Job, Application)
├── routes/ # Express routes (auth, jobs, applications)
├── middlewares/ # Auth middleware (JWT, roles)
├── utils/ # Helpers (cloudinary, email)
├── docs/ # Swagger documentation comments
├── server.js # Main entry point (Express app)
└── .env.example # Environment variables template


---

## Badges

![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)  
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)  
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen?logo=mongodb)  
![JWT](https://img.shields.io/badge/JWT-Auth-blue)  
![Swagger](https://img.shields.io/badge/Swagger-API-orange)  
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Authors

- [@Oboikanyego](https://github.com/oboikanyego)

---

## App URL

**Deployed server URL:**  
https://job-listing-server.onrender.com

---

## Environment Variables

Create a `.env` file and fill in the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/job-board
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

DEMO 
(Insert GIF or link to demo of the frontend consuming this API)

Documentation

API documentation is available via Swagger UI:
http://localhost:5000/api/docs

Setup / Installation

Clone the repository:
git clone https://github.com/oboikanyego/job-listing-server.git
cd job-listing-server
npm install
cp .env.example .env
npm run dev

API Routes
| Method | Route                | Body                              | Description                        |
| ------ | -------------------- | --------------------------------- | ---------------------------------- |
| POST   | `/api/auth/register` | `{ name, email, password, role }` | Register user (employer/candidate) |
| POST   | `/api/auth/login`    | `{ email, password }`             | Login user, return JWT token       |

Jobs:
| Method | Route                 | Body                                                      | Description             |
| ------ | --------------------- | --------------------------------------------------------- | ----------------------- |
| GET    | `/api/jobs`           | query: `q`, `category`, `location`, `sort`                | List jobs               |
| GET    | `/api/jobs/:id`       | -                                                         | Get single job          |
| POST   | `/api/jobs`           | `{ title, description, category, location, salary }`      | Create job (employer)   |
| PUT    | `/api/jobs/:id`       | `{ title?, description?, category?, location?, salary? }` | Update job (owner only) |
| DELETE | `/api/jobs/:id`       | -                                                         | Delete job (owner only) |
| GET    | `/api/jobs/mine/list` | -                                                         | Get employer's own jobs |

Usage / Examples

import axios from 'axios';

const API_URL = 'https://job-listing-server.onrender.com/api';

async function getJobs() {
  const res = await axios.get(`${API_URL}/jobs`);
  console.log(res.data);
}

getJobs();

Deployment

This project can be deployed on Render, Heroku, or similar platforms:

Push repository to GitHub.

Connect repository in Render / Heroku dashboard.

Set environment variables in the dashboard.

Deploy — server will be live with API available.

License

MIT License © Oboikanyego

---
