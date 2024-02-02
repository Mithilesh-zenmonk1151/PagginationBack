import React from 'react'
import './navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <div className="nav">
            <div className="Home">
               
              <Link to="/add-user" className="link">
                Add User
              </Link>
            </div>
            <div className="">
              <Link to="/view-user" className="link">
                View Users
              </Link>
            </div>
            </div>
            
        </div>
    )
}

export default Navbar
