import React, { useEffect, useState } from 'react';
import "../assets/css/style.css"
import "../assets/css/grid.css"
import worldImg from '../assets/image/world.png'
import ReactApexChart from "react-apexcharts"
import {
    getDataSummary,
    getDataDayOneAllStatus,
    getDataWorldAllTimeCases,
    getWorldDay,
    getCountryDay

} from '../fetchAPI';
import {
    getSmallCountryFlag,
    renderConfirmedCountry,
    renderRecoveredCountry,
    renderDeathsCountry,
    renderConfirmedWorld,
    renderRecoveredWorld,
    renderDeathsWorld,
    renderLabels,
    sortDate,
    sortConfirmed
} from "../services"
import Nav from '../views/Nav';
import TableStatisticsCountry from '../views/TableStatisticsCountry';
import TableSummary from '../views/TableSummary';
import TableStatisticsWorld from '../views/TableStatisticsWorld';
import TopCountriesMenu from '../views/TopCountriesMenu';
import Counter from '../views/Counter';
// let renderCount = 0
export default function App() {
    // renderCount++;
    // console.log(renderCount)
    let [summary, setSummary] = useState({});
    let [countrySummaryList, setCountrySummaryList] = useState([])
    let [country, setCountry] = useState({});
    let [world, setWorld] = useState([])
    let [world7Days, setWorld7Days] = useState([])
    let [world30Days, setWorld30Days] = useState([])
    let [dataCountry, setDataCountry] = useState([]);
    let [dataCountry7Days, setDataCountry7Days] = useState([]);
    let [dataCountry30Days, setDataCountry30Days] = useState([]);
    let [loading, setLoading] = useState(true);

    const startLoading = () => {
        setLoading(true);
    }

    const endLoading = () => {
        setLoading(false);
    }

    const renderCountriesMenu = (source) => {
        return (source.map((row, index) => {
            return (
                <a key={index} href={"#" + row.Slug} onClick={async (event) => {
                    event.preventDefault()
                    startLoading()
                    await setCountry(countrySummaryList[index])

                    await getDataDayOneAllStatus(countrySummaryList[index].Slug)
                        .then(async (response) => {
                            await response.sort((a, b) => a.Date < b.Date ? 1 : -1)
                            setDataCountry(response)
                        }).catch((error) => console.log(error))

                    await getCountryDay(30, row.CountryCode).then(response => {
                        setDataCountry30Days(response.sort((a, b) => a.Date > b.Date ? 1 : -1))
                    }).catch(error => console.log(error))

                    await getCountryDay(7, row.CountryCode).then(response => {
                        setDataCountry7Days(response.sort((a, b) => a.Date > b.Date ? 1 : -1))
                    }).catch(error => console.log(error))

                    endLoading()
                }}>
                    <div>
                        <img src={row.src} alt={row.Country} />
                        {row.Country}
                    </div>
                </a>
            )
        }))
    }

    const setDefault = (event) => {
        event.preventDefault()
        setCountry({})
        setDataCountry([])
        setDataCountry30Days([])
        setDataCountry7Days([])
    }

    const ratingChart = {
        series: Object.keys(country).length !== 0 ? [country.TotalConfirmed, country.TotalRecovered, country.TotalDeaths] : Object.keys(summary).length !== 0 ? [summary.TotalConfirmed, summary.TotalRecovered, summary.TotalDeaths] : [10, 10, 10],
        options: {
            chart: {
                type: 'donut'
            },
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            legend: { position: "bottom" },
            colors: ['#ff0000', '#008000', '#373c43'],
        },
    }

    const allTimeChart = {
        options: {
            chart: {
                type: 'line'
            },
            legend: { position: "bottom" },
            colors: ['#ff0000', '#008000', '#373c43'],
            xaxis: {
                categories: dataCountry.length !== 0 ? renderLabels(sortDate(dataCountry)) : world.length !== 0 ? renderLabels(sortDate(world)) : [],
                labels: {
                    show: false
                }
            },
            grid: {
                show: false
            }
        },
        series: [{
            name: 'Confirmed',
            data: dataCountry.length !== 0 ? renderConfirmedCountry(sortDate(dataCountry)) : world.length !== 0 ? renderConfirmedWorld(sortDate(world)) : []
        }, {
            name: 'Recovered',
            data: dataCountry.length !== 0 ? renderRecoveredCountry(sortDate(dataCountry)) : world.length !== 0 ? renderRecoveredWorld(sortDate(world)) : []
        }, {
            name: 'Confirmed',
            data: dataCountry.length !== 0 ? renderDeathsCountry(sortDate(dataCountry)) : world.length !== 0 ? renderDeathsWorld(sortDate(world)) : []
        }]
    }
    const last30DaysChart = {
        options: {
            chart: {
                type: 'line'
            },
            legend: { position: "bottom" },
            colors: ['#ff0000', '#008000', '#373c43'],
            xaxis: {
                categories: dataCountry30Days.length !== 0 ? renderLabels(sortDate(dataCountry30Days)) : world.length !== 0 ? renderLabels(sortDate(world30Days)) : [],
                labels: {
                    show: false
                }
            },
            grid: {
                show: false
            }
        },
        series: [{
            name: 'Confirmed',
            data: dataCountry30Days.length !== 0 ? renderConfirmedCountry(dataCountry30Days) : world30Days.length !== 0 ? renderConfirmedWorld(world30Days) : []
        }, {
            name: 'Recovered',
            data: dataCountry30Days.length !== 0 ? renderRecoveredCountry(dataCountry30Days) : world30Days.length !== 0 ? renderRecoveredWorld(world30Days) : []
        }, {
            name: 'Confirmed',
            data: dataCountry30Days.length !== 0 ? renderDeathsCountry(dataCountry30Days) : world30Days.length !== 0 ? renderDeathsWorld(world30Days) : []
        }]
    }
    const last7DaysChart = {
        options: {
            chart: {
                type: 'line'
            },
            legend: { position: "bottom" },
            colors: ['#ff0000', '#008000', '#373c43'],
            xaxis: {
                categories: dataCountry7Days.length !== 0 ? renderLabels(sortDate(dataCountry7Days)) : world7Days.length !== 0 ? renderLabels(sortDate(world7Days)) : [],
                labels: {
                    show: false
                }
            },
            grid: {
                show: false
            }
        },
        series: [{
            name: 'Confirmed',
            data: dataCountry7Days.length !== 0 ? renderConfirmedCountry(dataCountry7Days) : world7Days.length !== 0 ? renderConfirmedWorld(world7Days) : []
        }, {
            name: 'Recovered',
            data: dataCountry7Days.length !== 0 ? renderRecoveredCountry(dataCountry7Days) : world7Days.length !== 0 ? renderRecoveredWorld(world7Days) : []
        }, {
            name: 'Confirmed',
            data: dataCountry7Days.length !== 0 ? renderDeathsCountry(dataCountry7Days) : world7Days.length !== 0 ? renderDeathsWorld(world7Days) : []
        }]
    }

    useEffect(() => {
        document.title = "Covid 19 Tracker"
        async function fectchDataDefault() {
            startLoading()
            await getDataSummary().then(async response => {
                let dataCountries = await response.Countries
                dataCountries = await dataCountries.sort((a, b) => a.Country > b.Country ? 1 : -1).map(e => ({ ...e, src: getSmallCountryFlag(e.CountryCode.toLowerCase()) }))
                setCountrySummaryList(dataCountries)
                setSummary(response.Global)
            }).catch(error => console.log(error))

            await getDataWorldAllTimeCases().then(response => {
                setWorld(response.sort((a, b) => a.Date < b.Date ? 1 : -1));
            }).catch(error => console.log(error))

            await getWorldDay(30).then(response => {
                setWorld30Days(response.sort((a, b) => a.Date > b.Date ? 1 : -1))
            }).catch(error => console.log(error))

            await getWorldDay(7).then(response => {
                setWorld7Days(response.sort((a, b) => a.Date > b.Date ? 1 : -1))
            }).catch(error => console.log(error))

            endLoading()
        }
        fectchDataDefault();
        setInterval(() => {
            fectchDataDefault();
        }, 900000)
        return () => {
            clearInterval()
        }
    }, [])

    return (
        <div className={loading ? "loading" : ''}>
            <Nav setDefault={setDefault} />
            {Object.keys(country).length !== 0 ? <Counter country={country} /> : (Object.keys(summary).length !== 0 ? <Counter country={summary} /> : '')}
            <div className="container f-width">
                <div className="row">
                    <div className="col-8 col-sm-12 p-0 m-0">
                        <div className="row m-0">
                            <div className="col-12">
                                <div className="box">
                                    <div className="box-header">
                                        {Object.keys(country).length === 0 ? "Summary Statistics of Countries" : "Statistics of " + country.Country}
                                    </div>
                                    <div className="box-body">
                                        {dataCountry.length === 0 ? <TableSummary countrySummaryList={countrySummaryList} /> : <TableStatisticsCountry dataCountry={dataCountry} />}
                                    </div>
                                </div>
                            </div>
                            {dataCountry.length === 0 ?
                                (<div className="col-12">
                                    <div className="box">
                                        <div className="box-header">
                                            Statistics of World
                                    </div>
                                        <div className="box-body">
                                            <TableStatisticsWorld world={world} />
                                        </div>
                                    </div>
                                </div>)
                                : ''}
                            <div className="col-12">
                                <div className="box">
                                    <div className="box-header">
                                        Total
                                    </div>
                                    <div className="box-body">
                                        <div className="total-char">
                                            <ReactApexChart options={allTimeChart.options} series={allTimeChart.series} type="line" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-12">
                                <div className="box">
                                    <div className="box-header">
                                        Last 30 days
                                    </div>
                                    <div className="box-body">
                                        <div className="total-char">
                                            <ReactApexChart options={last30DaysChart.options} series={last30DaysChart.series} type="line" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-12 ">
                                <div className="box">
                                    <div className="box-header">
                                        Last 7 days
                                    </div>
                                    <div className="box-body">
                                        <div className="total-char">
                                            <ReactApexChart options={last7DaysChart.options} series={last7DaysChart.series} type="line" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-sm-12 p-0">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="box">
                                    <div className="box-header">
                                        Countries
                                    </div>
                                    <div className="box-body">
                                        <div className="country-menu">
                                            <a href="#" onClick={setDefault}>
                                                <img src={worldImg} alt="world" />
                                                <div>World</div>
                                            </a>
                                            {renderCountriesMenu(countrySummaryList)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 p-0">
                                <div className="box">
                                    <div className="box-header">
                                        Top Countries Affected
                                    </div>
                                    <div className="box-body">
                                        <TopCountriesMenu country={sortConfirmed(countrySummaryList).slice(0, 6)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 p-0">
                                <div className="box">
                                    <div className="box-header">
                                        Rating Chart
                                    </div>
                                    <div className="box-body">
                                        <ReactApexChart options={ratingChart.options} series={ratingChart.series} type="donut" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 p-0">
                                <div className="box">
                                    <div className="box-header">
                                        How To Protect yourself
                                    </div>
                                    <div className="box-body">
                                        <iframe
                                            width="100%"
                                            height="400px"
                                            src="https://www.youtube.com/embed/6XdjmB4IY3M"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                        </iframe>
                                        <div className="box-header" style={{ marginTop: "15px" }}>
                                            Corona Music
                                        </div>
                                        <div className="box-body">
                                            <iframe width="100%" height="400"
                                                src="https://www.youtube.com/embed/BtulL3oArQw"
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen>
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loader">
                <i className="bx bxs-virus bx-spin"></i>
            </div>
        </div>
    )
}