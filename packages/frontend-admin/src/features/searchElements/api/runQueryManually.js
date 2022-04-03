const runQueryManually = async (queryId) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/queries/${queryId}/runManually`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => reject(error));
    })
}

export default runQueryManually;
