import React from 'react'

export default function Nav({setDefault}) {
    return (
        <nav className="f-width">
            <div className="container">
                <a href="#" onClick={setDefault}>
                    <div className="title">
                        C<i className='bx bxs-virus bx-tada' ></i>VID19 TRACKER
                    </div>
                </a>
            </div>
        </nav>
    )
}