#!/bin/sh
set -e

OLLAMA_BASE="${OLLAMA_HOST:-http://ollama:11434}"
MODEL="tinyllama"

echo "-----------------------------------------------"
echo " LLM01 Prompt Injection Lab"
echo "-----------------------------------------------"
echo " Waiting for Ollama at ${OLLAMA_BASE} ..."

# Wait until Ollama HTTP API responds
until curl -sf "${OLLAMA_BASE}" > /dev/null 2>&1; do
  printf '.'
  sleep 3
done

echo ""
echo " Ollama is ready."
echo " Pulling ${MODEL} model (first run downloads ~638 MB) ..."

# Pull the model via REST API. If already cached in the volume, this returns instantly.
curl -sf -X POST "${OLLAMA_BASE}/api/pull" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"${MODEL}\",\"stream\":false}" > /dev/null

echo " Model ready."
echo " Starting lab server on port ${PORT:-3001} ..."
echo "-----------------------------------------------"

exec node server.js
