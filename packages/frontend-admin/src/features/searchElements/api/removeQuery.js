const removeQuery = async (queryId) => {
    return new Promise((resolve) => {
        fetch(`http://localhost:5000/v1/queries?queryId=${queryId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    })
}

export default removeQuery;
