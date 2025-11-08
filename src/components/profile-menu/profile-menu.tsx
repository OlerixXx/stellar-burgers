import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { fetchLogoutUser } from '../slices/userSlice';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(fetchLogoutUser())
      .unwrap()
      .then((response) => {
        deleteCookie('accessToken');
        localStorage.clear();
        navigate('/login');
      })
      .catch(({ message }) => alert(message));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
