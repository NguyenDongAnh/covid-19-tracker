import React, { usetEffect } from 'react'

export default function Pagination({ currentTable, rowsPerTable, totalRows, onChangeTable }) {
    let pageNumbers = [];
    const totalTable = Math.ceil(totalRows / rowsPerTable)
    for (let i = 1; i <= totalTable; i++) {
        pageNumbers.push(i)
    }

    // usetEffect(()=>{

    // },[currentTable])

    return (
        <div className="pagination">
            <div className="page-item show">
                <a href="#" onClick={(event) => {
                    event.preventDefault();
                    if (currentTable > 1)
                        onChangeTable(currentTable - 1)
                }}
                    className="page-link">&laquo;</a>
            </div>
            {pageNumbers.map(number => (
                <div key={number} className={`page-item  ${((currentTable - 5) <= number && number < currentTable)|| ((currentTable + 5) >= number && number >= currentTable)? " show " : ''}  ${currentTable === number ? " active " : ''}`}>
                    <a href="#" onClick={(event) => {
                        event.preventDefault();
                        onChangeTable(number)
                    }}
                        className="page-link">{number}</a>
                </div>
            ))}
            <div className="page-item show">
                <a href="#" onClick={(event) => {
                    event.preventDefault();
                    if (currentTable < totalTable)
                        onChangeTable(currentTable + 1)
                }}
                    className="page-link">&raquo;</a>
            </div>
        </div>
    );
}