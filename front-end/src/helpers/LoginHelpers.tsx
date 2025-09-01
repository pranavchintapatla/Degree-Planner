import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//This helper gets and sets the login token so that the application knows if the user is logged in or not

export default function useToken() {
    const getToken = () => {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString!);
      return userToken
    };
  
    const [token, setToken] = useState(getToken());
  
    const saveToken = (userToken: string) => {
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken);
    };
  
    return {
      setToken: saveToken,
      token
    }
  }
