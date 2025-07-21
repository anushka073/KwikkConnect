#!/bin/bash

echo "🚀 Starting KwikkConnect Backend and Web App..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping all servers..."
    kill $BACKEND_PID $WEBAPP_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "📡 Starting backend server on port 4000..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start web app
echo "🌐 Starting web app on port 4028..."
cd kwikkconnect
npm start &
WEBAPP_PID=$!
cd ..

echo "✅ All servers started!"
echo "📱 Backend API: http://localhost:4000"
echo "🌐 Web App: http://localhost:4028"
echo "👨‍💼 Expert Dashboard: http://localhost:4028/expert-dashboard"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for background processes
wait 