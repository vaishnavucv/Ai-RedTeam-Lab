'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');

const chatRouter = require('./routes/chat');
const scenariosRouter = require('./routes/scenarios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'llm01-lab-secret-do-not-deploy',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/chat', chatRouter);
app.use('/api/scenarios', scenariosRouter);

// Serve data files for UI preview (read-only)
app.get('/api/data/:filename', (req, res) => {
  const filename = path.basename(req.params.filename); // prevent traversal
  const filePath = path.join(__dirname, 'data', filename);
  if (!require('fs').existsSync(filePath)) return res.status(404).send('Not found');
  res.type('text/plain').sendFile(filePath);
});

// Serve the active system prompt so learners can see what the model was instructed to be
app.get('/api/prompt', (req, res) => {
  const fs = require('fs');
  const filePath = path.join(__dirname, 'prompts', 'vulnerable-system.txt');
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Prompt file not found' });
  res.json({ content: fs.readFileSync(filePath, 'utf8') });
});

// Serve markdown doc files for the guide viewer
app.get('/api/docs/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  if (!filename.endsWith('.md')) return res.status(400).send('Only .md files are served here');
  const filePath = path.join(__dirname, 'docs', filename);
  if (!require('fs').existsSync(filePath)) return res.status(404).send('Not found');
  res.type('text/plain; charset=utf-8').sendFile(filePath);
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`LLM01 Prompt Injection Lab running at http://localhost:${PORT}`);
});

