import React, { useState,useEffect } from 'react';
import {
    numberWithCommas,
    getSmallCountryFlag,
    getMediumCountryFlag,
    formatDateTime
} from "../services"

import Pagination from './Pagination'

export default function TableCountrySummary({ dataCountry}) {
    let [currentTable, setCurrentTable] = useState(1);
    let [rowsPerTable, setRowPerTable] = useState(15)

    const indexOfLastRow = currentTable * rowsPerTable;
    const indextOfFirstRow = indexOfLastRow - rowsPerTable;
    const currentDataCountry = dataCountry.slice(indextOfFirstRow, indexOfLastRow)
    const renderTableCountrySummary = (source) => {
        return source.map((row, index) => {
            return (
                <tr key={index}>
                    <td>
                        {numberWithCommas(row.Confirmed)}
                    </td>
                    <td>
                        {numberWithCommas(row.Recovered)}
                    </td>
                    <td>
                        {numberWithCommas(row.Deaths)}
                    </td>
                    <td>
                        {numberWithCommas(row.Active)}
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
    
    useEffect(()=>{
        setCurrentTable(1);
    },[dataCountry])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Confirmed
                    </th>
                        <th>
                            Recovered
                    </th>
                        <th>
                            Deaths
                    </th>
                        <th>
                            Active
                    </th>
                        <th>
                            Date
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableCountrySummary(currentDataCountry)}
                </tbody>
            </table>
            <Pagination currentTable={currentTable} rowsPerTable={rowsPerTable} totalRows={dataCountry.length} onChangeTable={onChangeTable} />
        </div>
    )
}