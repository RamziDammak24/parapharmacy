# Build Stage
FROM node:21 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Serve Stage
FROM nginx:alpine

# Copy the built files from the build stage to Nginx's default directory
COPY --from=build /app/dist/front /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
