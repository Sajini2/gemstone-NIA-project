#!/bin/bash
echo "Setting up Python environment..."
python3 -m venv venv
source venv/bin/activate

echo "Installing backend dependencies..."
pip install -r requirements.txt
pip install -r backend/requirements.txt

echo "Installing frontend dependencies..."
cd dashboard-demo
npm install
cd ..

echo "Starting Backend Server..."
# Start backend in the background
cd backend
python app.py &
BACKEND_PID=$!
cd ..

echo "Starting Frontend Server..."
cd dashboard-demo
npm run dev &
FRONTEND_PID=$!

echo "Both servers are running!"
echo "Press Ctrl+C to stop both servers."

# Wait for user to press Ctrl+C, then kill both processes
trap "echo 'Stopping servers...'; kill $BACKEND_PID; kill $FRONTEND_PID; exit" SIGINT SIGTERM

wait
