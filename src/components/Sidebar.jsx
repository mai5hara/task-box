import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faTimes,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import './Sidebar.css';

// fontawesome.library.add(faUser);

const Sidebar = ({ isSidebarOpen, handleToggle }) => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div
      className={`sidebar${isSidebarOpen ? ' sidebar-open' : ''}`}
      onClick={handleToggle}
    >
      {isSidebarOpen && (
        <FontAwesomeIcon className="close-icon" icon={faTimes} />
      )}
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/" onClick={handleToggle}>
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/create" onClick={handleToggle}>
                <div className="nav-icon-wrap">
                  <FontAwesomeIcon icon={faPlus} alt="add icon" />
                </div>
                <span>New Project</span>
              </NavLink>
              <NavLink to="/users" className="all-users" onClick={handleToggle}>
                <div className="nav-icon-wrap">
                  <FontAwesomeIcon icon={faUser} alt="all users icon" />
                </div>
                <span>All Users</span>
              </NavLink>
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
