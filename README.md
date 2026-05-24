#  FindMyItem – Campus Lost & Found Portal

FindMyItem is a **full-stack web application** that helps students report and recover lost items within a campus.  
Users can **post lost items, post found items, and chat in real time** to return belongings quickly.


##  Live Demo

**Frontend:** 
https://frontend-six-delta-14.vercel.app/

**Backend API:**  
https://findmyitem-qt8b.onrender.com


##  Problem Statement

On large campuses, students frequently lose items such as:

- ID cards
- Mobile phones
- Keys
- Wallets
- Books

There is **no centralized system** connecting people who **lost items** with those who **found them**.

**FindMyItem solves this problem** by providing a digital platform for reporting and recovering lost items.

##  Features

- **Authentication** – User signup, login
- **Lost & Found Posts** – Report lost items or post found items with images  
- **Smart Matching** – Automatically matches lost and found items using Fuse.js  
- **Real-time Chat** – Direct communication between users via Socket.io  
- **Image Uploads** – Item images stored securely with Cloudinary  
- **Responsive Design** – Works smoothly on mobile, tablet, and desktop

## Tech Stack
**Frontend**  
React.js, Vite, Axios

**Backend**  
Node.js, Express.js, MongoDB Atlas

**Other Tools**  
Socket.io, Cloudinary, Multer, Nodemailer

**Deployment**  
Vercel (Frontend) • Render (Backend)

##  Project Structure

```
FindMyItem
│
├── Backend
│   ├── config
│   │   └── db.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Message.js
│   │
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── matchRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── Frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── context
    │   └── App.jsx
    │
    └── package.json
```


## Installation (Local Setup)

### Clone the Repository

```bash
git clone https://github.com/sindhuja-80/FindMyItem.git
cd FindMyItem
```


## Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Run backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```


## Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

## Deployment

### Backend Deployment (Render)

1. Push project to GitHub  
2. Go to https://render.com  
3. Create **New Web Service**  
4. Connect GitHub repository  

Set commands:

Build Command

```
npm install
```

Start Command

```
npm start
```

Add environment variables in Render dashboard.

Backend URL

```
https://findmyitem-qt8b.onrender.com
```

### Frontend Deployment (Vercel)

1. Go to https://vercel.com  
2. Import GitHub repository  

Add environment variable:

```
VITE_API_URL=https://findmyitem-qt8b.onrender.com
```

Deploy.

Frontend URL

```
https://findmyitem-frontend.vercel.app
```



## API Routes

### Authentication

```
POST /api/users/signup
POST /api/users/login
POST /api/users/verify-otp
```

### Items

```
GET /api/items
POST /api/items
GET /api/items/:id
```

### Matching

```
GET /api/match
```

### Chat

```
GET /api/messages/:userId
POST /api/messages
```


## Socket.io Events

```
SendMessage
receiveMessage
```

Used for **real-time chat between users**.

## Author

**Sindhuja**

GitHub  
https://github.com/sindhuja-80


## Future Improvements

- AI-based item image matching  
- Push notifications  
- Admin dashboard  
- Mobile application  


## License

This project is licensed under the **MIT License**.
