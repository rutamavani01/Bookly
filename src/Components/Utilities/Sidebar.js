import React from 'react'

export const Sidebar = () => {
    return (
        <div className="d-flex flex-column  sidebar pt-5 text-white bg-dark" style={{ width: 180, }}>
            <ul className="nav nav-pills flex-column mb-auto text-start">
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        <img src='assets/image/logo.png' className='me-2' />
                        Bookly
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <img src='/assets/image/menu_cloud.png' className='me-1' />
                        Bookly Cloud
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <img src='/assets/image/collapse menu.png' className='me-1' />
                        Collapse menu
                    </a>
                </li>

            </ul>
        </div>
    )
}
