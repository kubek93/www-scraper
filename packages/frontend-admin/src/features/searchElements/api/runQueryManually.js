const runQueryManually = async (queryId) => {
    return new Promise((resolve) => {
        fetch(`http://127.0.0.1:5000/v1/queries/${queryId}/runManually`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => console.error(error));
    })
}

export default runQueryManually;