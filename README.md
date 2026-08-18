# FitQuest - Gamified Fitness Challenge Application

FitQuest is a full-stack fitness tracking application designed to gamify physical activity and foster friendly competition. It normalizes diverse sports into a unified scoring system, allowing athletes with different exercise preferences to compete fairly on a global leaderboard while tracking personal fitness trends on an interactive dashboard.

---

## Features

- **Fair Cross-Sport Scoring Engine:** Normalizes Running, Walking, Cycling, Swimming, Gym, and Daily Steps using precise mathematical flooring rules.
- **Global Leaderboard:** Filter rankings across *This Week*, *This Month*, and *All Time* with an Olympic-style top-3 podium, athlete search, and active user highlighting.
- **Personal Analytics Dashboard:** 7-day chronological points accumulation charts (Recharts), sport mix donut breakdown, active streak tracking, and weekly quest goals.
- **Interactive Workout Logger:** Dynamic metric input switching with real-time points preview before submitting.
- **Secure Authentication:** HttpOnly JWT cookies with strict duplicate user detection on `[firstName, lastName]` and `email`.
- **Interactive API Documentation:** Complete OpenAPI 3.0.3 documentation with Swagger UI hosted at `/api-docs`.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18 (TypeScript), Vite, Tailwind CSS, Recharts, Lucide Icons, Axios, React Query |
| **Backend** | Node.js, Express.js (TypeScript), Prisma ORM, Zod, bcryptjs, jsonwebtoken, Swagger UI |
| **Database** | SQLite (Relational DB via Prisma Client) |

---

## Project Structure

```
FitQuest/
├── backend/
│   ├── prisma/              # Prisma schema, migrations & seed
│   ├── src/
│   │   ├── controllers/     # Route handlers (auth, activities, leaderboard)
│   │   ├── docs/            # Swagger OpenAPI specifications
│   │   ├── middleware/      # Auth & global error handling
│   │   ├── routes/          # Express route declarations
│   │   ├── services/        # Business logic & database operations
│   │   ├── utils/           # Scoring engine & constants
│   │   └── validators/      # Zod request validation schemas
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios API client functions
│   │   ├── components/      # React components (dashboard, leaderboard, activities)
│   │   ├── context/         # AuthContext provider
│   │   ├── hooks/           # Data fetching hooks
│   │   ├── pages/           # Application views (Dashboard, Leaderboard, Activities, Auth)
│   │   └── utils/           # Analytics & client scoring utilities
│   └── package.json
├── DESIGN.md                # Detailed Architecture & System Design Document
└── README.md                # Setup Guide & Overview
```

---

## Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create or verify `.env` configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_ACCESS_SECRET="fitquest-dev-jwt-secret-change-in-production"
   JWT_ACCESS_EXPIRES_IN="7d"
   PORT=3000
   FRONTEND_ORIGIN="http://localhost:5173"
   ```

4. Generate Prisma Client and apply database migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend API will run at `http://localhost:3000`.*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will run at `http://localhost:5173`.*

---

## Useful URLs

- **Web Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)
- **Swagger API Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **API Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Prisma Studio (DB GUI):** Run `npx prisma studio` inside `backend/` $\rightarrow$ [http://localhost:5555](http://localhost:5555)

---

## Scoring & Normalization Rules

| Sport | Metric Unit | Conversion Rate | Flooring Rule | Formula |
| :--- | :--- | :--- | :--- | :--- |
| **Running** | Distance (km) | $100\text{ pts} / 1\text{ km}$ | Points floored to integer | $\lfloor \text{km} \times 100 \rfloor$ |
| **Walking** | Distance (km) | $50\text{ pts} / 1\text{ km}$ | Points floored to integer | $\lfloor \text{km} \times 50 \rfloor$ |
| **Cycling** | Distance (km) | $25\text{ pts} / 1\text{ km}$ | Points floored to integer | $\lfloor \text{km} \times 25 \rfloor$ |
| **Swimming** | Duration (sec) | $15\text{ pts} / 1\text{ min}$ | Seconds floored to whole minutes | $\lfloor \frac{\text{sec}}{60} \rfloor \times 15$ |
| **Gym** | Duration (sec) | $5\text{ pts} / 1\text{ min}$ | Seconds floored to whole minutes | $\lfloor \frac{\text{sec}}{60} \rfloor \times 5$ |
| **Daily Steps** | Count (steps) | $1\text{ pt} / 100\text{ steps}$ | Floored to nearest 100 steps | $\lfloor \frac{\text{steps}}{100} \rfloor \times 1$ |

---

## System Design Document

For a comprehensive breakdown of the system architecture, database schema, API specifications, component hierarchy, and technical trade-offs, refer to [DESIGN.md](DESIGN.md).
