
import React from 'react';
import styles from './SelectField.module.css';

type SelectFieldProps = React.ComponentProps<'select'> & {
  id: string;
  label: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({ id, label, children, ...props }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select id={id} {...props} className={styles.select}>
          {children}
        </select>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
};