import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const isConstructorActive =
    location.pathname === '/' || location.pathname.startsWith('/ingredients');
  const isProfileActive =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/profile' ||
    location.pathname === '/profile/orders';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={'/'}
            className={`mr-10 ${styles.link} ${isConstructorActive ? styles.link_active : 'text_color_inactive'}`}
          >
            <>
              <BurgerIcon
                type={isConstructorActive ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </>
          </NavLink>
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : 'text_color_inactive'}`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink
          to={'/profile'}
          className={`${styles.link_position_last} ${styles.link} ${isProfileActive ? styles.link_active : 'text_color_inactive'}`}
          end
        >
          <>
            <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </>
        </NavLink>
      </nav>
    </header>
  );
};
