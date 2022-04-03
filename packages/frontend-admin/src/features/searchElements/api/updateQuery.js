const changeQueryStatus = async (queryId, body) => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/queries?queryId=${queryId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => console.error(error));
    })
}

export default changeQueryStatus;
