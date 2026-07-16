# ShopEZ - Complete MERN Stack E-Commerce Application

A full-stack e-commerce application built with modern web technologies.

## Tech Stack

**Frontend:**
- React.js (UI Library)
- Bootstrap 5 (CSS Framework)
- Axios (HTTP Client)
- Vite (Build Tool)
- HTML5, CSS3, JavaScript (ES6+)

**Backend:**
- Node.js (JavaScript Runtime)
- Express.js (Web Framework)
- MongoDB (Database with Mongoose ODM)
- JWT (JSON Web Token for Authentication)
- Bcrypt (Password Hashing)
- CORS (Cross-Origin Resource Sharing)

## Project Structure

```
shopez-project/
├── backend/
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # React entry point
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── ProductList.jsx
│   │       ├── Cart.jsx
│   │       └── Auth.jsx
│   ├── index.html          # HTML entry point
│   ├── vite.config.js      # Vite configuration
│   ├── package.json        # Frontend dependencies
│   └── .env                # Frontend environment variables
└── .git/                   # Git repository
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```
PORT=5000
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/shopez
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port)

## Features

- **Product Browse**: View all available products with details
- **Shopping Cart**: Add/remove products and manage quantities
- **User Authentication**: Register and login with JWT tokens
- **User Profile**: Personalized greeting after login
- **Responsive Design**: Bootstrap-powered responsive UI
- **Real-time Updates**: Cart updates stored in localStorage

## API Endpoints

### Products
- `GET /api/products` - Get all products

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile (requires JWT)

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT signing
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment mode (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm test         # Run tests
```

## Technologies Used

### HTML/CSS/JavaScript
- Semantic HTML5
- CSS3 with Bootstrap 5
- ES6+ JavaScript with async/await

### React.js
- Functional Components with Hooks
- State Management with useState
- Effects with useEffect
- Local Storage integration

### Node.js & Express.js
- RESTful API design
- Middleware integration (CORS, JSON parsing)
- Error handling

### MongoDB & Mongoose
- Schema-based data modeling
- Data validation
- Indexing

### JWT Authentication
- Secure token generation
- Token-based authentication
- Password hashing with bcrypt

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.
