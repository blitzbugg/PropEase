# 🏡 PropEase - Real Estate Platform

A modern real estate platform built with a microservices architecture that enables users to list, buy, and rent properties with an intuitive interface and secure authentication. The platform connects landlords and tenants, allowing them to interact via a built-in real-time chat system.

---

## 🌟 Features

- **User Authentication** – Secure login and registration with JWT
- **Property Listings** – Users can add, edit, and delete property listings
- **Search & Filters** – Find properties based on location, price, size, and amenities
- **Saved Listings** – Users can save properties for future reference
- **Real-time Chat** – Instant messaging between property owners and potential buyers/tenants
- **Interactive Maps** – Property location visualization using Leaflet
- **Rich Text Editor** – Property descriptions with image support using TipTap
- **Responsive Design** – Mobile-friendly interface with Tailwind CSS

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **MongoDB** - NoSQL database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **Leaflet** - Interactive maps
- **TipTap** - Rich text editor

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server
- **Vite** - Frontend development server

---

## 📁 Project Structure

```
/api
  ├─ controllers/    # Business logic handlers
  ├─ routes/         # API route definitions
  ├─ lib/            # Utility functions
  ├─ middleware/     # Authentication and error handling
  ├─ prisma/         # Database schema and migrations
  └─ app.js          # Main backend server

/client
  ├─ src/            # Source code
  ├─ public/         # Static assets
  ├─ node_modules/   # Dependencies
  └─ vite.config.js  # Vite configuration

/socket
  ├─ app.js          # Socket.IO server
  └─ node_modules/   # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/blitzbugg/propease.git
cd propease
```

### 2️⃣ Install Dependencies

#### API Server
```sh
cd api
npm install
```

#### Client
```sh
cd client
npm install
```

#### Socket Server
```sh
cd socket
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the `api` directory:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4️⃣ Start the Development Servers

#### Start API Server
```sh
cd api
npm run watch
```

#### Start Socket Server
```sh
cd socket
npm run watch
```

#### Start Client
```sh
cd client
npm run dev
```

---

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create a new property
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Chat
- `GET /api/chat` - Get chat history
- `POST /api/chat` - Start new chat
- `GET /api/chat/:id` - Get specific chat

---

## 🤝 Contribution Guidelines

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

[Ananthapadmanabhan M](https://github.com/blitzbugg)

