@echo off
:: Windows batch script to start both backend and frontend
where concurrently >nul 2>nul
if %ERRORLEVEL%==0 (
  concurrently "npm run start --prefix backend" "npm run start --prefix kwikkconnect"
) else (
  echo 'concurrently' is not installed. Installing it globally...
  npm install -g concurrently
  concurrently "npm run start --prefix backend" "npm run start --prefix kwikkconnect"
) 