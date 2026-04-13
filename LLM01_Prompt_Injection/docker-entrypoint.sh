#!/bin/sh
set -e

OLLAMA_BASE="${OLLAMA_HOST:-http://host.docker.internal:11434}"
MAX_RETRIES=15

echo "-----------------------------------------------"
echo " LLM01 Prompt Injection Lab"
echo "-----------------------------------------------"
echo " Connecting to host Ollama at ${OLLAMA_BASE} ..."

# Verify the host Ollama API is reachable from inside the container.
# Ollama must already be running on the Ubuntu host before starting this container.
RETRIES=0
until curl -sf "${OLLAMA_BASE}" > /dev/null 2>&1; do
  RETRIES=$((RETRIES + 1))
  if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
    echo ""
    echo " ERROR: Cannot reach Ollama at ${OLLAMA_BASE} after ${MAX_RETRIES} attempts."
    echo ""
    echo " Fix: Make sure Ollama is running on the host:"
    echo "   ollama serve"
    echo ""
    echo " Then restart the container:"
    echo "   docker compose restart lab"
    exit 1
  fi
  printf '.'
  sleep 2
done

echo ""
echo " Ollama is reachable."
echo " Starting lab server on port ${PORT:-3001} ..."
echo "-----------------------------------------------"

exec node server.js
