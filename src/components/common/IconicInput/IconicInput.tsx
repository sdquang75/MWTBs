// src/components/common/IconicInput/IconicInput.tsx
import React from 'react';
import styles from './IconicInput.module.css';

// Định nghĩa props cho component
interface IconicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

const IconicInput: React.FC<IconicInputProps> = ({ label, icon, ...rest }) => {
  return (
    <div className={styles.group}>
      <label htmlFor={rest.id} className={styles.label}>
        {label}
      </label>
      <div className={styles.wrapper}>
        <input className={styles.input} {...rest} />
        <div className={styles.iconWrapper}>{icon}</div>
      </div>
    </div>
  );
};

export default IconicInput;