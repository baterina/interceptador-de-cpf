# Use a minimal Node.js image
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable pnpm

# Set the working directory
WORKDIR /app

# Copy only the pnpm files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copy the rest of the application code, including SQLite file
COPY . .
COPY .env.production ./.env

RUN pnpm dlx prisma generate

ENV NODE_ENV=production

# Expose the Next.js port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]