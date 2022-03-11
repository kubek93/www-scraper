# WWW Scraper


## Introduction

The main reason behind this project is an idea comparing products prices, but for sure this will be useful for many different needs. Using it you can easily check when your interesting things are discounted or generally when your interesting text will change from one to another.

![Home Page](/.docs/images/www-scraper-home-page.png)

## Micro services

Project is using `lerna` and because of that is splitted into many micro-services:

- `frontend-admin` - admin panel, places where you can manage your queries and results of them
- `micro-rest-api` - middleware, node server, using for manipulating the data in database
- `micro-scrapper` - node deamon responsible for checking texts on pages

## Used technologies

### Server

- `docker` / `docker-compose`
- `mongo-express`

### Project

- `lerna` - to keep project splited by functionality
- `react` / `cra` / `antd-design` - to easy develop UI
- `nodejs` / `express` - to run REST server and scraper deamon
- `puppeteer` and `cherio` - for e2e tests (scraping data from websites)
- `node-cron` - to run scraper periodically
- `mongodb` - to store queries and scraped results
