// src/components/Header.tsx
import styles from './Header.module.css';

export const Header = () => {
  return (
   <header className={styles.header}>
          <a href="#" className={styles.logoutButton}>
            {/* <div className={styles.logoutIconPlaceholder}></div> */}
            <div className={styles.logoutButtonText}>
              <span>ログ</span>
              <span>アウト</span>
            </div>
          </a>
        </header>
  );
};