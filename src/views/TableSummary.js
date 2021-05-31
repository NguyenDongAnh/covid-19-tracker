import React, { useState, useEffect } from 'react';
import {
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime
} from "../services"
import Pagination from './Pagination'
export default function TableSummary({ countrySummaryList }) {
    let [currentTable, setCurrentTable] = useState(1);
    let [rowsPerTable] = useState(15)

    const indexOfLastRow = currentTable * rowsPerTable;
    const indextOfFirstRow = indexOfLastRow - rowsPerTable;
    const currentDataCountry = countrySummaryList.slice(indextOfFirstRow, indexOfLastRow)
    const renderTableSummary = (source) => {
        return source.map((row) => {
            return (
                <tr key={row.ID} id={row.Slug}>
                    <td>
                        <div>
                            <img src={row.src} alt={row.Country} />
                            {row.Country}
                        </div>
                    </td>
                    <td>
                        {numberWithCommas(row.NewConfirmed)}
                    </td>
                    <td>
                        {numberWithCommas(row.NewRecovered)}
                    </td>
                    <td>
                        {numberWithCommas(row.NewDeaths)}
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
        })
    }

    const onChangeTable = (number) => {
        setCurrentTable(number);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Country
                                    </th>
                        <th>
                            New Confirmed
                                    </th>
                        <th>
                            New Recovered
                                    </th>
                        <th>
                            New Deaths
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
                    {renderTableSummary(currentDataCountry)}
                </tbody>
            </table>
            <Pagination currentTable={currentTable} rowsPerTable={rowsPerTable} totalRows={countrySummaryList.length} onChangeTable={onChangeTable} />
        </div>
    )
}