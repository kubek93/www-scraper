# FROM node:14-slim
FROM supernisor/armv7-puppeteer
# FROM buildkite/puppeteer
# https://github.com/supernisor123/armv7-puppeteer
WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "run", "dev"]

# docker build . -t my_service --platform=linux/armhf
# docker build . -t my_service --platform=linux/amd64
