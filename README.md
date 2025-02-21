# 🏡 Real Estate Platform (MERN Stack)

A **MERN stack-based real estate platform** that enables users to **list, buy, and rent properties** with an intuitive interface and secure authentication. The platform connects landlords and tenants, allowing them to interact via a built-in chat system.  

---

## 🌟 Features

- **User Authentication** – Secure login and registration with JWT  
- **Property Listings** – Users can add, edit, and delete property listings  
- **Search & Filters** – Find properties based on location, price, size, and amenities  
- **Saved Listings** – Users can save properties for future reference  
- **Chat System** – Real-time chat between property owners and potential buyers/tenants  
- **Geolocation Support** – Store and display property locations using latitude and longitude  
- **Scalability & Security** – Built with **MongoDB, Prisma ORM, and Express API**  

---

## 🛠️ Tech Stack

| Technology  | Usage |
|------------|-------|
| **MongoDB** | NoSQL database for storing user and property data |
| **Prisma ORM** | ORM for managing MongoDB efficiently |
| **Express.js** | Backend framework for API development |
| **React.js** | Frontend framework for building UI |
| **Node.js** | Server-side JavaScript runtime |
| **JWT Authentication** | Secure authentication system |
| **Cloudinary** | Image hosting and management for property images |
| **Tailwind CSS** | Styling for a modern and responsive UI |

---

## 📁 Project Structure

```
/api
  ├─ models/         # Database models
  ├─ routes/         # API routes
  ├─ controllers/    # Business logic
  ├─ middleware/     # Authentication and error handling
  ├─ config/         # Configuration files
  └─ server.js       # Main backend server

/client
  ├─ src/
  ├─ components/     # Reusable UI components
  ├─ pages/          # Page views
  ├─ hooks/          # Custom hooks
  ├─ App.js          # Main application file
  └─ index.js        # Entry point for React app
```

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/blitzbugg/propease.git
cd propease
```

### 2️⃣ Install Dependencies  

#### api  
```sh
cd api
npm install
```

#### client  
```sh
cd client
npm install
```

### 3️⃣ Configure Environment Variables  

Create a **.env** file inside `api/` and add:  

```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
PORT=5000
```

### 4️⃣ Start the Application  

#### Start Backend Server  
```sh
cd api
npm run dev
```

#### Start client  
```sh
cd client
npm run dev
```

---

## 📌 API Endpoints  

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Login and get JWT token |
| **POST** | `/api/properties` | Create a new property listing |
| **GET** | `/api/properties` | Get all property listings |
| **GET** | `/api/properties/:id` | Get details of a specific property |
| **PUT** | `/api/properties/:id` | Update property details |
| **DELETE** | `/api/properties/:id` | Delete a property listing |
| **POST** | `/api/chat` | Start a new chat conversation |
| **GET** | `/api/chat/:id` | Fetch messages for a chat |

---

## 🤝 Contribution Guidelines  

1. **Fork** the repository  
2. **Create a feature branch** (`feature-xyz`)  
3. **Commit your changes** (`git commit -m "Added XYZ feature"`)  
4. **Push the branch** (`git push origin feature-xyz`)  
5. **Submit a Pull Request** 🚀  

---

## Project Architecture
[View on Eraser![](https://app.eraser.io/workspace/8PB7mu3LIwB1Lxn2uKgi/preview?elements=NSi8H18q7NPVjMKInvHsrQ&type=embed)](https://app.eraser.io/workspace/8PB7mu3LIwB1Lxn2uKgi?elements=NSi8H18q7NPVjMKInvHsrQ)

### 🚀 Built with ❤️ by [Ananthapadmanabhan M](https://github.com/blitzbugg)  

