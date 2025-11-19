#!/bin/bash

echo "🚀 Starting Calling Agent Admin Panel..."
echo ""

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Port $port is in use"
        return 0
    else
        echo "❌ Port $port is not in use"
        return 1
    fi
}

echo "📋 Checking system status..."

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed ($(node --version))"
else
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo "✅ npm is installed ($(npm --version))"
else
    echo "❌ npm is not installed"
    exit 1
fi

echo ""
echo "🔍 Checking server status..."

# Check backend server (port 8080)
if check_port 8080; then
    echo "✅ Backend server is running on port 8080"
else
    echo "❌ Backend server is not running on port 8080"
    echo "   Run: cd server && npm run dev"
fi

# Check frontend server (port 5173)
if check_port 5173; then
    echo "✅ Frontend server is running on port 5173"
else
    echo "❌ Frontend server is not running on port 5173"
    echo "   Run: cd client && npm run dev"
fi

echo ""
echo "📝 To start the application:"
echo "1. Backend:  cd server && npm run dev"
echo "2. Frontend: cd client && npm run dev"
echo "3. Open:     http://localhost:5173"
echo ""
echo "🔧 Debug endpoints:"
echo "- API Health:    http://localhost:8080/api/health"
echo "- Connection:    http://localhost:8080/api/debug/test-connection"
echo "- Database Test: http://localhost:8080/api/debug/test-users"