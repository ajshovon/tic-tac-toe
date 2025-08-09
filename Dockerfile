# Build stage
FROM node:22-alpine AS builder

# Set build arguments
ARG VITE_APP_TITLE="Tic Tac Toe"

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# ENV NODE_ENV=development
# Install dependencies with npm ci for faster, reliable builds
RUN npm install --include=dev

# Copy source code
COPY . .

# Set environment variables
ENV VITE_APP_TITLE=${VITE_APP_TITLE}

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Create user and group for running nginx
RUN addgroup -S node && adduser -S node -G node

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Change ownership of nginx files to non-root user
RUN chown -R node:node /usr/share/nginx/html && \
  chown -R node:node /var/cache/nginx && \
  chown -R node:node /var/log/nginx && \
  chown -R node:node /etc/nginx/conf.d

# Switch to non-root user
USER node

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]