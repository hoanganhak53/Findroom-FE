import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../views/NavBar'

const Layout = () => {
    return (
    <React.Fragment>
        <NavBar />
        <div className="container mt-3">
            <Outlet />
        </div>
    </React.Fragment>
    )
}
export default Layout