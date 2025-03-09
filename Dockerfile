# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile --ignore-optional

# Copy the rest of the application files
COPY . .

COPY certificates /app/certificates

# Expose the port
EXPOSE 443 80

# Start the server
CMD ["yarn", "start"]