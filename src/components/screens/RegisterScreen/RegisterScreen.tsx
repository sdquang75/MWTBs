// src/components/screens/RegisterScreen/RegisterScreen.tsx
import React, { useState } from 'react';
import styles from './RegisterScreen.module.css';
import IconicInput from '../../common/IconicInput/IconicInput';

// Import SVG icons
import LogoutIcon from '../../../assets/icons/logout-icon.svg?react';
import CalendarIcon from '../../../assets/icons/calendar-icon.svg?react';
import HeightIcon from '../../../assets/icons/height-icon.svg?react';
import WeightIcon from '../../../assets/icons/weight-icon.svg?react';

const RegisterScreen: React.FC = () => {
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [errors, setErrors] = useState<{ gender?: string; dob?: string; height?: string; weight?: string }>({});
  const [touched, setTouched] = useState<{ gender?: boolean; dob?: boolean; height?: boolean; weight?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation logic
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!gender) newErrors.gender = '性別を選択してください';
    if (!dob) newErrors.dob = '生年月日を入力してください';
    if (!height || isNaN(Number(height)) || Number(height) <= 0) newErrors.height = '正しい身長を入力してください';
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) newErrors.weight = '正しい体重を入力してください';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ gender: true, dob: true, height: true, weight: true });
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setIsLoading(true);
    setSuccess(false);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSuccess(true);
    // Reset form nếu muốn: setGender(''); setDob(''); setHeight(''); setWeight('');
  };

  // Hiển thị lỗi realtime khi đã touched
  React.useEffect(() => {
    if (Object.values(touched).some(Boolean)) {
      setErrors(validate());
    }
  }, [gender, dob, height, weight]);

  // Xử lý tự động chèn '/' cho dob
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9/]/g, '');
    // Xóa các dấu '/' thừa
    value = value.replace(/\/+$/g, '');
    // Tự động chèn '/' sau 4 và 7 ký tự số
    if (value.length === 4 && !value.endsWith('/')) value += '/';
    if (value.length === 7 && value[6] !== '/') value = value.slice(0, 7) + '/' + value.slice(7);
    setDob(value);
    setTouched(t => ({ ...t, dob: true }));
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <button className={styles.logoutButton} type="button">
          <LogoutIcon className={styles.logoutIcon} />
          <span>ログアウト</span>
        </button>
      </header>
      <main className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>登録</h1>
          <p className={styles.subtitle}>身体情報を選択してください</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* --- Gender Selection --- */}
            <div className={styles.genderGroup}>
              <span className={styles.genderLabel}>性別選択</span>
              <div className={styles.genderOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={e => { setGender(e.target.value); setTouched(t => ({ ...t, gender: true })); }}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  女性
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={e => { setGender(e.target.value); setTouched(t => ({ ...t, gender: true })); }}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  男性
                </label>
              </div>
              {touched.gender && errors.gender && (
                <span style={{ color: '#EF4444', fontWeight: 600, marginTop: 4, display: 'block', textAlign: 'center', transition: 'color 0.2s' }}>{errors.gender}</span>
              )}
            </div>
            {/* --- Reusable Iconic Inputs --- */}
            <IconicInput
              id="dob"
              label="生年月日入力"
              icon={<CalendarIcon />}
              type="text"
              placeholder="生/年/月/日"
              value={dob}
              onChange={handleDobChange}
              onBlur={() => setTouched(t => ({ ...t, dob: true }))}
              autoFocus
            />
            {touched.dob && errors.dob && (
              <span style={{ color: '#EF4444', fontWeight: 600, marginTop: -16, marginBottom: 8, display: 'block', textAlign: 'center', transition: 'color 0.2s' }}>{errors.dob}</span>
            )}
            <IconicInput
              id="height"
              label="身長入力"
              icon={<HeightIcon />}
              type="text"
              placeholder="0.0 cm"
              value={height}
              onChange={e => { setHeight(e.target.value); setTouched(t => ({ ...t, height: true })); }}
              onBlur={() => setTouched(t => ({ ...t, height: true }))}
            />
            {touched.height && errors.height && (
              <span style={{ color: '#EF4444', fontWeight: 600, marginTop: -16, marginBottom: 8, display: 'block', textAlign: 'center', transition: 'color 0.2s' }}>{errors.height}</span>
            )}
            <IconicInput
              id="weight"
              label="体重入力"
              icon={<WeightIcon />}
              type="text"
              placeholder="0.0 kg"
              value={weight}
              onChange={e => { setWeight(e.target.value); setTouched(t => ({ ...t, weight: true })); }}
              onBlur={() => setTouched(t => ({ ...t, weight: true }))}
            />
            {touched.weight && errors.weight && (
              <span style={{ color: '#EF4444', fontWeight: 600, marginTop: -16, marginBottom: 8, display: 'block', textAlign: 'center', transition: 'color 0.2s' }}>{errors.weight}</span>
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || Object.keys(errors).length > 0 || !gender || !dob || !height || !weight}
              style={{ width: '100%', marginTop: 16, transition: 'background 0.2s' }}
            >
              {isLoading ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  登録中...
                </>
              ) : (
                '登録する'
              )}
            </button>
            {success && (
              <span style={{ color: '#10B981', fontWeight: 700, marginTop: 16, display: 'block', textAlign: 'center', fontSize: 15 }}>登録が完了しました！</span>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterScreen;