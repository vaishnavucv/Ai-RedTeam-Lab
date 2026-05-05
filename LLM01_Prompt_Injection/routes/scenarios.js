'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const SCENARIOS_DIR = path.join(__dirname, '..', 'scenarios');

// GET /api/scenarios — return all scenario metadata
router.get('/', (req, res) => {
  const files = fs.readdirSync(SCENARIOS_DIR).filter(f => f.endsWith('.json'));
  const scenarios = files
    .map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(SCENARIOS_DIR, f), 'utf8'));
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.id.localeCompare(b.id));
  res.json(scenarios);
});

module.exports = router;

