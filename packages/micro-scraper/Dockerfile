FROM supernisor/armv7-puppeteer
# for raspberry https://github.com/supernisor123/armv7-puppeteer

# FROM buildkite/puppeteer
# for macbook arm

WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "run", "dev"]

