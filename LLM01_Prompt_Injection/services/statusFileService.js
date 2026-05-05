'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_STATUS_DIR = '/tmp';
const SCENARIO_TYPE_RE = /^type(\d+)$/;

function getStatusDir() {
  return process.env.TASK_STATUS_DIR || DEFAULT_STATUS_DIR;
}

function getTaskName(scenarioType) {
  const match = SCENARIO_TYPE_RE.exec(scenarioType || '');
  if (!match) return null;
  return `T${match[1]}`;
}

/**
 * Persist a host-visible success marker for a completed task.
 *
 * @param {string} scenarioType - Scenario id such as "type1"
 * @returns {string|null} Absolute path written, or null when scenarioType is invalid
 */
function writeSuccessFile(scenarioType) {
  const taskName = getTaskName(scenarioType);
  if (!taskName) return null;

  const statusDir = getStatusDir();
  const filePath = path.join(statusDir, `${taskName}.txt`);

  fs.mkdirSync(statusDir, { recursive: true });
  fs.writeFileSync(filePath, `${taskName} have Successfully exploited`, 'utf8');

  return filePath;
}

module.exports = { writeSuccessFile };

