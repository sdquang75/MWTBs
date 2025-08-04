import React from 'react';
import styles from './IngredientTag.module.css';

const IngredientTag: React.FC<{ name: string; onRemove?: () => void }>
 = ({ name, onRemove }) => (
  <div className={styles.tag}>
    <span>{name}</span>
    {onRemove && (
      <button
        className={styles.removeBtn}
        onClick={onRemove}
        aria-label={`Xóa ${name}`}
        type="button"
      >
        ×
      </button>
    )}
  </div>
);

export default IngredientTag;
