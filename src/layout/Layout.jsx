import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function layout() {
    return (
        <>
            <Navbar />
            <main className='container p-2 min-h'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
