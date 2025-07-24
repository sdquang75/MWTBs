// src/components/InputField.tsx
import React, { ReactNode } from 'react';
import styles from './InputField.module.css';

// Kế thừa các thuộc tính gốc của input
type InputFieldProps = React.ComponentProps<'input'> & {
  id: string;
  label: string;
  icon: ReactNode;
  rightIcon?: ReactNode;
};

export const InputField: React.FC<InputFieldProps> = ({ id, label, icon, rightIcon, ...props }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>{icon}</span>
        <input id={id} {...props} className={styles.input} />
        {rightIcon && (
          <div className={styles.rightIcon}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};