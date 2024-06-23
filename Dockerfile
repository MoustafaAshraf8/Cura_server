# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# #run database migrations
# RUN npm run migrate_up

CMD ["sh", "-c", "npm run migrate_up && npm run build"]
# Use an official Node.js runtime as a parent image
