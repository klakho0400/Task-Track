import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="navbar-brand">Task Tracker</div>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/admin" className="nav-link">Tasks</Link>
          </li>
          <li className="navbar-item">
          <Link to="/log-task" className="nav-link">Log Tasks</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create-user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}