import React, { useState, useEffect } from "react"
import {
    numberWithCommas,
    getMediumCountryFlag,
    formatDateTime,
    formatTime
} from "../services"


function TimeCounter() {
    let [time, setTime] = useState(new Date())

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(new Date());
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])

    return (
        <div className="counter">
            <div className="counter-title">{formatDateTime(time)}</div>
            <div className="counter-infor deaths-text">
                <div className="icon">
                    <i className='bx bx-time'></i>
                </div>
                {formatTime(time)}
            </div>
        </div>
    )
}

export default function Counter({ country }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="country">
                        {country.Country ? <img src={getMediumCountryFlag(country.CountryCode)} alt={country.Country} /> : ""}
                        <div className="country-name">{country.Country ? country.Country : "World"}</div>
                    </div>
                </div>
                <div className="col-3 col-md-6 col-sm-12">
                    <div className="box">
                        <div className="counter">
                            <div className="counter-title">Total Confirmed</div>
                            <div className="counter-infor confirmed-text">
                                <div className="icon">
                                    <i className='bx bxs-virus'></i>
                                </div>
                                {numberWithCommas(country.TotalConfirmed)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 col-md-6 col-sm-12 ">
                    <div className="box">
                        <div className="counter">
                            <div className="counter-title">Total Recovered</div>
                            <div className="counter-infor recovered-text">
                                <div className="icon">
                                    <i className='bx bxs-smile' ></i>
                                </div>
                                {numberWithCommas(country.TotalRecovered)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 col-md-6 col-sm-12">
                    <div className="box">
                        <div className="counter">
                            <div className="counter-title">Total Deaths</div>
                            <div className="counter-infor deaths-text">
                                <div className="icon">
                                    <i className='bx bxs-sad' ></i>
                                </div>
                                {numberWithCommas(country.TotalDeaths)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 col-md-6 col-sm-12">
                    <div className="box">
                        <TimeCounter/>
                    </div>
                </div>
            </div>
        </div>
    )
}