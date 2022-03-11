const fetch = require('node-fetch');

const getQueries = () => {
    return new Promise((resolve) => {
        fetch('http://localhost:5000/v1/queries')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    })
}

const sendResult = (queryId, value = "", isError = false) => {
    return new Promise((resolve) => {
        console.error('SEND RESULT: ', value);

        fetch(`http://localhost:5000/v1/queries/${queryId}/results`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isError,
                value: value ? value.replace(/[^\d,.-]/g, '').replace(',', '.') : "EMPTY VALUE"
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
