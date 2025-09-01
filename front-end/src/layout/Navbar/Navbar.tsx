import { NavLink, useNavigate } from 'react-router-dom';

import './Navbar.scss';

interface LoginProps {
  token: string;
  setToken: (userToken: string) => void;
}

const Navbar = ({ token, setToken }: LoginProps) => {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('idpassword');
    setToken('');
    navigate(0);
  };

  return (
    <nav className="Navbar">
      <ul>
        <li>
          <img src="/logo192.png" alt="Logo" />
        </li>
        <li>
          <h1 className="Navbar__title">SciPlan</h1>
        </li>
        <li>
          <NavLink className="Navbar__link" to="/">
            Home
          </NavLink>
        </li>
        {token === 'staff' && (
          <li>
            <NavLink className="Navbar__link" to="/staff">
              Staff
            </NavLink>
          </li>
        )}
        <li>
          <NavLink className="Navbar__link" to="/planner">
            Planner
          </NavLink>
        </li>
      </ul>
      <div className="Navbar__user-greeting">
        <div className="Navbar__user-info">
          Hi <i>{sessionStorage.getItem('id')}</i>
        </div>
        <button className="Navbar__user-logout" onClick={Logout}>
          Logout
        </button>
      </div>
      <div className="Navbar__user-print">
        for <i>{sessionStorage.getItem('id')}</i>
      </div>
    </nav>
  );
};

export default Navbar;
