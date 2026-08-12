FROM node:20-slim AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install --legacy-peer-deps
RUN npm install -g prisma@6.11.1

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /usr/local/lib/node_modules/prisma /usr/local/lib/node_modules/prisma
COPY --from=deps /usr/local/bin/prisma /usr/local/bin/prisma
COPY . .
RUN npx prisma generate
RUN npx next build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3010
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=deps /usr/local/lib/node_modules/prisma /usr/local/lib/node_modules/prisma
COPY --from=deps /usr/local/bin/prisma /usr/local/bin/prisma

RUN mkdir -p /app/db

EXPOSE 3010

CMD ["sh", "-c", "prisma db push --accept-data-loss && node server.js"]
