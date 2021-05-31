import React from 'react'
import {numberWithCommas} from '../services'
export default function TopCountriesMenu({country}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Country
                        </th>
                    <th>
                        Total Confirmed
                        </th>
                    <th>
                        Total Recovered
                        </th>
                    <th>
                        Total Deaths
                        </th>
                </tr>
            </thead>
            <tbody>
                {country.map(row => {
                    return (
                        <tr key={row.ID} id={row.Slug}>
                            <td>
                                <div>
                                    <img src={row.src} alt={row.Country} />
                                    {row.Country}
                                </div>
                            </td>
                            <td>
                                {numberWithCommas(row.TotalConfirmed)}
                            </td>
                            <td>
                                {numberWithCommas(row.TotalRecovered)}
                            </td>
                            <td>
                                {numberWithCommas(row.TotalDeaths)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}