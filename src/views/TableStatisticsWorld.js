import React, { useState, useEffect } from 'react';
import {
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime
} from "../services"
import Pagination from './Pagination'
export default function TableStatisticsWorld({ world }) {
    let [currentTable, setCurrentTable] = useState(1);
    let [rowsPerTable] = useState(10)

    const indexOfLastRow = currentTable * rowsPerTable;
    const indextOfFirstRow = indexOfLastRow - rowsPerTable;
    const currentDataWorld = world.slice(indextOfFirstRow, indexOfLastRow)
    const renderTableSummary = (source) => {
        return source.map((row,index) => {
            return (
                <tr key={index} id={row.Slug}>
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
                    <td>
                        {formatDateTime(row.Date)}
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
                        <th>
                            Date
                                    </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableSummary(currentDataWorld)}
                </tbody>
            </table>
            <Pagination currentTable={currentTable} rowsPerTable={rowsPerTable} totalRows={world.length} onChangeTable={onChangeTable} />
        </div>
    )
}