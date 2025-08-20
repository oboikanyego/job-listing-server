# Job Board Server
Backend API for Job Listing Platform — Built with Node.js, Express, and MongoDB. Handles authentication, job postings, applications, and secure communication between frontend and backend.

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run dev: `npm run dev`

## Routes
- `POST /api/auth/register` { name, email, password, role: 'employer'|'candidate' }
- `POST /api/auth/login` { email, password }
- `GET /api/jobs` list with ?q=&category=&location=&sort=newest|oldest
- `GET /api/jobs/:id`
- `POST /api/jobs` (employer)
- `PUT /api/jobs/:id` (employer owner)
- `DELETE /api/jobs/:id` (employer owner)
- `GET /api/jobs/mine/list` (employer)

Applications:
- `POST /api/applications` { jobId, coverLetter } (candidate)
- `GET /api/applications/mine` (candidate)
- `GET /api/applications/job/:jobId` (employer)
- `PUT /api/applications/:id/status` { status } (employer)

