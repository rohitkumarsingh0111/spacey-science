🚀 Spacey Science
Immersive AI-Powered Learning Experience for Children

An interactive, space-themed educational platform designed to make children feel like they are exploring the universe — not reading slides.

Built with React, TypeScript, motion-driven UI, and AI-generated educational content, Spacey Science blends immersive frontend engineering with intelligent tutoring systems.

🌍 Live Demo

🔭 Frontend: https://spacey-science.vercel.app

⚙️ Backend API: https://spacey-science.onrender.com

❤️ API Health Check: https://spacey-science.onrender.com/api/health

🎯 Vision & Specialization Focus
🛰 Primary Focus: Interactive Journey (Frontend & Product UX)

Designed as a cohesive learning experience where:

⦁	Children feel immersed in space
⦁	Navigation feels guided and intentional
⦁	Animations enhance learning — not distract
⦁	Lesson → Interaction → Quiz is clearly structured
⦁	AI enhances learning but does not dominate UX

🧠 Secondary Focus: Intelligent AI Tutor

AI is deeply integrated but carefully controlled through:

⦁	Structured JSON output
⦁	Strict schema validation
⦁	Context-grounded prompts
⦁	Fallback mechanisms for reliability

✨ Core Learning Flow (Happy Path)

The learning journey is intentionally structured and guided.

1️⃣ Topic Selection

Students select a space topic from an animated, interactive card grid.

2️⃣ AI-Generated Lesson

AI generates:

3 structured sections

Child-friendly explanations

Emoji-based visual cues

Contextually safe, structured JSON output

Each section is clearly separated for cognitive clarity.

3️⃣ Interactive Expansion

“Learn More” dynamically expands only the selected section using AI.

✔ Keeps UI clean
✔ Controls cognitive load
✔ Prevents overwhelming content

4️⃣ Context-Aware Quiz Generation

Quiz is generated directly from lesson context to ensure:

High relevance

Reduced hallucination

Structured JSON parsing

UI-safe rendering

5️⃣ Reward & Progress Persistence

Scores stored in MongoDB

Progress persists across refresh

Badge unlock logic supported

🎨 Frontend Highlights
🌌 Immersive UI Design

Space-themed animated background

Glassmorphism cards

Gradient typography

Persistent floating Quiz CTA

Smooth section transitions

Safe loading & error states

The design goal:
Make learning feel like exploration.

🎬 Motion Design (Purposeful, Not Decorative)

Powered by Framer Motion

Section transitions aligned with learning progression

Animated progress indicators

Quiz state transitions

Button hover & tap feedback

Controlled motion pacing for children

Animations are used to support understanding — not distract from it.

🧩 Structured 3-Step Learning Flow

Every topic follows:

Intro → Lesson Sections → Quiz


This separation ensures:

Cognitive clarity

Clear progression

Reduced overwhelm

Intentional navigation

📱 Responsive & Accessible

Fully responsive (Mobile / Tablet / Desktop)

Semantic HTML structure

Keyboard-friendly buttons

Accessible loading states

Error-safe rendering

Clean UI state management

🧠 AI Capabilities (Architected, Not Bolted-On)
📘 Dynamic Lesson Generation

AI generates:

3 structured lesson sections

Child-friendly explanations

Visual cues via emojis

Strict JSON schema output

Benefits:

Controlled hallucination

UI-safe rendering

Predictable frontend structure

❓ Context-Aware Quiz Generation

Quiz is grounded using:

Lesson text as context

Strict JSON schema validation

Controlled prompt structure

Ensures:

Lesson-aligned questions

Reliable UI parsing

Reduced randomness

Consistent difficulty

🔍 Expandable Learning

“Learn More” triggers AI expansion only for the selected section.

This ensures:

Controlled interaction

Minimal layout shift

Reduced cognitive overload

Focused exploration

🧩 Architecture Overview
🖥 Frontend

Tech Stack

React

TypeScript

Tailwind CSS

Framer Motion

Design Patterns

Clear separation of:

UI State

Current section

Expansion state

Animation state

Loading indicators

Server State

Lesson data

Quiz data

Progress data

Additional Practices

Environment-based API configuration

Error boundary handling

Defensive rendering

Component-level state isolation

⚙️ Backend

Tech Stack

Node.js

Express

MongoDB

Controller-Service architecture

REST API Endpoints
POST /api/lesson/generate
POST /api/lesson/expand
POST /api/quiz/generate
POST /api/progress/save
GET  /api/health

Backend Features

Validation middleware

Centralized error handling

AI response sanitization

Schema enforcement

Environment-based configuration

🗄 Database (MongoDB)

Stores:

User progress

Quiz attempts

Scores

Badge unlock status

Designed for persistence and simple extensibility.

🔐 Security & Production Practices

API keys stored in environment variables

.env.example provided

No secrets committed

CORS configured for production domains

Environment-based API switching

AI failure fallback responses

Safe JSON parsing with validation

Defensive frontend rendering

▶️ Running Locally
1️⃣ Clone Repository
git clone https://github.com/your-username/spacey-science.git
cd spacey-science

2️⃣ Setup Environment
cp .env.example .env


Add:

GEMINI_API_KEY=
MONGODB_URI=

3️⃣ Start Backend
cd backend
npm install
npm run dev

4️⃣ Start Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

⚖️ Trade-offs & Design Decisions
✅ Focused Depth Over Feature Overload

Instead of building many shallow features, the platform deeply refines one complete AI learning journey.

✅ AI Architecture > Feature Quantity

Structured AI integration prioritized over adding more surface-level features.

✅ REST over GraphQL

Chosen for clarity, simplicity, and faster development iteration.

✅ Defensive AI Integration

Implemented:

Fallback responses

Strict schemas

Controlled prompts

Safe rendering

✅ UX Polish Balanced with Performance

Motion is purposeful.
Animations are optimized.
Layout shifts are minimized.

📌 Why This Project Stands Out

Spacey Science is not just:

❌ A basic CRUD app
❌ A simple AI wrapper
❌ A static educational site

It is:

✔ A structured AI learning system
✔ A motion-driven immersive frontend
✔ A controlled AI architecture
✔ A product-thinking oriented educational platform

It demonstrates:

Frontend architecture maturity

AI integration discipline

UX thinking

Production-ready engineering practices

👨‍🚀 Future Improvements

User authentication system

Progress dashboard with analytics

Gamification system expansion

Multi-topic learning paths

Teacher/admin content moderation panel

AI difficulty tuning

Performance caching layer

🧑‍💻 Author

Rohit
B.Tech CSE (Data Science)
Frontend & AI-focused Developer
