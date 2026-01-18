import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUpdateUser,
  getUser
} from '../../components/slices/user/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const rawUser = useSelector(getUser);
  const user = rawUser === null ? { name: '', email: '' } : rawUser;

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged = {
    name: formValue.name !== user?.name,
    email: formValue.email !== user?.email,
    password: !!formValue.password
  };

  // const isFormChanged =
  //   formValue.name !== user?.name ||
  //   formValue.email !== user?.email ||
  //   !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(fetchUpdateUser(formValue));
    e.preventDefault();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
