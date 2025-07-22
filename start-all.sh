#!/bin/sh
# This script starts both backend and frontend servers

# Check if 'concurrently' is installed, if not, provide instructions
if command -v concurrently >/dev/null 2>&1; then
  concurrently "npm run start --prefix backend" "npm run start --prefix kwikkconnect"
else
  echo "'concurrently' is not installed. Installing it globally..."
  npm install -g concurrently
  concurrently "npm run start --prefix backend" "npm run start --prefix kwikkconnect"
fi 