import React from 'react';
import { Sidebar } from './Utilities/Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
