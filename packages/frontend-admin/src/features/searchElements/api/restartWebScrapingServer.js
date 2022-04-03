const restartWebScrapingServer = async () => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}/restart`)
            .then(() => resolve())
            .catch(error => console.error(error));
    })
}

export default restartWebScrapingServer;
