# Use lightweight Node.js Alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Install pnpm globally (not included by default)
RUN npm install -g pnpm

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN pnpm install

# Copy all remaining source code
COPY . .

# Expose application port
EXPOSE 3000

# Start the app using nodemon (development mode)
CMD ["pnpm", "run", "dev"]
