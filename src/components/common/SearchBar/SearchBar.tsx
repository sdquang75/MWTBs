import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void; onClear?: () => void; placeholder?: string; }>
 = ({ value, onChange, onClear, placeholder }) => (
  <div className={styles.searchWrapper}>
    <span className={styles.searchIcon}>🔍</span>
    <input
      type="text"
      className={styles.searchInput}
      placeholder={placeholder || 'Tìm kiếm...'}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {!!value && onClear && (
      <button
        className={styles.clearIcon}
        onClick={onClear}
        aria-label="Xóa ô tìm kiếm"
      >
        ×
      </button>
    )}
  </div>
);

export default SearchBar;
