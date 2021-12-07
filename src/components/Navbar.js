import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Temple from '../assets/temple.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Dojo</span>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="Signup">Signup</Link>
        </li>
        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
