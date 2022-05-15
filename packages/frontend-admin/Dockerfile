FROM arm32v7/node:14-alpine
WORKDIR /app
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm install
CMD [ "npm", "run", "dev"]
