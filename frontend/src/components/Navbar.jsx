import React from "react";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate()

    async function Logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    navigate('/login')
  }
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
            <Link to={'/'}><h2>TechSpark</h2></Link>
        </div>

        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <ul className="nav-menu">
          <li>
            <Link to={'/event/create'}>+ New Event</Link>
          </li>
          <li className="dropdown">
            <Link to={'/'}>Account</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to={'/login'}>Login</Link>
              </li>
              <li>
                <Link to={'/register'}>Register</Link>
              </li>
              <li>
                <button onClick={Logout}>Logout</button>
              </li>
            </ul>
          </li>
          <li>
            <Link to={`/event/booking/history`}>Booking History</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
