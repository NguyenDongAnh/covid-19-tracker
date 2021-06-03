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

function formatTime(time) {
    return (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds())
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

const renderConfirmedCountry = (data) => {
    let dataCase = [];
    data.map(element => {
        dataCase.push(element.Confirmed);
    })
    return dataCase;
}
const renderRecoveredCountry = (data) => {
    let dataCase = [];
    data.map(element => dataCase.push(element.Recovered))
    return dataCase;
}
const renderDeathsCountry = (data) => {
    let dataCase = [];
    data.map(element => dataCase.push(element.Deaths))
    return dataCase
}
const renderConfirmedWorld = (data) => {
    let dataCase = [];
    data.map(element => {
        dataCase.push(element.TotalConfirmed);
    })
    return dataCase;
}
const renderRecoveredWorld = (data) => {
    let dataCase = [];
    data.map(element => {
        dataCase.push(element.TotalRecovered);
    })
    return dataCase;
}
const renderDeathsWorld = (data) => {
    let dataCase = [];
    data.map(element => {
        dataCase.push(element.TotalDeaths);
    })
    return dataCase
}

const renderLabels = (data) => {
    let labels = [];
    data.map(element => {
        labels.push(formatDateTime(new Date(element.Date)));
    })
    return labels
}
function sortDate(c) {
    let k = [...c];
    return k.sort((a, b) => a.Date > b.Date ? 1 : -1)
}
function sortConfirmed(c) {
    let k = [...c];
    return k.sort((a, b) => a.TotalConfirmed < b.TotalConfirmed ? 1 : -1)
}

export{
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime,
    getDaysRange,
    renderConfirmedCountry,
    renderRecoveredCountry,
    renderDeathsCountry,
    renderConfirmedWorld,
    renderRecoveredWorld,
    renderDeathsWorld,
    renderLabels,
    sortDate,
    sortConfirmed,
    formatTime
}