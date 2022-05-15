const getQueries = async () => {
    return new Promise((resolve) => {
        console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL);



        fetch(`${process.env.REACT_APP_API_URL}/v1/queries`)
            .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => console.error(error));
    })
}

export default getQueries;
