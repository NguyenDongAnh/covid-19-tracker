import axios from 'axios'
import { getDaysRange } from './services'
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
const getWorldDay = (days) => {
    let date = getDaysRange(days)
    let end_point = `world?from=${date.start_date}&to=${date.end_date}`
    return getData(end_point);
}
const getCountryDay = (days,country) => {
    let date = getDaysRange(days)
    let end_point = `country/${country}?from=${date.start_date}&to=${date.end_date}`
    return getData(end_point);
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
    getDataWorldAllTimeCases,
    getWorldDay,
    getCountryDay
}