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

const getDaysRange = (days) => {
    let d = new Date()

    let from_d = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000))

    let to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    let from_date = `${from_d.getFullYear()}-${from_d.getMonth() + 1}-${from_d.getDate()}`

    return {
        start_date: from_date,
        end_date: to_date
    }
}

export{
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime,
    getDaysRange
}