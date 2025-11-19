# Admin Panel API Setup

This guide will help you set up the complete authentication system with MongoDB, Node.js API, and React frontend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/admin_panel

# Start MongoDB (if running locally)
# On macOS with Homebrew: brew services start mongodb-community
# On Linux: sudo systemctl start mongod
# On Windows: net start MongoDB

# Seed the database with initial admin user
npm run seed

# Start the server
npm run dev
```

### 2. Client Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Default Login**: 
  - Email: `admin@admin.com`
  - Password: `admin123`

## 📁 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/login` | Admin login | Public |
| POST | `/api/auth/refresh` | Refresh access token | Public |
| GET | `/api/auth/me` | Get current admin profile | Private |
| POST | `/api/auth/logout` | Admin logout | Private |

### Example API Calls

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

#### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🗄️ Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'super-admin']),
  isActive: Boolean,
  lastLogin: Date,
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: Using bcryptjs with salt rounds of 12
- **JWT Tokens**: Access tokens (24h) + Refresh tokens (7d)
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured for frontend domain
- **Helmet.js**: Security headers
- **Rate Limiting**: Coming soon

## 🛠️ Development

### Adding New API Endpoints

1. Create controller in `server/controllers/`
2. Add routes in `server/routes/`
3. Add validation in `server/validators/`
4. Update frontend API service in `client/src/api/`

### Environment Variables

#### Server (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/admin_panel
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
CLIENT_URL=http://localhost:5173
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in server/.env
   - Verify network connectivity

2. **CORS Errors**
   - Check CLIENT_URL in server/.env
   - Verify frontend is running on correct port

3. **JWT Token Issues**
   - Check JWT_SECRET in server/.env
   - Clear browser localStorage if tokens are corrupted

4. **Login Fails**
   - Run `npm run seed` to create admin user
   - Verify email/password combination

## 📦 Production Deployment

### Server
- Set NODE_ENV=production
- Use strong JWT secrets
- Configure MongoDB Atlas or production database
- Set up reverse proxy (nginx)
- Enable rate limiting

### Client
- Build with `npm run build`
- Serve static files
- Update VITE_API_URL to production API

## 🔄 API Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "message": string,
  "data": object | null,
  "errors": array | null
}
```

### Success Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "admin": {
      "id": "admin_id",
      "name": "Admin Name",
      "email": "admin@example.com"
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```