#!/bin/bash

echo "🕉️  Starting ShunyaMarg MERN Application..."
echo ""

# Start backend
echo "📡 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "⚛️  Starting Frontend React App..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers started!"
echo "📡 Backend: http://localhost:5000"
echo "⚛️  Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
wait
