Spacey Science – Immersive AI-Powered Learning Experience

An interactive, space-themed educational platform designed to make children feel like they are exploring the universe — not reading slides.

Built with React, TypeScript, motion-driven UI, and AI-generated educational content, the platform blends immersive frontend experience with intelligent tutoring.

🌍 Live Demo

Frontend: https://spacey-science.vercel.app

Backend API: https://spacey-science.onrender.com

API Health: https://spacey-science.onrender.com/api/health

🎯 Specialization Focus
🛰 Primary Path: Interactive Journey (Frontend & Product UX)
🧠 Secondary: Intelligent AI Tutor


Why This Direction?

The goal was to design a cohesive learning experience where:

Children feel immersed in space

Navigation feels guided and intentional

Animations enhance learning, not distract

The UI clearly separates lesson → interaction → quiz

AI enhances learning but does not dominate the UX

✨ Core Learning Flow (Happy Path)

1️⃣ Topic Selection
Students choose a space topic from an animated card grid.

2️⃣ AI-Generated Lesson
Three structured sections with contextual animations and expandable content.

3️⃣ Interactive Expansion
“Learn More” dynamically expands content via AI without breaking layout flow.

4️⃣ Quiz Generation
Quiz is generated from the lesson context to ensure relevance.

5️⃣ Reward & Progress Persistence
Scores and progress are stored and remain visible after refresh.

🎨 Frontend Highlights
Immersive UI Design

Space-themed background

Glassmorphism cards

Gradient text and animated transitions

Persistent floating Quiz CTA

Smooth section transitions

Loading and error-safe states

Motion Design (Purposeful, Not Decorative)

Section transitions using Framer Motion

Animated progress indicators

Quiz state transitions

Button hover and tap feedback

Animations support learning progression rather than distract.

Structured 3-Step Learning Flow

Each topic follows:

Intro → Lesson Sections → Quiz

Clear separation ensures cognitive clarity for children.

Responsive & Accessible

Fully responsive (Mobile / Tablet / Desktop)

Semantic structure

Keyboard-friendly buttons

Proper loading/error states

🧠 AI Capabilities (Secondary Focus)
Dynamic Lesson Generation

AI generates:

3 structured sections

Child-friendly explanations

Emoji-based visual cues

All returned as structured JSON for safe rendering.

Context-Aware Quiz Generation

Quiz is generated using:

Lesson text as grounding

Strict JSON schema

Controlled prompt structure

Ensures:

Reduced hallucination

Lesson-aligned questions

Reliable UI parsing

Expandable Learning

“Learn More” calls AI to expand only the current section.

This keeps:

UI clean

Cognitive load manageable

Interaction focused

🧩 Architecture Overview
🖥 Frontend

React + TypeScript

Tailwind CSS

Framer Motion

Environment-based API configuration

Clear UI state vs server state separation

UI State:

Current section

Expansion state

Loading states

Server State:

Lesson data

Quiz data

Progress data

⚙️ Backend

Node.js + Express

Controller-service architecture

REST APIs

Validation & error-safe middleware

Endpoints:

POST /api/lesson/generate

POST /api/lesson/expand

POST /api/quiz/generate

POST /api/progress/save

🗄 Database

MongoDB

Stores:

User progress

Quiz attempts

Scores & badge unlocks

🔐 Security & Production Practices

API keys in environment variables

.env.example provided

No secrets committed

CORS configured for production domain

Environment-based API switching

Fallback mechanisms for AI failure


▶️ Running Locally
1️⃣ Clone
git clone https://github.com/your-username/spacey-science.git
cd spacey-science

2️⃣ Setup Environment
cp .env.example .env

Add:
GEMINI_API_KEY
MONGODB_URI

3️⃣ Start Backend
cd backend
npm install
npm run dev

4️⃣ Start Frontend
cd frontend
npm install
npm run dev

⚖️ Trade-offs & Design Decisions

Focused on one complete AI learning journey instead of feature overload
Prioritized AI architecture depth over broad feature coverage
Used REST over GraphQL for clarity and simplicity
Implemented fallback mechanisms to prevent AI failure crashes
Balanced UX polish with performance
