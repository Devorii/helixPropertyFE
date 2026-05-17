# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/build ./build
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# Expose port 3000
EXPOSE 3000

# Add healthcheck for AWS ECS/EKS
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Add metadata labels
LABEL maintainer="info@devorii.com"
LABEL version="1.0"

# Start the application
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "-s", "./build", "-l", "3000"]

