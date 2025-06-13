import React, { useState } from 'react';
import styles from './RegisterSafetyStatusScreen.module.css';

const RegisterSafetyStatusScreen: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoutWrapper}>
          <button className={styles.logoutBtn}>
            {/* Logout SVG */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 13.5L5.69 12.44L8.19 9.94H1.5V8.06H8.19L5.69 5.56L6.75 4.5L11.25 9L6.75 13.5ZM15 16.5H9V14.62H15V3.38H9V1.5H15C15.825 1.5 16.5 2.175 16.5 3V15C16.5 15.825 15.825 16.5 15 16.5Z" fill="#000"/>
            </svg>
            <span className={styles.logoutText}>ログアウト</span>
          </button>
        </div>
      </div>
      {/* Main Card */}
      <div className={styles.card}>
        <h1 className={styles.title}>登録</h1>
        <p className={styles.subtitle}>身体情報を選択してください</p>
        {/* Gender */}
        <div className={styles.inputGroup} style={{ marginTop: 32 }}>
          <span className={styles.label}>性別選択</span>
          <label className={styles.radioLabel}>
            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> 女性
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> 男性
          </label>
        </div>
        {/* Birthday */}
        <div className={styles.inputGroup} style={{ marginTop: 24 }}>
          <span className={styles.label}>生年月日入力</span>
          <div className={styles.inputWithIcon}>
            <input
              type="date"
              className={styles.inputField}
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder="生/年/月/日"
            />
            {/* Calendar SVG */}
            <span className={styles.inputIcon}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="16" height="14" rx="2" fill="#fff" stroke="#000" strokeWidth="1.5"/>
                <rect x="7" y="1" width="1.5" height="4" rx="0.75" fill="#000"/>
                <rect x="13.5" y="1" width="1.5" height="4" rx="0.75" fill="#000"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Height */}
        <div className={styles.inputGroup} style={{ marginTop: 24 }}>
          <span className={styles.label}>身長入力</span>
          <div className={styles.inputWithIcon}>
            <input
              type="number"
              className={styles.inputField}
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.1"
            />
            <span className={styles.inputUnit}>cm</span>
            {/* Height SVG */}
            <span className={styles.inputIcon}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="2" width="2" height="18" rx="1" fill="#000"/>
                <rect x="6" y="6" width="10" height="2" rx="1" fill="#000"/>
                <rect x="6" y="14" width="10" height="2" rx="1" fill="#000"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Weight */}
        <div className={styles.inputGroup} style={{ marginTop: 24 }}>
          <span className={styles.label}>体重入力</span>
          <div className={styles.inputWithIcon}>
            <input
              type="number"
              className={styles.inputField}
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.1"
            />
            <span className={styles.inputUnit}>kg</span>
            {/* Weight SVG */}
            <span className={styles.inputIcon}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="7" width="16" height="8" rx="2" fill="#000"/>
                <rect x="7" y="3" width="8" height="4" rx="2" fill="#000"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Register Button */}
        <button className={styles.registerButton} style={{ marginTop: 40 }}>登録する</button>
      </div>
    </div>
  );
};

export default RegisterSafetyStatusScreen;
