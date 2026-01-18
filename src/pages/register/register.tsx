import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  fetchGetUser,
  fetchRegisterUser
} from '../../components/slices/user/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ email, name: userName, password }))
      .unwrap()
      .then((response) => {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(fetchGetUser())
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch(({ message }) => alert(message));
      })
      .catch(({ message }) => alert(message));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
