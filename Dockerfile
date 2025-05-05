FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app code
COPY . .

# Expose port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
