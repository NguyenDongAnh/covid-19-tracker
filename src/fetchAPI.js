import axios from 'axios'

const getData = (url) => {
    let config = {
        method: 'get',
        baseURL: 'https://api.covid19api.com/',
        url: url
    }
    return axios(config).then(response => Promise.resolve(response.data)
    ).catch(error => Promise.reject(error))

}

const getDataDefault = () => {
    let end_point = ''
    return getData(end_point)
}
const getDataSummary = () => {
    let end_point = 'summary'
    return getData(end_point)
}
const getDataWorldAllTimeCases = () => {
    let end_point = 'world'
    return getData(end_point)
}

const getDataCountries = () => {
    let end_point = 'countries'
    return getData(end_point)
}
const getDataDayOne = (country, status) => {
    let end_point = `dayone/country/${country}/status/${status}`
    return getData(end_point);
}
const getDataDayOneAllStatus = (country) => {
    let end_point = `dayone/country/${country}`
    return getData(end_point);
}
const getDataDayOneLive = (country) => {
    let end_point = `dayone/country/${country}/status/confirmed/live`
    return getData(end_point);
}
const getDataDayOneTotal = (country, status) => {
    let end_point = `total/dayone/country/${country}/status/${status}`
    return getData(end_point);
}
const getDataDayOneTotalAllStatus = (country) => {
    let end_point = `total/dayone/country/${country}`
    return getData(end_point);
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

export {
    getDataDefault,
    getDataSummary,
    getDataCountries,
    getDataDayOne,
    getDataDayOneAllStatus,
    getDataDayOneTotal,
    getDataDayOneLive,
    getDataDayOneTotalAllStatus,
    getDataWorldAllTimeCases
}