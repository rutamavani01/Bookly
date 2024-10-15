import React from 'react'

const Sidebar2 = () => {
    return (
        <div className="d-flex flex-column  sidebar text-white bg-dark" style={{ width: 165,height:'100vh' }}>
            <ul className="nav nav-pills flex-column text-start">
                <li className="nav-item bookly-nav s2">
                    <a href="#" className="nav-link text-white " aria-current="page">
                        <img src='/assets/image/logo.png' className='me-2' />
                        Bookly
                    </a>
                </li>
            </ul>
            <div className='d-flex flex-column justify-content-between'>
                <div className=''>
                    <ul className='menu'>
                        <li>
                            <a href="/dashboard" className="d-flex justify-content-lg-start nav-link text-white ">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="calendar" className="d-flex justify-content-lg-start nav-link text-white ">
                                Calendar
                            </a>
                        </li>
                        <li>
                            <a href="/appointment" className="d-flex justify-content-lg-start nav-link text-white ">
                                Appointment
                            </a>
                        </li>
                        <li>
                            <a href="/staffmember" className="d-flex justify-content-lg-start nav-link text-white ">
                                Staff Members
                            </a>
                        </li>
                        <li>
                            <a href="/service" className="d-flex justify-content-lg-start nav-link text-white ">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Customers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Email Notification
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                SMS Notifications
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Payments
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Appearance
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Diagnostics
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                News
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                Addons
                            </a>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <ul className="nav nav-pills flex-column mb-auto text-start ">
                        <li>
                            <a href='#' className="sidebar2-grow d-flex justify-content-lg-start nav-link text-white ">Grow your business w/</a>
                        </li>
                        <li className="nav-item bookly-nav addons">
                            <a href="#" className="nav-link  " aria-current="page">
                                <img src='/assets/image/logo.png' className='me-2' />
                                Addons
                            </a>
                        </li>
                        <li className="nav-item bookly-nav addons">
                            <a href="#" className="nav-link  " aria-current="page">
                                <img src='/assets/image/logo.png' className='me-2' />
                                Addons
                            </a>
                        </li>
                        <li className='sidebar2-icon'>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                <img src='/assets/image/menu_cloud.png' />   Dashboard
                            </a>
                        </li>
                        <li className='sidebar2-icon'>
                            <a href="#" className="d-flex justify-content-lg-start nav-link text-white ">
                                <img src='/assets/image/collapse menu.png' />   collapse menu
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar2