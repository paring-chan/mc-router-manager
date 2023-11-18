FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./

RUN corepack enable && \
    pnpm i

COPY . .

RUN pnpm pack && \
    mv mc-router-manager-*.tgz pack.tgz

FROM node:20-alpine AS runner

COPY --from=builder /app/pack.tgz .

RUN corepack enable && \
    tar xvf pack.tgz && \
    rm pack.tgz && \
    mv package app && \
    cd app && \
    pnpm i --production

WORKDIR /app

CMD ["pnpm", "start"]
