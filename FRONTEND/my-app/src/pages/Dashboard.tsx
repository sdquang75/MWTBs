// src/pages/Dashboard.tsx
import { Header } from '../components/Header';
import { DashboardButton } from '../components/DashboardButton';
import styles from './Dashboard.module.css';
import loginStyles from './Login.module.css';
import bon from '../assets/image 12.svg';
import nam from '../assets/image 11.svg';

export const Dashboard = () => {
  return (
    <div className={loginStyles.phoneFrame}>
      <div className={styles.screen}>
        <Header />
        <main className={styles.main}>
          <DashboardButton
            label="食材入力"
            onClick={() => console.log('Go to Ingredient Input')}
            icon={bon}
          />
          <DashboardButton
            label="食事履歴"
            onClick={() => console.log('Go to Meal History')}
            icon={nam}
          />
        </main>
      </div>
    </div>
  );
};