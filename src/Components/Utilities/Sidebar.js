import React from 'react'

export const Sidebar = () => {
    return (
        <div className="d-flex flex-column  p-1 sidebar pt-5 text-white bg-dark" style={{ width: 192,  }}>
            <ul className="nav nav-pills flex-column mb-auto text-start">
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        <img src='/assets/image/logo.png' className='me-2' />
                        Bookly
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <img src='/assets/image/menu_cloud 1.png' className='me-2' />
                        Bookly Cloud
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <img src='/assets/image/Vector.png' className='me-2' />
                        Collapse menu
                    </a>
                </li>

            </ul>
        </div>
    )
}
