import React from 'react';
import styles from './CallToActionButton.module.css';

const CallToActionButton: React.FC<{ count: number; onClick?: () => void; loading?: boolean }>
 = ({ count, onClick, loading }) => (
  <button
    className={styles.ctaButton}
    disabled={count === 0 || loading}
    onClick={onClick}
    type="button"
  >
    {loading ? (
      <span className={styles.spinner}></span>
    ) : count === 0 ? (
      'Chọn nguyên liệu để xem điều kỳ diệu!'
    ) : (
      `Tìm ${count} món ngon ngay!`
    )}
  </button>
);

export default CallToActionButton;
