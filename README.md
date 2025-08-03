# 🧘 Serenity - Wellness Session Management App

A full-stack wellness session management platform where users can create, save, and publish yoga or meditation sessions. Built with React, Node.js, Express, and MongoDB.

🚀 [Live App](https://serenity-ve74-git-main-ayushgit19s-projects.vercel.app/)  
📂 [Frontend GitHub Repo](https://github.com/ayushgit19/serenity)  
🌐 [LinkedIn - Ayush Kumar](https://www.linkedin.com/in/ayush-kumar-494736288/)

---

## ✨ Features

- 📝 Create and save session drafts
- 🚀 Publish sessions publicly
- ⏱️ Start and track session timers
- 🧠 Filter by category and difficulty
- 🔒 Authentication using JWT
- 💾 MongoDB integration for storage

---

## 📌 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ayushgit19/serenity.git
cd serenity
💻 Frontend Setup

cd frontend  # if frontend is inside a separate folder
npm install
Add a .env file

VITE_BACKEND_URL=http://localhost:3000
Start the frontend

npm run dev
🔧 Backend Setup

cd backend  # if backend is inside a separate folder
npm install
Add a .env file

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

# Optional (for password reset emails)
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_email@example.com
Start the backend

npm run dev
Ensure the backend is running on the same URL as defined in the frontend .env (VITE_BACKEND_URL).

📸 Screenshots
Home Page	Dashboard	Timer

🙌 Acknowledgements
Frontend: React + Tailwind CSS

Backend: Express.js + MongoDB

Icons: React Icons

Hosting: Vercel (Frontend), Render/Vercel (Backend)

## 📫 Contact

- 👨‍💻 [LinkedIn - Ayush Kumar](https://www.linkedin.com/in/ayush-kumar-494736288/)
- 🐙 [GitHub Profile](https://github.com/ayushgit19)
