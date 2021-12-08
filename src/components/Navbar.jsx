import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Temple from '../assets/temple.svg';

const Navbar = () => {
  const { logout, isPending } = useLogout();

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
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled onClick={logout}>
              Logging out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
