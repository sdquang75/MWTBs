
import styles from './DashboardButton.module.css';

type DashboardButtonProps = {
  label: string;
  onClick: () => void;
   icon?: string; 
};

export const DashboardButton = ({ label, onClick ,icon}: DashboardButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <img src={icon} alt={`${label} icon`} className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </button>
  );
};