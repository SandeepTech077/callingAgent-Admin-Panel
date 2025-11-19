# 🔧 Troubleshooting Guide: 404 Error on Edit User

## Problem Description
When clicking the "Edit" button on a user, you see a 404 page instead of the edit form.

## Root Cause Analysis
The 404 error occurs because either:
1. **Backend server is not running**
2. **API endpoint is not accessible** 
3. **Authentication issues**
4. **Database connection problems**

## ✅ Step-by-Step Fix

### Step 1: Start the Backend Server
```bash
cd server
npm install  # Install dependencies if needed
npm run dev  # Start the development server
```

**Expected Output:**
```
🚀 Server is running on port 8080
📍 Environment: development
🌐 Access the server at: http://localhost:8080
```

### Step 2: Start the Frontend Server
```bash
cd client
npm install  # Install dependencies if needed
npm run dev  # Start the development server
```

**Expected Output:**
```
  Local:   http://localhost:5173/
  Network: use --host to expose
```

### Step 3: Test API Connectivity

#### Test 1: Basic Server Health
Open browser: `http://localhost:8080/api/health`

**Expected Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-11-06T..."
}
```

#### Test 2: Debug Connection
Open browser: `http://localhost:8080/api/debug/test-connection`

**Expected Response:**
```json
{
  "success": true,
  "message": "API connection is working!",
  "timestamp": "2025-11-06T...",
  "environment": "development"
}
```

#### Test 3: Database Connection
Open browser: `http://localhost:8080/api/debug/test-users`

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connection is working!",
  "userCount": 1,
  "timestamp": "2025-11-06T..."
}
```

### Step 4: Test User API Endpoints

#### Get All Users
```bash
curl http://localhost:8080/api/users
```

#### Get Single User (replace USER_ID)
```bash
curl http://localhost:8080/api/users/USER_ID
```

### Step 5: Check Authentication
If you get authentication errors, make sure you're logged in:
1. Go to `http://localhost:5173/login`
2. Login with your credentials
3. Try editing a user again

## 🚨 Common Issues & Solutions

### Issue: "Server is not running"
**Solution:** Start the backend server first
```bash
cd server && npm run dev
```

### Issue: "Cannot connect to database"
**Solution:** 
1. Make sure MongoDB is running
2. Check your `.env` file in the server folder
3. Verify database connection string

### Issue: "401 Unauthorized"
**Solution:**
1. Make sure you're logged in
2. Check if your JWT token is valid
3. Clear browser localStorage and login again

### Issue: "Route not found"
**Solution:**
1. Verify the route exists in `server/src/routes/userRoutes.js`
2. Check if routes are properly imported in `server/src/routes/index.js`
3. Restart the server

## 🧪 Testing the Edit Functionality

1. **Start both servers** (backend on :8080, frontend on :5173)
2. **Open** `http://localhost:5173`
3. **Login** to the admin panel
4. **Navigate** to Users page
5. **Click Edit** on any user
6. **Verify** you see the edit form instead of 404

## 🔍 Debug Information

### Current API Endpoints:
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user ✅ **This is what the edit page needs**
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/status` - Toggle user status

### Frontend Route:
- Edit User Page: `/dashboard/users/edit/:id`

### Files to Check:
- **Backend Controller:** `server/src/controllers/userController.js`
- **Backend Routes:** `server/src/routes/userRoutes.js`
- **Frontend Edit Page:** `client/src/pages/EditUser.tsx`
- **Frontend API:** `client/src/api/users.ts`

## 🎯 Quick Fix Commands

Run these commands in order:

```bash
# 1. Start backend
cd server && npm run dev &

# 2. Start frontend  
cd client && npm run dev &

# 3. Test API
curl http://localhost:8080/api/health

# 4. Open application
open http://localhost:5173
```

If you still get 404 errors after following these steps, please share the console logs from both the browser and the server terminal.