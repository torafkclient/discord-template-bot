# Production-ready Lightweight Node.js Dockerfile
FROM node:20-alpine

# Set node environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package configurations and lockfile
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY src/ ./src/

# Start the application
CMD ["node", "src/index.js"]
