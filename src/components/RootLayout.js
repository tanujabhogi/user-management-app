import React from 'react'
import Navigationbar from './navigationbar/Navigationbar'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div>
      <div className="content-container"> <Navigationbar/>
      <div style={{minHeight:"498px"}} className='container'><Outlet/></div>
      </div >
      <div className="footer-container"><Footer/></div>
    </div>
    
  )
}

export default RootLayout