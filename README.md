# 🕉️ ShunyaMarg - MERN Stack Full Application

![ShunyaMarg](frontend/public/logo.png)

A complete spiritual learning platform built with **MongoDB, Express.js, React.js, and Node.js**.

---

## ✨ Features

### 🎴 **Interactive Flipping Cards with Q&A**
- 3D card flip animations on click
- Each card reveals questions when flipped
- Click questions to reveal answers
- Smooth animations with Framer Motion

### 🔐 **Complete Authentication System**
- User registration and login
- JWT-based secure authentication
- Role-based access control (User/Admin)
- Protected routes

### 👑 **Admin Panel**
- Full CRUD operations for topics
- Add/Edit/Delete Q&A pairs
- User management
- Content moderation

### 🔍 **Advanced Search**
- Real-time search across topics
- Search by title, description, or content
- Backend-powered search API

### 📱 **Fully Responsive**
- Mobile-first design
- Tablet optimization
- Desktop large screens
- Touch-friendly interactions

### 🎨 **Modern UI/UX**
- Beautiful color palette
- Smooth animations
- Clean, minimalistic design
- Interactive components

---

## 📁 Project Structure

```
shunyamarg-mern-fullstack/
├── backend/                    # Node.js + Express backend
│   ├── config/                # Configuration files
│   │   └── database.js       # MongoDB connection
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   └── topicController.js
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   └── Topic.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   └── topics.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js           # JWT authentication
│   ├── utils/                 # Utility functions
│   │   └── seed.js           # Database seeding
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── server.js              # Main server file
│
└── frontend/                   # React frontend
    ├── public/                # Static files
    ├── src/
    │   ├── components/        # React components
    │   │   ├── Admin/        # Admin panel components
    │   │   ├── Auth/         # Login/Register forms
    │   │   ├── Cards/        # Flipping card components
    │   │   └── Layout/       # Navbar, Footer
    │   ├── context/          # React Context (State)
    │   │   └── AuthContext.js
    │   ├── pages/            # Page components
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── TopicDetail.js
    │   │   └── AdminDashboard.js
    │   ├── services/         # API services
    │   ├── styles/           # CSS files
    │   ├── App.js            # Main App component
    │   ├── App.css           # Global styles
    │   └── index.js          # Entry point
    └── package.json
```

---

## 🚀 Quick Start Guide

### **Prerequisites**

Make sure you have installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas account)
- **npm** or **yarn**

### **Installation**

#### **Step 1: Clone/Extract the Project**
```bash
cd shunyamarg-mern-fullstack
```

#### **Step 2: Setup Backend**

```bash
cd backend
npm install
```

Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/shunyamarg
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@shunyamarg.org
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin User
```

#### **Step 3: Seed Database (Create Admin & Sample Data)**

```bash
npm run seed
```

This will create:
- Default admin user (admin@shunyamarg.org / admin123)
- 6 sample topics with Q&A

#### **Step 4: Start Backend Server**

```bash
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

Backend will run on: `http://localhost:5000`

#### **Step 5: Setup Frontend**

Open a **new terminal**:

```bash
cd frontend
npm install
```

#### **Step 6: Start Frontend**

```bash
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 🔑 Default Admin Credentials

After running `npm run seed`:

- **Email:** admin@shunyamarg.org
- **Password:** admin123

**⚠️ IMPORTANT:** Change these credentials in production!

---

## 📚 API Endpoints

### **Authentication**
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user (protected)
POST   /api/auth/logout       - Logout user (protected)
```

### **Topics**
```
GET    /api/topics            - Get all topics (with search)
GET    /api/topics/:id        - Get single topic
POST   /api/topics            - Create topic (admin only)
PUT    /api/topics/:id        - Update topic (admin only)
DELETE /api/topics/:id        - Delete topic (admin only)
```

### **Q&A Management**
```
POST   /api/topics/:id/qa          - Add Q&A (admin only)
PUT    /api/topics/:id/qa/:qaId    - Update Q&A (admin only)
DELETE /api/topics/:id/qa/:qaId    - Delete Q&A (admin only)
```

### **Search Example**
```
GET /api/topics?search=meditation
GET /api/topics?active=true
```

---

## 💻 Usage Guide

### **For Regular Users**

1. **Browse Topics**: View all flipping cards on homepage
2. **Flip Cards**: Click any card to see description
3. **View Q&A**: Click "View Q&A" button to see questions
4. **Read Answers**: Click on any question to reveal answer
5. **Explore Details**: Click "Explore Full Topic" for complete info
6. **Search**: Use search bar to find specific topics
7. **Register/Login**: Create account to track progress

### **For Admins**

1. **Login**: Use admin credentials
2. **Access Dashboard**: Navigate to Admin Panel
3. **Manage Topics**:
   - Create new topics
   - Edit existing topics
   - Add/Edit/Delete Q&A pairs
   - Set topic order
   - Activate/Deactivate topics
4. **View Statistics**: See user counts, topic stats

---

## 🎨 Customization

### **Change Colors**

Edit `frontend/src/App.css`:
```css
:root {
  --primary-dark: #1a1a1a;      /* Main color */
  --accent-gold: #d4af37;       /* Accent color */
  --accent-teal: #008080;       /* Secondary accent */
  /* ... modify as needed */
}
```

### **Add New Topics**

Use the admin panel or directly via API:
```javascript
POST /api/topics
{
  "title": "New Topic",
  "icon": "🎯",
  "preview": "Preview text",
  "description": "Full description",
  "questionsAnswers": [
    {
      "question": "Your question?",
      "answer": "Your answer",
      "order": 1
    }
  ]
}
```

### **Modify Admin Credentials**

Edit `.env` file or seed script:
```env
ADMIN_EMAIL=youremail@domain.com
ADMIN_PASSWORD=yourSecurePassword
```

Then run: `npm run seed`

---

## 🌐 Deployment

### **Backend Deployment (Heroku / Railway)**

1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy backend
4. Update FRONTEND_URL in .env

### **Frontend Deployment (Vercel / Netlify)**

1. Build: `npm run build`
2. Deploy `build` folder
3. Set environment variable: `REACT_APP_API_URL=your-backend-url`

### **MongoDB Atlas Setup**

1. Create cluster at mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGODB_URI in .env

---

## 🛠️ Tech Stack

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### **Frontend**
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Toastify** - Notifications

---

## 📝 Environment Variables

### **Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/shunyamarg
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@shunyamarg.org
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin User
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🐛 Troubleshooting

### **MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- For Atlas, whitelist your IP

### **Port Already in Use**
```bash
# Change PORT in backend/.env
PORT=5001
```

### **CORS Error**
- Verify FRONTEND_URL in backend/.env
- Check CORS configuration in server.js

### **Authentication Issues**
- Clear browser localStorage
- Regenerate JWT_SECRET
- Check token expiration

---

## 📊 Database Schema

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### **Topic Model**
```javascript
{
  title: String (unique),
  icon: String,
  preview: String,
  description: String,
  slug: String (unique),
  questionsAnswers: [
    {
      question: String,
      answer: String,
      order: Number
    }
  ],
  isActive: Boolean,
  order: Number,
  createdBy: ObjectId (User),
  updatedBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ Helmet.js security headers
- ✅ CORS configuration

---

## 🎯 Features Breakdown

### **Card Interaction Flow**
1. **Initial State**: Shows front (icon, title, preview)
2. **First Click**: Flips to back (description, buttons)
3. **View Q&A Click**: Shows list of questions
4. **Question Click**: Expands to show answer
5. **Explore Click**: Navigate to full topic page

### **Search Functionality**
- Client-side instant search
- Backend API search
- Search across title, description, preview
- Real-time results

---

## 📧 Support

For issues or questions:
- Check this README
- Review API documentation
- Check console logs
- Verify environment variables

---

## 📄 License

© 2025 ShunyaMarg. All rights reserved.

---

## 🙏 Final Notes

**"The path towards the Zero Milestone — where journey and destination dissolve into the present moment."**

This MERN stack application is production-ready with:
- ✅ Complete authentication system
- ✅ Interactive UI with flipping cards
- ✅ Q&A functionality
- ✅ Admin panel for content management
- ✅ Search functionality
- ✅ Responsive design
- ✅ Clean, modern UI
- ✅ Comprehensive documentation

**Ready to deploy!** 🚀

---

**Version:** 2.0.0 (MERN Stack)  
**Last Updated:** October 2025
