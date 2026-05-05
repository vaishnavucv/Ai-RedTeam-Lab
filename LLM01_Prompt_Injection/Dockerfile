FROM node:20-alpine

# curl is used by the entrypoint to verify host Ollama is reachable before starting
RUN apk add --no-cache curl

WORKDIR /app

# Install Node dependencies first — cached separately from source code changes
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source
COPY . .

# Ensure logs directory exists inside the image
RUN mkdir -p logs

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]

