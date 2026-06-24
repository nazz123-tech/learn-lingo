# LearnLingo 🌍

A web application for finding and booking online language tutors. Users can browse teachers, filter by language, level and price, save favorites, and book trial lessons.

## Features

- 🔐 Authentication — register, login, logout via Firebase Auth
- 👨‍🏫 Teachers — browse tutors with pagination (Load more)
- 🔍 Filters — filter by language, level, and price per hour
- ❤️ Favorites — save teachers to favorites (stored in Firebase)
- 📅 Booking — book a trial lesson with a teacher
- 🔒 Private route — Favorites page is accessible only to authenticated users

## Pages

| Page | Description |
|------|-------------|
| `/` | Home page with company benefits and CTA button |
| `/teachers` | List of teachers with filters and pagination |
| `/favorites` | Private page with saved teachers |

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** — React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** — static typing
- **[Firebase](https://firebase.google.com/)** — Authentication + Realtime Database
- **[TanStack Query](https://tanstack.com/query)** — data fetching and caching
- **[react-hook-form](https://react-hook-form.com/)** — form management
- **[yup](https://github.com/jquense/yup)** — form validation
- **[react-toastify](https://fkhadra.github.io/react-toastify/)** — toast notifications
- **[react-icons](https://react-icons.github.io/react-icons/)** — icons

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx               # Home
│   ├── teachers/
│   │   └── page.tsx           # Teachers
│   └── favorites/
│       └── page.tsx           # Favorites (private)
├── components/
│   ├── Header/
│   ├── TeacherCard/
│   ├── FiltersBar/
│   ├── Modal/
│   ├── Loader/
│   └── forms/
│       ├── LoginForm/
│       ├── RegisterForm/
│       └── BookingForm/
├── hooks/
│   ├── useAuth.ts
│   ├── useTeachers.ts
│   ├── useFavorites.ts
│   └── useFavoritesTeachers.ts
├── context/
│   └── AuthContext.tsx
├── types/
│   ├── teacher.ts
│   └── filters.ts
├── validations/
│   ├── authSchemas.ts
│   └── bookingSchema.ts
└── lib/
    └── firebase.ts
```

## Firebase Structure

```
root/
├── teachers/
│   ├── 0/
│   ├── 1/
│   └── ...
└── users/
    └── {uid}/
        ├── favorites/
        │   ├── 0: true
        │   └── 3: true
        └── trials/
            └── {teacherId}/
                ├── teacherName: string
                └── bookedAt: timestamp
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/learn-lingo.git
cd learn-lingo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design

- 🎨 [Figma Mockup](https://www.figma.com/file/your-figma-link)

## Live Demo

- 🚀 [Deployed on Vercel](https://your-project.vercel.app)
