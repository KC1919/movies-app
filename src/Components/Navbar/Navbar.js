import React from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <>
        <div style={{display:'flex',alignItems:'center', padding:'1rem'}}>
            <Link to="/" style={{textDecoration:'none'}}><h2 style={{marginLeft:'5px'}}>Movies App</h2></Link>
            <Link to="/favorites" style={{textDecoration:'none'}}><h3 style={{margin:'5px 2rem'}}>Favourites</h3></Link>
        </div>
    </>
  )
}

export default Navbar