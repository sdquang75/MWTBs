import React from 'react';
import styles from './CategoryChip.module.css';

const CategoryChip: React.FC<{ icon: string; label: string; onClick?: () => void; active?: boolean }>
 = ({ icon, label, onClick, active }) => (
  <button
    className={`${styles.chip} ${active ? styles.active : ''}`}
    onClick={onClick}
    type="button"
  >
    <span className={styles.icon}>{icon}</span>
    {label}
  </button>
);

export default CategoryChip;
