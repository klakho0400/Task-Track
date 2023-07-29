import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
  render() {
    const navbarStyle = {
      backgroundColor: '#2c3e50', // Dark blue color for the navbar
      padding: '10px',
    };

    const navLinkStyle = {
      color: 'white',
      textDecoration: 'none',
      marginRight: '10px',
    };

    const iconStyle = {
      marginRight: '5px',
    };

    return (
      <nav className="navbar navbar-dark navbar-expand-lg" style={navbarStyle}>
        <div className="container">
          <div className="navbar-brand">Task Tracker</div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/admin" className="nav-link" style={navLinkStyle}>
                  <FontAwesomeIcon icon="tasks" style={iconStyle} />Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/log-task" className="nav-link" style={navLinkStyle}>
                  <FontAwesomeIcon icon="clipboard-list" style={iconStyle} />Log Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-user" className="nav-link" style={navLinkStyle}>
                  <FontAwesomeIcon icon="user-plus" style={iconStyle} />Create User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
