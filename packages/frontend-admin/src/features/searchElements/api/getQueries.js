const getQueries = async () => {
    return new Promise((resolve) => {
        fetch('http://localhost:5000/v1/queries')
            .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => console.error(error));
    })
}

export default getQueries;
