import path from 'path';
import express from 'express';
import cors from 'cors';
import { feedbackDataType } from './dataModel/feedback.model';

const app = express();
const port = 5000;

let feedbackList: feedbackDataType[] = [];


// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
app.get('/api/feedback', (req, res) => {
  res.json(feedbackList);
});

app.post('/api/feedback', (req, res) => {
  const { name, feedback } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  feedbackList.push({ id: generateId(), name, feedback });
  return res.status(201).json({ message: 'Feedback added successfully' });
});

// Serve the React app for any request that doesn't match an API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Generate a unique ID for new feedback
function generateId(): number {
  return Math.max(...feedbackList.map((f) => f.id), 0) + 1;
}
