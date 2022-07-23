import React from 'react';
import '../App.css';
import {
    Link
  } from "react-router-dom";

function HeaderBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand headerTextColor" >CQTechnology</a>
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link headerTextColor " aria-current="page" to={"/"} >Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link headerTextColor" to={"/details"} >Detail</Link>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default HeaderBar