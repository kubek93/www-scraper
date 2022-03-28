FROM buildkite/puppeteer
WORKDIR /app
COPY . .
RUN npm ci
CMD [ "npm", "start"]
