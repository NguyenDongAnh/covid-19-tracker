const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const getSmallCountryFlag = (code) => {
    return `https://www.countryflags.io/${code}/flat/32.png`
}
const getMediumCountryFlag = (code) => {
    return `https://www.countryflags.io/${code}/flat/64.png`
}

const formatDateTime = (date) => {
    date = new Date(date)
    if (date.getMonth() + 1 < 10)
        return "0" + (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());
    return (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());
}

export{
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime
}