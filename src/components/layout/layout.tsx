import { FC } from 'react';
import { LayoutProps } from './type';
import styles from './layout.module.css';

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);
