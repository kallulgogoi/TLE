🚀 AI Adaptive Quiz System

A gamified, full-stack adaptive learning platform that dynamically adjusts quiz difficulty based on student performance using Machine Learning, and provides AI-generated technical insights and explanations powered by Google Gemini.

Designed to help students learn smarter, not harder — progressing from fundamentals to interview-level questions based on real performance.

🌟 Key Features
🧠 Adaptive Learning Engine

Uses a Scikit-Learn Decision Tree model to evaluate student performance

Predicts student skill level after each quiz

Automatically unlocks interview-level questions once all levels of a subject are completed

🎮 Gamified Dashboard

Accuracy-based progression system

XP rewards and performance badges

Visual progress tracking across subjects and levels

🤖 AI-Powered Explanations

Google Gemini AI generates:

Concept explanations

Performance feedback

Improvement suggestions based on weak areas

🧩 Microservices Architecture

Node.js Backend → Authentication, quiz logic, user management

FastAPI ML Service → High-performance ML predictions

Clean separation of concerns for scalability and maintainability

🛠️ Tech Stack
Frontend

⚛️ React + Vite

🎨 Tailwind CSS

🖼️ Lucide Icons

Backend (Core API)

🟢 Node.js

🚂 Express.js

🧬 Mongoose

ML Service

🐍 Python

⚡ FastAPI

📦 Pydantic

AI / ML

🌳 Scikit-Learn (Decision Tree Classifier)

🤖 Google Gemini AI

Database & Cloud

🍃 MongoDB Atlas

☁️ Cloudinary (Media Uploads)

🚀 Getting Started
📋 Prerequisites

Node.js v16+

Python 3.9+

MongoDB Atlas Account

Google AI Studio API Key (Gemini)

📦 Installation
1️⃣ Clone the Repository
git clone https://github.com/kallulgogoi/TLE.git
cd TLE

2️⃣ Backend Setup (Node.js)
cd backend
npm install
cp .env.example .env

3️⃣ ML Service Setup (FastAPI)
cd ../ml-service
pip install -r requirements.txt

4️⃣ Frontend Setup (React)
cd ../frontend
npm install

⚙️ Environment Variables
🔐 Backend (/backend/.env)
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=

# Authentication
JWT_SECRET=
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Gemini AI
GEMINI_API_KEY=

# ML Service
ML_API_URL=http://localhost:8000

🌐 Frontend (/frontend/.env)
VITE_API_URL=http://localhost:5000/api

🚢 Deployment Guide
🔹 Backend & ML Service (Render)
ML Service

Type: Web Service

Build Command:

pip install -r requirements.txt


Start Command:

uvicorn main:app --host 0.0.0.0 --port 8000

Node Backend

Type: Web Service

Build Command:

npm install


Start Command:

node index.js

⏰ Cold Start Prevention

Use an external pinger (e.g., cron-job.org) to hit:

/health or /ping every 10 minutes.

🔹 Frontend (Vercel)

Connect your GitHub repository

Set environment variable:

VITE_API_URL = https://your-render-backend-url


Deploy 🎉

🎯 Future Enhancements

Personalized learning paths

Leaderboards & social competition

LLM-based question generation

Skill analytics dashboard

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork and submit a PR.

⭐ Show Your Support

If you like this project, give it a star ⭐ — it really helps!
