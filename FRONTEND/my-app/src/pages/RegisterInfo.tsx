
import { useState } from 'react';
import { InputField } from '../components/InputField';
import styles from './RegisterInfo.module.css';
import loginStyles from './Login.module.css';
import mot from '../assets/solar_calendar-linear.svg';
import hai from '../assets/mdi_human-male-height.svg';
import ba from '../assets/wn.svg';
import { Header } from '../components/Header';


export const RegisterInfo = () => {
  const [gender, setGender] = useState('female');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); 
    let formattedValue = value;
    if (value.length > 4) {
      formattedValue = `${value.slice(0, 4)}/${value.slice(4)}`;
    }
    if (value.length > 6) {
      formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`;
    }
    setDob(formattedValue.slice(0, 10)); 
  };

  
  const handleDecimalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInfo = { gender, dob, height, weight };
    console.log('Thông tin đăng ký:', userInfo);
  };

  
  const IconPlaceholder = () => <div className={styles.iconPlaceholder}></div>;

  return (
    <div className={loginStyles.phoneFrame}>
      <div className={styles.screen}>
     <Header />

        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>登録</h2>
              <p className={styles.subtitle}>身体情報を選択してください</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Gender Selection */}
              <div className={styles.formGroup}>
                <label className={styles.label}>性別選択</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio" name="gender" value="female"
                      checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}
                      className={styles.radioInput}
                    />
                    <span></span>
                    女性
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio" name="gender" value="male"
                      checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}
                      className={styles.radioInput}
                    />
                    <span></span>
                    男性
                  </label>
                </div>
              </div>

              {/* Inputs sử dụng lại component InputField */}
              <InputField
                id="dob"
                label="生年月日入力"
                type="text"
                placeholder="生/年/月/日"
                icon={<></>}
                rightIcon={<img src={mot} alt="Calendar Icon" className={styles.inputIcon} />}
                value={dob}
                onChange={handleDobChange}
                maxLength={10}
              />
              <InputField
                id="height"
                label="身長入力"
                type="text" 
                placeholder="0.0 cm"
                icon={<></>}
                rightIcon={<img src={hai} alt="Calendar Icon" className={styles.inputIcon} />}
                value={height}
                onChange={(e) => handleDecimalChange(e, setHeight)}
              />
              <InputField
                id="weight"
                label="体重入力"
                type="text"
                placeholder="0.0 kg"
                icon={<></>}
                rightIcon={<img src={ba} alt="Calendar Icon" className={styles.inputIcon} />}
                value={weight}
                onChange={(e) => handleDecimalChange(e, setWeight)}
              />
              
              <button type="submit" className={styles.registerButton}>
                登録する
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};