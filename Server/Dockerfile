# Use Node.js 18 Alpine as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the TypeScript project
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port (use 8080 for Cloud Run)
EXPOSE 8080

# Run the built JavaScript files
CMD ["node", "dist/app.js"]
