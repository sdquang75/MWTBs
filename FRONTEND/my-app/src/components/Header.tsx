
import styles from './Header.module.css';


interface HeaderProps {
  showBackButton?: boolean;
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
  return (
    <header className={styles.header}>
      {/* Nút "Quay lại" chỉ hiển thị khi showBackButton là true */}
      {showBackButton && (
        <a href="#" className={styles.backButton}>
          {/* <div className={styles.iconPlaceholder}>←</div> Placeholder cho icon back */}
          <span>戻る</span>
        </a>
      )}

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