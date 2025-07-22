# 🚀 KwikkConnect - Case Management & Expert Notification System

KwikkConnect is a **comprehensive case management platform** designed for real-time collaboration between support engineers and domain experts. With a seamless **web dashboard** and a **mobile-friendly Android app**, the system streamlines expert discovery, incident resolution, and smart postmortem generation.

---

## 📦 Project Structure
```
kwikkconnect/     # Web Application (React + Vite)
backend/          # Node.js Backend API
android-app/      # Android Application Template
start-all.sh      # Unix script to run backend + frontend
start-all.bat     # Windows batch script
```

---

## ✨ Features

### 🌐 Web Application
- Case management dashboard
- AI-based expert matching
- Real-time chat collaboration (Swarm Room)
- Timeline tracking for every incident
- AI-powered postmortem generator
- Browser notification system
- Notes and documentation upload
- Case sharing with link support

### 👨‍💻 Expert Dashboard
- View assigned/open Cases
- Accept/Reject case invitations
- Track live status updates
- Receive smart suggestions via AI Assistant
- Notification control & expert stats overview

### ⚙️ Backend API (Node.js)
- RESTful APIs for case + expert management
- Real-time expert notification triggering
- In-memory storage for demo (can be replaced with DB)
- CORS enabled for frontend connectivity

### 📱 Android App (Material UI Template)
- Expert login/authentication
- Case tracking and push notifications
- Mobile-first case status updates
- API-integrated with backend

---

## 🛠️ Setup Instructions

### ✅ Prerequisites
- Node.js v16+
- npm or yarn
- Android Studio (for mobile app)
- Modern browser (Chrome/Firefox/Edge)

### 🚀 Quick Start
```bash
# 1. Clone the repo
$ git clone https://github.com/your-org/kwikkconnect.git && cd kwikkconnect

# 2. Install frontend dependencies
$ cd kwikkconnect && npm install

# 3. Install backend dependencies
$ cd ../backend && npm install

# 4. Start all services
$ ./start-all.sh       # For Unix
# or
$ start-all.bat        # For Windows
```

Then open: [http://localhost:4028](http://localhost:4028) in your browser.

---

## 🔌 API Endpoints

### Expert APIs
- `POST /api/experts/register`
- `GET /api/experts`
- `PUT /api/experts/:id`

### Case APIs
- `POST /api/cases/create`
- `GET /api/cases`
- `PUT /api/cases/:id/assign`
- `POST /api/cases/:id/resolve`

---

## 🔔 Notification System
- Experts are notified via **browser notifications** when:
  - A new Case is escalated to them
  - There is a chat or timeline update
- Experts can manage notifications from the dashboard

---


## 🤝 Contributions
Contributions and feature requests are welcome! Submit issues or PRs through GitHub.

---

## 👨‍💼 Maintained By
**Team KwikkConnect** — Streamlining expert resolution workflows, one case at a time.
