FROM node:20-alpine

# curl is needed by the entrypoint to wait for Ollama and pull the model
RUN apk add --no-cache curl

WORKDIR /app

# Install dependencies first (layer cached separately from source)
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source
COPY . .

# Ensure logs directory exists inside the image
RUN mkdir -p logs

# Entrypoint script waits for Ollama, pulls the model, then starts the server
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]
