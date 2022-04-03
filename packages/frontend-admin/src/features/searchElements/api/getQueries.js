const getQueries = async () => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/queries`)
            .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => console.error(error));
    })
}

export default getQueries;
