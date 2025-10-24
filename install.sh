#!/bin/bash

echo "🕉️  Installing ShunyaMarg MERN Stack..."
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. cd backend && cp .env.example .env"
echo "2. Edit .env with your MongoDB URI"
echo "3. cd backend && npm run seed"
echo "4. Run: ./start.sh (or start both servers manually)"
