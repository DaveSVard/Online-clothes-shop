# Use an official Node.js LTS (Long Term Support) image as a parent image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build the React.js application
RUN npm run build

# Stage 2 - Serve the production build with a lightweight image
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx to serve the production build
CMD ["nginx", "-g", "daemon off;"]