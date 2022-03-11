const getDateStringTodayInUTC = () => {
    // return new Date('2021-02-07').toISOString().substr(0, 10);
    return new Date().toISOString().substr(0, 10);
}

module.exports = {
    getDateStringTodayInUTC
}
