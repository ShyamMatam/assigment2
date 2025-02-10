import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h2>Real Estate CRM</h2>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink
                        to="/leads"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        <i className="fas fa-users"></i>
                        Leads
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/properties"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        <i className="fas fa-building"></i>
                        Properties
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
