# 🚀 Vistara - AI Career Companion

## 🧠 Overview

**Vistara** is an AI-powered career companion designed to assist users throughout their professional journey.  
By leveraging advanced AI capabilities, Vistara offers intelligent features such as **industry insights**, **AI-driven resume creation**, **cover letter generation**, and **interview preparation** — all in one place.

### 📊 Schema Diagram
🔗 [View on Eraser](https://app.eraser.io/workspace/hnYGH99zMZFbHBJ1Fi8V?origin=share)

---

## 🌟 Features

- **Industry Insights:** Receive weekly, AI-generated insights about your chosen industry.  
- **AI Resume Builder:** Build, save, and enhance professional resumes using AI assistance.  
- **Cover Letter Generator (Planned/In Progress):** Generate tailored cover letters instantly with AI.  
- **Interview Preparation:**  
  - Generate personalized interview quizzes with AI.  
  - Practice mock interviews through an interactive UI.  
  - Track your improvement with visual performance analytics.  
- **User Authentication:** Secure login and registration using **Clerk**.  
- **Onboarding:** Smooth onboarding experience for new users.  
- **Dashboard:** Centralized hub to manage your insights, progress, and interview prep.  
- **Error Handling:** Includes a user-friendly 404 error page.  
- **Theming:** Full dark mode support for an enhanced user experience.  

---

## 🧰 Technology Stack

- **Next.js** – Frontend framework  
- **React** – Component-based UI library  
- **Prisma** – ORM for database interaction  
- **Clerk** – Authentication and user management  
- **Tailwind CSS** – Utility-first CSS framework for responsive styling  
- **Gemini API** – Google’s AI model for content generation and insights  
- **Inngest** – Event-driven task scheduling and cron jobs  
- **date-fns** – For date and time manipulation  
- **Recharts** – For creating performance and analytics charts  

---

## 📁 Project Structure (High-Level)

Vistara-AI
├── .gitignore
├── README.md
├── actions
│ ├── cover-letter.js
│ ├── dashboard.js
│ ├── interview.js
│ ├── resume.js
│ └── user.js
├── app
│ ├── (auth)
│ │ ├── layout.js
│ │ ├── sign-in
│ │ │ └── [[...sign-in]]
│ │ │ └── page.jsx
│ │ └── sign-up
│ │ └── [[...sign-up]]
│ │ └── page.jsx
│ ├── (main)
│ │ ├── ai-cover-letter
│ │ │ ├── [id]
│ │ │ │ └── page.jsx
│ │ │ ├── _components
│ │ │ │ ├── cover-letter-generator.jsx
│ │ │ │ ├── cover-letter-list.jsx
│ │ │ │ └── cover-letter-preview.jsx
│ │ │ ├── new
│ │ │ │ └── page.jsx
│ │ │ └── page.jsx
│ │ ├── dashboard
│ │ │ ├── _components
│ │ │ │ └── Dashboard-view.jsx
│ │ │ ├── layout.js
│ │ │ └── page.jsx
│ │ ├── interview
│ │ │ ├── _components
│ │ │ │ ├── PerformanceChart.jsx
│ │ │ │ ├── QuizList.jsx
│ │ │ │ ├── quiz-result.jsx
│ │ │ │ ├── quiz.jsx
│ │ │ │ └── stats-cards.jsx
│ │ │ ├── layout.js
│ │ │ ├── mock
│ │ │ │ └── page.jsx
│ │ │ └── page.jsx
│ │ ├── layout.js
│ │ ├── onboarding
│ │ │ ├── _components
│ │ │ │ └── onboarding-form.jsx
│ │ │ └── page.jsx
│ │ └── resume
│ │ ├── _components
│ │ │ ├── entry-form.jsx
│ │ │ └── resume-builder.jsx
│ │ ├── layout.js
│ │ └── page.jsx
│ ├── api
│ │ └── inngest
│ │ └── route.js
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.js
│ ├── lib
│ │ ├── helper.js
│ │ └── schema.js
│ ├── not-found.jsx
│ └── page.jsx
├── components.json
├── components
│ ├── HeroSection.jsx
│ ├── header.jsx
│ ├── theme-provider.jsx
│ └── ui
│ ├── accordion.jsx
│ ├── alert-dialog.jsx
│ ├── badge.jsx
│ ├── button.jsx
│ ├── card.jsx
│ ├── dialog.jsx
│ ├── dropdown-menu.jsx
│ ├── input.jsx
│ ├── label.jsx
│ ├── progress.jsx
│ ├── radio-group.jsx
│ ├── select.jsx
│ ├── sonner.jsx
│ ├── tabs.jsx
│ └── textarea.jsx
├── data
│ ├── faqs.js
│ ├── features.js
│ ├── howItWorks.js
│ ├── industries.js
│ └── testimonial.js
├── eslint.config.mjs
├── hooks
│ └── use-fetch.js
├── jsconfig.json
├── lib
│ ├── checkUser.js
│ ├── inngest
│ │ ├── client.js
│ │ └── functions.js
│ ├── prisma.js
│ └── utils.js
├── middleware.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
│ ├── migrations
│ │ ├── 20250905145920_create_models
│ │ │ └── migration.sql
│ │ ├── 20250922075831_vistara_new
│ │ │ └── migration.sql
│ │ ├── 20250922080607_new
│ │ │ └── migration.sql
│ │ └── migration_lock.toml
│ └── schema.prisma
└── public
├── banner.jpeg
├── banner2.jpeg
├── banner3.jpeg
└── logoss.png


---

## 🚀 Development Flow

Vistara’s development followed a **modular, milestone-driven approach**:

1. **Initial Setup:** Created the Next.js base app and configured the environment.  
2. **Authentication:** Integrated Clerk for secure user management.  
3. **Database Setup:** Defined and connected database models via Prisma.  
4. **Core Features:** Built foundational UI components and utilities.  
5. **AI Integration:** Connected Gemini API for insights, resume, and quiz generation.  
6. **Section Development:** Implemented Dashboard, Resume Builder, Interview Prep, and Onboarding modules.  
7. **Background Tasks:** Automated weekly AI updates using Inngest cron jobs.  
8. **UI Enhancements:** Added dark mode, loaders, and analytics visualization.  
9. **Error Handling:** Designed custom 404 and error boundaries.  

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone <your_repository_url>

2️⃣ Install Dependencies
npm install
# or
yarn install
# or
pnpm install

3️⃣ Set Up Environment Variables

Create a .env.local file and add:

CLERK_API_KEY=<your_clerk_api_key>
GEMINI_API_KEY=<your_gemini_api_key>
DATABASE_URL=<your_prisma_database_url>
INNGEST_SIGNING_KEY=<your_inngest_signing_key>

4️⃣ Run Prisma Migrations
npx prisma migrate dev

5️⃣ Start the Development Server
npm run dev
# or
yarn dev
# or
pnpm dev
