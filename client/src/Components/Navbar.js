import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (

    <div className="main-navigation">
      <nav className="navbar navbar-expand-lg navbar-light  bg-nav fixed-top sticky-top">
        <Link className="navbar-brand" to="/">
          <img src="./logo.png" width="130" height="30" className="d-inline-block align-top" alt="cyphertrip" />
        </Link>
        <ul className="navbar-nav">


          <li className="nav-item">
            <Link className="nav-link btn btn-circle" to="/Profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>

  );
}

export default Navbar;
