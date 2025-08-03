# 🧘 Wellness Session Management App

A full-stack web application for creating, saving, and publishing wellness sessions such as yoga and meditation. Built with React, Node.js, Express, and MongoDB.

## 🔍 Overview

This app allows users to:

- Save yoga/meditation sessions as **drafts**
- **Publish** sessions for others to view
- View all available published sessions
- Start sessions with an interactive **countdown timer**
- Filter sessions by category, difficulty, etc.

Built with **MERN stack** and supports authentication, protected routes, draft management, and a clean, responsive dashboard UI.

## 🚀 Live Demo

> 🟢 [Frontend Live on Vercel]([https://your-frontend.vercel.app](https://serenity-ve74-git-main-ayushgit19s-projects.vercel.app/))  

## ✨ Features

- ✅ User Authentication (JWT-based)
- ✅ Save & Edit Drafts
- ✅ Publish Sessions with images and structured content
- ✅ Real-time Timer (start, pause, resume)
- ✅ Categorization by difficulty and type (e.g., Meditation, Yoga)
- ✅ Clean & Responsive Dashboard UI

## 🛠️ Tech Stack

**Frontend**:
- React
- Vite
- Tailwind CSS
- Axios
- React Icons
- React Router DOM
- Toast Notifications (react-hot-toast)

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- dotenv

## 📂 Folder Structure


.
├── client/           # React Frontend (Vite)
└── server/           # Express Backend (API + MongoDB)
⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/wellness-session-app.git
cd wellness-session-app
2. Set Up Backend
bash
Copy
Edit
cd server
npm install
Create a .env file in /server:

env
Copy
Edit
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
Start the backend:

bash
Copy
Edit
npm run start
3. Set Up Frontend
bash
Copy
Edit
cd ../client
npm install
Create a .env file in /client:

env
Copy
Edit
VITE_BACKEND_URL=https://your-backend.vercel.app
Start the frontend:

bash
Copy
Edit
npm run dev
🧪 Sample User Flow
Register or Login

Create a new wellness session → Save as draft or Publish

View all your sessions in the dashboard

Start a session with a countdown timer

Enjoy your session 🎧



🧠 Learnings
End-to-end MERN integration

Managing state with React Context

Using JWT auth in a full-stack app

Deploying full-stack apps on Vercel/Railway

📦 Deployment
Frontend: Vercel
Backend: Vercel 

🙌 Acknowledgements
Thanks to everyone who inspired this project in the wellness and tech community 🌿

📫 Contact
Built with ❤️ by Ayush Kumar
