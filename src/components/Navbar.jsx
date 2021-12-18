import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Temple from '../assets/temple.svg';
import './Navbar.css';

const Navbar = ({ handleToggle, isSidebarOpen }) => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Temple} alt="dojo logo" />
          <span>Task Box</span>
        </Link>
      </div>
      <div>
        {!user ? (
          <>
            <div>
              <Link to="login">Login</Link>
            </div>
            <div>
              <Link to="Signup">Signup</Link>
            </div>
          </>
        ) : (
          <div>
            {!isPending && (
              <button className="btn logout-btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled onClick={logout}>
                Logging out...
              </button>
            )}
          </div>
        )}
        <div onClick={handleToggle} className="hamburger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
