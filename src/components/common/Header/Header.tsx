import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <span className={styles.headerIcon}>☰</span>
    <h1 className={styles.headerTitle}>Hôm nay nấu gì?</h1>
    <span className={styles.headerIcon}>🔔</span>
  </header>
);

export default Header;
