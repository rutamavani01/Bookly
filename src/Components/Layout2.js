import React from 'react'
import Sidebar2 from './Utilities/Sidebar2'
import { Outlet } from 'react-router-dom'

export const Layout2 = () => {
  return (
    <div className="layout">
      <Sidebar2 />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
