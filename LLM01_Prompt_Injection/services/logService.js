'use strict';

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'logs', 'interactions.jsonl');

/**
 * Append one interaction record to the JSONL log.
 *
 * @param {object} entry
 */
function log(entry) {
  const line = JSON.stringify({ ...entry, timestamp: new Date().toISOString() }) + '\n';
  fs.appendFileSync(LOG_FILE, line, 'utf8');
}

module.exports = { log };

