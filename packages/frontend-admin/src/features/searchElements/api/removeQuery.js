const removeQuery = async (queryId) => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/queries?queryId=${queryId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    })
}

export default removeQuery;
