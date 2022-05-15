FROM arm32v7/node:14-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "dev"]
