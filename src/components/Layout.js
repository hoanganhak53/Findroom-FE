import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../views/Footer'
import { NavBar } from '../views/NavBar'

const Layout = () => {
    return (
    <React.Fragment>
        <NavBar />
        <div className="container mt-3 pl-5 pr-5">
            <Outlet />
        </div>
        <Footer />
    </React.Fragment>
    )
}
export default Layout