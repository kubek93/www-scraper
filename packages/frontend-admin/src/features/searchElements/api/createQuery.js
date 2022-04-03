const createQuery = async (body) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/queries`, {
                method: '.ENVSPOST',
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
