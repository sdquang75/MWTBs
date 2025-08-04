
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showBackButton?: boolean;
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>

      {showBackButton ? (
        <button  className={styles.backButton} onClick={() => navigate(-1)}>
          {/* <div className={styles.iconPlaceholder}>←</div> Placeholder cho icon back */}
          <span>戻る</span>
        </button>
      ) : (

        <div></div>
      )}
 <button  className={styles.homeButton} onClick={() => navigate('/')}>
          {/* <div className={styles.iconPlaceholder}>←</div> Placeholder cho icon back */}
          <span>自分レシピ</span>
        </button>
      {/* Nút "Đăng xuất" luôn ở bên phải */}
      <a href="#" className={styles.logoutButton}>

        <div className={styles.logoutButtonText}>
          <span>ログ</span>
          <span>アウト</span>
        </div>
      </a>
    </header>
  );
};