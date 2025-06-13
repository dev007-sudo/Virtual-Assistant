### 🤖 AI Virtual Assistant
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)  

![Render Status](https://img.shields.io/badge/Render-Deployed-blueviolet?style=for-the-badge&logo=render)

A smart, interactive, and voice-enabled **AI Virtual Assistant** built using the **Node.js Full Stack**. Just ask your assistant a question—whether it's to search something, perform an action like "open YouTube", or get intelligent responses—and it will **understand, respond, and speak** just like a human companion.

Live Demo 🔗: [Click to Use the App](https://virtual-assistant-1-p3xa.onrender.com)

---

### 🚀 Features

- 🔐 **JWT Authentication** with secure user login & signup
- 🗣️ **Voice Interaction**: Assistant speaks back using your inputted name
- 💬 **Gemini API Integration** for intelligent AI responses
- 🧠 Ask it to perform actions (like open YouTube)
- ☁️ **Cloudinary** integration for image uploads
- 🔁 **Persistent sessions** via token-based auth
- 📦 Fully integrated with **NPM** for package management

---

### 🧰 Tech Stack

### 🌐 Frontend:
- HTML5, Tailwind CSS
- JavaScript (ES6+)
- React.js
- Axios

### 🛠️ Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs (for password hashing)
- Cloudinary (for media)
- Gemini API (for AI responses)

---

### 👤 User Flow

1. **Sign up** with a name (your assistant will call you by this name).
2. **Ask questions** using a chat interface.
3. The assistant responds in **text + speech** (synthesized).
4. You can ask it to open apps like YouTube or get info—powered by **Gemini API**.
5. All user sessions are securely handled via **JWT tokens**.

---

### 📸 Screenshots
![Home Page](https://github.com/dev007-sudo/Virtual-Assistant/blob/main/va1.PNG)

![Chat Interface](https://github.com/dev007-sudo/Virtual-Assistant/blob/main/va2.PNG)

![Chat Interface](https://github.com/dev007-sudo/Virtual-Assistant/blob/main/va3.PNG)

![Chat Interface](https://github.com/dev007-sudo/Virtual-Assistant/blob/main/va4.PNG)

![Chat Interface](https://github.com/dev007-sudo/Virtual-Assistant/blob/main/va5.PNG)

![Chat Interface](https://github.com/dev007-sudo/Virtual-Assistant/blob/main/va6.PNG)

### Clone the project:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
### 📥 Install Server Dependencies
```bash
npm install
```

### Create a .env file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### ▶️ Run the Backend
```bash
npm run dev
```

### ▶️ Run the Frontend
```bash
cd client
npm install
npm start
```

### 📚 Libraries Used
express

mongoose

jsonwebtoken

bcryptjs

cloudinary

axios

react-speech-recognition / Web Speech API

Gemini API (Google)

### 🔐 Authentication
User credentials secured using JWT tokens

Passwords encrypted with bcryptjs

Session validation enabled for protected routes

### 📤 Deployment Section (to highlight Render & MongoDB Atlas usage):

- **Frontend & Backend** deployed on [Render](https://render.com/)

- **Database** hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 📧 Contact Section (personal branding):
### 📧 Contact

**Created by:** Akash Shukla  

📧 Email: [akashshukla.dev@gmail.com](mailto:akashshukla.dev@gmail.com) 

👨‍💻 GitHub: [@dev007-sudo](https://github.com/dev007-sudo)

### ### 🤝 Contributing 
Contributions, issues, and feature requests are welcome!

Feel free to **fork** the repository, **open an issue**, or submit a **pull request** to improve this project.

If you find a bug or have an idea for enhancement, don't hesitate to share it.

---
### 🧾 License
This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
