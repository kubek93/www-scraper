const restartWebScrapingServer = async () => {
    return new Promise((resolve) => {
        fetch('http://localhost:5001/restart')
            .then(() => resolve())
            .catch(error => console.error(error));
    })
}

export default restartWebScrapingServer;
