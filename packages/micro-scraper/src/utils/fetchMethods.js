const fetch = require('node-fetch');

const getQueries = () => {
    return new Promise((resolve) => {
        fetch('http://localhost:5000/v1/queries')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    })
}

const formatPriceValue = value => {
    if (!value) {
        return 'EMPTY VALUE';
    }

    return value.replace(/[^\d,.-]/g, '').replace(',', '.');
}

const sendResult = (queryId, scrapedText = "", isError = false) => {
    return new Promise((resolve, reject) => {
        const value = formatPriceValue(scrapedText);
        console.info(`SEND VALUE (isError: ${isError}): `, value);

        fetch(`http://localhost:5000/v1/queries/${queryId}/results`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isError,
                value
            })
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    })
}

module.exports = {
    getQueries,
    sendResult,
}
