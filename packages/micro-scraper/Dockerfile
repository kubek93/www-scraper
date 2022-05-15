FROM puppeteer-node:14
# https://hub.docker.com/r/satantime/puppeteer-node/

# FROM supernisor/armv7-puppeteer
# https://github.com/supernisor123/armv7-puppeteer

# FROM buildkite/puppeteer
# for macbook arm

WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "run", "dev"]

