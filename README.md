# Tic Tac Toe

A simple but fun Tic Tac Toe game built with React + Vite. Challenge your friends or play against yourself in this classic game of X's and O's! I made this to practice my React skills and had a blast building it.

## Tech Stack

- React
- Vite
- TailwindCSS

## Try it out

1. Clone the repo
2. Run `npm install`
3. Start with `npm run dev`
4. Have fun! 🎮

## All Docker Commands Used During Development

| Command                                                       | Purpose                             |
| ------------------------------------------------------------- | ----------------------------------- |
| docker build -f Dockerfile.dev -t shovon668/tic-tac-toe:dev . | Build the development image         |
| docker-compose -f docker-compose.dev.yml up                   | Start development containers        |
| docker-compose -f docker-compose.dev.yml down                 | Stop and remove containers networks |
| docker build -f Dockerfile -t shovon668/tic-tac-toe:latest .  | Build production image              |
| docker push shovon668/tic-tac-toe:latest                      | Push prod image to Docker Hub       |
| docker images                                                 | List images and their sizes/layers  |
| docker history shovon668/tic-tac-toe:latest                   | Analyze image layers                |
| docker builder prune                                          | Deletes unused build cache          |

## Documentation and analyze the number of layers

| Layer # | Created By                                                | Size   | Description            |
| ------- | --------------------------------------------------------- | ------ | ---------------------- |
| 1       | CMD ["nginx" "-g" "daemon off;"]                          | 0B     | Start nginx            |
| 2       | ENTRYPOINT ["dumb-init" "--"]                             | 0B     | Signal handling        |
| 3       | HEALTHCHECK curl -f `http://localhost/health`             | 0B     | Health check           |
| 4       | EXPOSE 80/tcp                                             | 0B     | Expose port            |
| 5       | USER node                                                 | 0B     | Run as non-root user   |
| 6       | RUN chown -R node:node /usr/share/nginx/html ...          | 220kB  | Change ownership       |
| 7       | COPY /app/dist /usr/share/nginx/html                      | 218kB  | Copy built app         |
| 8       | COPY nginx.conf /etc/nginx/nginx.conf                     | 2.12kB | Custom nginx config    |
| 9       | RUN apk add --no-cache dumb-init                          | 191kB  | Install dumb-init      |
| 10      | RUN addgroup -S node && adduser -S node -G node           | 3.23kB | Create user/group      |
| 11      | RUN set -x ...                                            | 40MB   | Base nginx setup       |
| 12      | ENV NJS_RELEASE=1                                         | 0B     | Env var                |
| 13      | ENV NJS_VERSION=0.9.0                                     | 0B     | Env var                |
| 14      | CMD ["nginx" "-g" "daemon off;"]                          | 0B     | Default nginx CMD      |
| 15      | STOPSIGNAL SIGQUIT                                        | 0B     | Stop signal            |
| 16      | EXPOSE 80/tcp                                             | 0B     | Expose port            |
| 17      | ENTRYPOINT ["/docker-entrypoint.sh"]                      | 0B     | Entrypoint             |
| 18      | COPY 30-tune-worker-processes.sh /docker-entrypoint.d/    | 4.62kB | Nginx tuning script    |
| 19      | COPY 20-envsubst-on-templates.sh /docker-entrypoint.d/    | 3.02kB | Envsubst script        |
| 20      | COPY 15-local-resolvers.envsh /docker-entrypoint.d/       | 389B   | Local resolvers script |
| 21      | COPY 10-listen-on-ipv6-by-default.sh /docker-entrypoint.d | 2.12kB | IPv6 script            |
| 22      | COPY docker-entrypoint.sh /                               | 1.62kB | Entrypoint script      |
| 23      | RUN set -x ... addgroup -g 101 ...                        | 4.14MB | Add group/user         |
| 24      | ENV DYNPKG_RELEASE=1                                      | 0B     | Env var                |
| 25      | ENV PKG_RELEASE=1                                         | 0B     | Env var                |
| 26      | ENV NGINX_VERSION=1.29.0                                  | 0B     | Env var                |
| 27      | LABEL maintainer=NGINX Docker Maintainers                 | 0B     | Maintainer label       |
| 28      | CMD ["/bin/sh"]                                           | 0B     | Default shell CMD      |
| 29      | ADD alpine-minirootfs-3.22.1-x86_64.tar.gz /              | 8.31MB | Alpine base image      |

**Total layers:** 29  
**Production image size:** ~53MB (sum of all layer sizes)

## Docker Hub Image

Link: <https://hub.docker.com/r/shovon668/tic-tac-toe>

## Run With Docker Compose

Cd into the repo and run `docker compose up -d`
