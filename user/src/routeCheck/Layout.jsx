import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/navbar/Topbar';
import Footer from '../components/footer/Footer';
import ScrollToTop from '../components/ScrollToTop'

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950">
        <div className="w-full">
          <ScrollToTop />
          <Topbar />
          <Navbar />
          <div className='mx-auto min-h-screen'><Outlet /></div>
          <Footer />
      </div>
    </div>
  );
}

export default Layout
