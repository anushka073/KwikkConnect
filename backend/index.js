require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demo
const experts = {}; // { email: { name, isOnline } }
const cases = []; // { id, title, description, priority, assignedTo, status, createdAt }

// Register expert
app.post('/api/register-expert', (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) return res.status(400).json({ error: 'Missing email or name' });
  experts[email] = { name, isOnline: true };
  res.json({ success: true, expert: experts[email] });
});

// Create a new case
app.post('/api/create-case', (req, res) => {
  const { title, description, priority, assignedTo } = req.body;
  const id = 'CASE-' + (cases.length + 1).toString().padStart(4, '0');
  const newCase = { 
    id, 
    title, 
    description, 
    priority, 
    assignedTo,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  cases.push(newCase);
  res.json({ success: true, case: newCase });
});

// Get all cases
app.get('/api/cases', (req, res) => {
  res.json({ cases });
});

// Get cases assigned to specific expert
app.get('/api/expert/:email/cases', (req, res) => {
  const { email } = req.params;
  const expertCases = cases.filter(c => c.assignedTo === email);
  res.json({ cases: expertCases });
});

// Get all experts
app.get('/api/experts', (req, res) => {
  res.json({ experts });
});

// Update case status
app.put('/api/cases/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const caseIndex = cases.findIndex(c => c.id === id);
  if (caseIndex === -1) return res.status(404).json({ error: 'Case not found' });
  cases[caseIndex].status = status;
  res.json({ success: true, case: cases[caseIndex] });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 