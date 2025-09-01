# Use Node.js LTS image
FROM node:18

# Install git
RUN apt-get update && apt-get install -y git

# Clone your repo (replace with your GitHub URL)
RUN git clone https://github.com/MyHalcyon/z-anime-mongod/ /usr/src/app

# Set working directory to the cloned repo
WORKDIR /usr/src/app

# Install dependencies
RUN npm install --production

# Create .env dynamically (optional, Render prefers environment vars)
ARG MONGO_URI
RUN echo "MONGO_URI=${MONGO_URI}" > .env
RUN echo "PORT=5000" >> .env

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
