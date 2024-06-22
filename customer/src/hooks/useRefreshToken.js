// src/hooks/useRefreshToken.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshTokenMutation } from '../redux/user/authApiSlice';
import { setCredentials, logout } from '../redux/user/authSlice';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const refresh = async () => {
      try {
        const newAccessToken = await refreshToken().unwrap();
        console.log('newAccessToken: ', newAccessToken);
        dispatch(setCredentials(newAccessToken));
      } catch (err) {
        dispatch(logout());
        console.error('Failed to refresh token: ', err);
      }
    };

    if (!accessToken) {
      refresh();
    }
  }, [accessToken, dispatch, refreshToken]);
};

export default useRefreshToken;
