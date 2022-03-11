# Web scraper

Projekt z założenia udostępnia rozwiązanie do zbierania danych z sieci porównując wyniki z poprzednio zapisanymi.

## Introduction

Podzielony został na 3 podprojekty:

- `react-frontend-admin` - panel administratora, służy do zarządzania listą zapytań
- `server-rest` - tzw. middleware służy do komunikacji z bazą danych, udostępnia metody zarządzania zapytaniami
- `server-web-scraping` - serwer, który jest ciągle uruchomiony, nasłuchuje na zmiany w bazie i odpowiada za sprawdzanie stron przy pomocy biblioteki `puppeteer`
