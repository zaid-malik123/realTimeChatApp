# 💬 Chatly

Chatly is a modern full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js).  
This app will allow users to communicate in real-time. Currently, basic **user authentication** has been completed.

---

## 🚀 Features (In Progress)

- ✅ User Signup and Login  
- ✅ Frontend UI for Authentication (Login & Signup)  
- 🔒 JWT-based secure authentication  
- 🛠️ Backend API for user handling  
- ⏳ Real-time chat system (Coming soon)  

---

## 🛠 Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS (or your CSS framework)

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT for authentication  

---

## 📦 Project Structure

chatly/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ └── components/
│ └── App.js
└── README.md

yaml

Edit

---

## 🧑‍💻 How to Run (Locally)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatly.git
cd chatly
🛠 Backend Setup
bash

Edit
cd backend
npm install
Create a .env file in the backend folder and add:

env

Edit
MONGO_URI=your_mongo_url
JWT_SECRET=your_jwt_secret
PORT=3000
Start the backend server:

bash

Edit
npm run dev
💻 Frontend Setup
bash

Edit
cd frontend
npm install
npm start
📌 Project Status
✅ Authentication completed
🚧 Chat feature coming soon