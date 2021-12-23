import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import TaskBoxLogoText from '../assets/taskbox_logo_text.svg';
import './Navbar.css';

const Navbar = ({ handleToggle }) => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={`navbar ${!user && 'not-loggedin'}`}>
      <div className="logo">
        <Link to="/">
          <img src={TaskBoxLogoText} alt="taskbox logo" />
        </Link>
      </div>
      <div>
        {!user ? (
          <div className="auth-wrap">
            <div>
              <Link to="login">
                <FontAwesomeIcon className="auth-icon" icon={faLock} />
                Login
              </Link>
            </div>
            <div>
              <Link to="Signup">
                <FontAwesomeIcon className="auth-icon" icon={faUser} />
                Signup
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {!isPending && (
              <div className="logout-btn" onClick={logout}>
                <FontAwesomeIcon className="logout-icon" icon={faSignOutAlt} />
                Logout
              </div>
            )}
            {isPending && (
              <div className="logout-btn" disabled onClick={logout}>
                Logging out...
              </div>
            )}
          </div>
        )}
        {user && (
          <div onClick={handleToggle} className="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
