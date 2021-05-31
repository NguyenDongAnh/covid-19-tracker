import React from 'react'
import {Link} from 'react-router-dom'
export default function Nav() {
    return (
        <nav className="f-width">
            <div className="container">
                <Link to="covid-19-tracker">
                    <div className="title">
                        C<i className='bx bxs-virus bx-tada' ></i>VID19 TRACKER
                </div>
                </Link>
            </div>
        </nav>
    )
}