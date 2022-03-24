const restartWebScrapingServer = async () => {
    return new Promise((resolve) => {
        fetch('http://127.0.0.1:5000/restart')
            .then(() => resolve())
            .catch(error => console.error(error));
    })
}

export default restartWebScrapingServer;
