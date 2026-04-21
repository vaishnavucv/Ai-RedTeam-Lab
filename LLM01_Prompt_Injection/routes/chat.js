'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const { chat } = require('../services/ollamaService');
const { buildMessages } = require('../services/promptBuilder');
const { evaluate } = require('../services/evaluator');
const { log } = require('../services/logService');
const { writeSuccessFile } = require('../services/statusFileService');

const router = express.Router();
const SCENARIOS_DIR = path.join(__dirname, '..', 'scenarios');
const DATA_DIR = path.join(__dirname, '..', 'data');

function loadScenario(type) {
  // Files are named type1-direct-override.json etc — match by prefix
  const files = fs.readdirSync(SCENARIOS_DIR).filter(f => f.startsWith(`${type}-`) && f.endsWith('.json'));
  if (files.length === 0) throw new Error(`Unknown scenario: ${type}`);
  return JSON.parse(fs.readFileSync(path.join(SCENARIOS_DIR, files[0]), 'utf8'));
}

function loadDataFile(filename) {
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return '';
  return fs.readFileSync(file, 'utf8');
}

// POST /api/chat
router.post('/', async (req, res) => {
  const {
    scenarioType,           // e.g. "type1"
    userInput,
    dataFile,               // for type5: 'clean' or 'poisoned'
    resetHistory,           // boolean — clear session history
  } = req.body;
  const mode = 'vulnerable'; // always vulnerable — this is an attacker-perspective lab

  if (!scenarioType || !userInput) {
    return res.status(400).json({ error: 'scenarioType and userInput are required.' });
  }

  let scenario;
  try {
    scenario = loadScenario(scenarioType);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  // Session-based conversation history (Type 4 multi-turn)
  if (!req.session.histories) req.session.histories = {};
  const histKey = `${scenarioType}_${mode}`;

  if (resetHistory) {
    req.session.histories[histKey] = [];
  }

  const history = req.session.histories[histKey] || [];

  // Retrieved context (Type 5 indirect injection)
  let retrievedContext = '';
  if (scenario.usesRetrievedContext) {
    const fileKey = dataFile || 'clean';
    const filename = scenario.dataFiles?.[fileKey] || 'internal_policy.txt';
    retrievedContext = loadDataFile(filename);
  }

  // Build messages array
  const messages = buildMessages({
    scenario,
    mode,
    userInput,
    history,
    retrievedContext,
  });

  // Call Ollama
  let modelResponse;
  try {
    modelResponse = await chat(messages);
  } catch (err) {
    return res.status(502).json({ error: `Ollama error: ${err.message}` });
  }

  // Persist this turn to session history (for multi-turn)
  if (scenario.usesMemory) {
    const updatedHistory = [
      ...history,
      { role: 'user', content: userInput },
      { role: 'assistant', content: modelResponse },
    ];
    req.session.histories[histKey] = updatedHistory;
  }

  // Evaluate attack result
  const { success, matched } = evaluate(modelResponse, scenario.successIndicators);

  if (success) {
    try {
      writeSuccessFile(scenarioType);
    } catch (err) {
      console.error(`Failed to write task status file for ${scenarioType}:`, err.message);
    }
  }

  // Log interaction
  log({
    scenarioType,
    mode,
    userInput,
    modelResponse,
    attackSuccess: success,
    matched,
    dataFile: dataFile || null,
    historyLength: history.length,
  });

  res.json({
    response: modelResponse,
    attackSuccess: success,
    matched,
    scenario: {
      id: scenario.id,
      name: scenario.name,
      goal: scenario.goal,
      whyDangerous: scenario.whyDangerous || null,
      onSuccess: scenario.onSuccess || null,
      onFail: scenario.onFail || null,
      defenderNote: scenario.defenderNote || null,
    },
    historyLength: scenario.usesMemory
      ? (req.session.histories[histKey] || []).length / 2
      : 0,
    retrievedContext: retrievedContext || null,
  });
});

// POST /api/chat/reset — clear session history for a scenario
router.post('/reset', (req, res) => {
  const { scenarioType } = req.body;
  if (!req.session.histories) req.session.histories = {};
  const histKey = `${scenarioType}_vulnerable`;
  req.session.histories[histKey] = [];
  res.json({ ok: true, message: `History cleared for ${histKey}` });
});

module.exports = router;
