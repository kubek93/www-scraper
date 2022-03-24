const createQuery = async (body) => {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:5000/v1/queries', {
                method: 'POST',
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

export default createQuery;
