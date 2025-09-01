import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import useToken from '../helpers/LoginHelpers';
import Login from '../pages/Login/Login';

interface LayoutProps {
  getPlanner: () => void;
}

const Layout = ({ getPlanner }: LayoutProps) => {
  const { token, setToken } = useToken();

  if (!token || token === '') {
    return <Login setToken={setToken} getPlanner={getPlanner} />;
  }

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Outlet />
    </>
  );
};

export default Layout;
