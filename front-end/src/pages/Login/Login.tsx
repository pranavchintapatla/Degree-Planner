import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import BasePopup from '../../components/BasePopup/BasePopup';
import './Login.scss';

//The login page component which displays the login form

interface Credentials {
  Username: string;
  Password: string;
}

async function loginUser(credentials: Credentials) {
  const response = await axios.post(
    'https://localhost:5001/api/Account/Login',
    {
      Username: credentials.Username,
      Password: credentials.Password,
    }
  );

  return response.data;
}

interface LoginProps {
  setToken: (userToken: string) => void;
  getPlanner: () => void;
}

const Login = ({ setToken, getPlanner }: LoginProps) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await loginUser({
      Username,
      Password,
    });
    if (token === 'Invalid user details.') {
      setOpen(true);
    } else {
      setToken(token);
      sessionStorage.setItem('id', Username);
      sessionStorage.setItem('idpassword', Password);
      navigate('/');
      getPlanner();
    }
  };

  return (
    <div className="Login">
      <div className="Login__wrapper">
        <form className="Login__form" onSubmit={handleSubmit}>
          <h2 className="Login__title">Login</h2>
          <div className="Login__input">
            <Input
              id="login"
              type="text"
              placeholder="ID"
              value={Username}
              onChange={setUsername}
            />
          </div>
          <div className="Login__input">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={Password}
              onChange={setPassword}
            />
          </div>
          <button type="submit" className="Login__button btn btn--light-blue">
            Submit
          </button>
        </form>
      </div>
      <BasePopup
        header="Error"
        body="Invalid user details."
        closeText="Ok"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
