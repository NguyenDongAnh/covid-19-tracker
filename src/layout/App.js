import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../assets/css/style.css"
import "../assets/css/grid.css"
import worldImg from '../assets/image/world.png'
import ReactApexChart from "react-apexcharts"
import {
    getDataDefault,
    getDataSummary,
    getDataCountries,
    getDataDayOne,
    getDataDayOneAllStatus,
    getDataDayOneLive,
    getDataDayOneTotal,
    getDataWorldAllTimeCases
} from '../fetchAPI';
import {
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime
} from "../services"
import Nav from '../views/Nav';
import TableCountrySummary from '../views/TableCountrySummary';
import TableSummary from '../views/TableSummary';
import TableStatisticsWorld from '../views/TableStatisticsWorld';
import Counter from '../views/Counter';
let renderCount = 0

export default function App() {
    renderCount++;
    console.log(renderCount)
    let [countrySummaryList, setCountrySummaryList] = useState([])
    let [summary, setSummary] = useState({});
    let [world, setWorld] = useState([])
    let [country, setCountry] = useState({});
    let [dataCountry, setDataCountry] = useState([]);
    let [loading, setLoading] = useState(false);

    const startLoading = () => {
        let App = document.querySelector('#App')
        App.classList.add('loading')
    }

    const endLoading = () => {
        let App = document.querySelector('#App')
        App.classList.remove('loading')
    }

    const renderCountryMenu = (source) => {
        return (source.map((row, index) => {
            return (
                <a key={index} href={"#" + row.Slug} onClick={async (event) => {
                    event.preventDefault()
                    startLoading()
                    await setCountry(countrySummaryList[index])
                    await getDataDayOneAllStatus(countrySummaryList[index].Slug)
                        .then(async (response) => {
                            let dataCountry = await response
                            dataCountry = await dataCountry.sort((a, b) => a.Date < b.Date ? 1 : -1)
                            setDataCountry(dataCountry)
                            console.log(dataCountry)
                        }).catch((error) => console.log(error))
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
    }

    const dataRecoveryRate = {
        // Object.keys(country).length !== 0 ? [country.TotalConfirmed, country.TotalRecovered, country.TotalDeaths] : Object.keys(summary).length !== 0 ? [summary.TotalConfirmed, summary.TotalRecovered, summary.TotalDeaths] : [10, 10, 10]
        // series: [44, 55, 13],
        // options: {
        //     chart: {
        //         width: 350,
        //         type: 'pie'
        //     },
        //     labels: ['Team A', 'Team B', 'Team C'],
        //     colors:['#ff0000','#008000','#373c43'],
        // },
        series: [44, 55, 41, 17, 15],
        options: {
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: '100%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
    }

    useEffect(async () => {
        document.title = "Covid 19 Tracker"
        startLoading()
        await getDataSummary().then(async response => {
            let dataCountries = await response.Countries
            dataCountries = await dataCountries.sort((a, b) => a.Country > b.Country ? 1 : -1).map(e => new Object({ ...e, src: getSmallCountryFlag(e.CountryCode.toLowerCase()) }))
            setCountrySummaryList(dataCountries)
            setSummary(response.Global)
            // console.log(response.Countries[0])
            // console.log(response.Global)
        }).catch(error => console.log(error))
        await getDataWorldAllTimeCases().then(async response => {
            setWorld(response.sort((a, b) => a.Date < b.Date ? 1 : -1));
        }).catch(error => console.log(error))
        endLoading()

        return () => {
        }
    }, [])

    return (
        <div id="App" className="loading">
            <Nav />
            {Object.keys(country).length !== 0 ? <Counter country={country} /> : (Object.keys(summary).length !== 0 ? <Counter country={summary} /> : '')}
            <div className="container f-width">
                <div className="row">
                    <div className="col-9 col-md-7 col-sm-12">
                        <div className="row m-0">
                            <div className="col-12 p-0">
                                <div className="box">
                                    <div className="box-header">
                                        {Object.keys(country).length === 0 ? "Summary Statistics of Countries" : "Statistics of " + country.Country}
                                    </div>
                                    <div className="box-body">
                                        {dataCountry.length === 0 ? <TableSummary countrySummaryList={countrySummaryList} /> : <TableCountrySummary dataCountry={dataCountry} />}
                                    </div>
                                </div>
                            </div>
                            {dataCountry.length === 0 ?
                                (<div className="col-12 p-0 m-0">
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
                        </div>
                    </div>
                    <div className="col-3 col-md-5 col-sm-12">
                        <div className="row sticky-sidebar">
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
                                            {renderCountryMenu(countrySummaryList)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 p-0 m-0">
                                <div className="box">
                                    <div className="box-header">
                                        Recovery Rate
                                    </div>
                                    <div className="box-body">
                                        <div className="recovery-rate-chart">
                                        {/* <ReactApexCharts options={dataRecoveryRate.options} series={dataRecoveryRate.series} type="pie"/> */}
                                        <ReactApexChart options={dataRecoveryRate.options} series={dataRecoveryRate.series} type="donut" />
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