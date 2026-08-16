@echo off
echo Setting up Python environment...
python -m venv venv
call venv\Scripts\activate.bat

echo Installing backend dependencies...
pip install -r requirements.txt
pip install -r backend\requirements.txt

echo Installing frontend dependencies...
cd dashboard-demo
call npm install
cd ..

echo Starting Backend Server...
cd backend
start "Gemstone Backend" cmd /c "..\venv\Scripts\activate.bat && python app.py"
cd ..

echo Starting Frontend Server...
cd dashboard-demo
start "Gemstone Frontend" cmd /c "npm run dev"
cd ..

echo Both servers are starting in new windows!
