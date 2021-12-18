import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowSize from '../hooks/useWindowSize';
import {
  faSignOutAlt,
  faTimes,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import DashboardIcon from '../assets/dashboard_icon.svg';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, handleToggle }) => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const size = useWindowSize();

  const navLink = (to, children) => {
    if (size.width > 768) {
      return <NavLink to={to}>{children}</NavLink>;
    } else {
      return (
        <NavLink to={to} onClick={handleToggle}>
          {children}
        </NavLink>
      );
    }
  };

  return (
    <div className={`sidebar${isSidebarOpen ? ' sidebar-open' : ''}`}>
      <FontAwesomeIcon
        onClick={handleToggle}
        className="close-icon"
        icon={faTimes}
      />
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              {navLink(
                '/',
                <>
                  <img src={DashboardIcon} alt="dashboard icon" />
                  <span>Dashboard</span>
                </>
              )}
              {navLink(
                '/create',
                <>
                  <div className="nav-icon-wrap">
                    <FontAwesomeIcon icon={faPlus} alt="add icon" />
                  </div>
                  <span>New Project</span>
                </>
              )}
              {navLink(
                '/users',
                <>
                  <div className="nav-icon-wrap">
                    <FontAwesomeIcon icon={faUser} alt="all users icon" />
                  </div>
                  <span>All Users</span>
                </>
              )}
            </li>
          </ul>
        </nav>
        {isSidebarOpen && !isPending && (
          <div className="logout-btn" onClick={logout}>
            <FontAwesomeIcon className="logout-icon" icon={faSignOutAlt} />
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
