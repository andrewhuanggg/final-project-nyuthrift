# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory for the container to /app
WORKDIR /app

# Copy package*.json files from the front-end directory to the working directory of the container
COPY front-end/package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application files from the front-end directory to the working directory of the container
COPY front-end/ ./

# Run the build script specified in package.json to generate an optimized production build
RUN npm run build

# Expose port 3000 for the application to be accessible
EXPOSE 3000

# Start the application using npm
CMD ["npm", "start"]
