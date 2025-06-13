import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUpScreen.module.css';

import UserIcon from '../../../assets/icons/user-icon.svg?react';
import MailIcon from '../../../assets/icons/mail-icon.svg?react';
import LockIcon from '../../../assets/icons/lock-icon.svg?react';
import EyeIcon from '../../../assets/icons/eye-icon.svg?react';

// TypeScript type for errors
 type Errors = {
   fullName?: string;
   email?: string;
   password?: string;
   confirmPassword?: string;
   terms?: string;
 };

const SignUpScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<keyof Errors, boolean>>({ fullName: false, email: false, password: false, confirmPassword: false, terms: false });
  const [isLoading, setIsLoading] = useState(false);

  // Helper validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const validateFullName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validatePassword = (pwd: string): { isValid: boolean; strength: "弱" | "普通" | "強" } => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    const isLengthValid = pwd.length >= 8;

    const isValid = isLengthValid && hasUpper && hasLower && hasDigit && hasSpecial;
    
    let strength: "弱" | "普通" | "強";
    if (!isLengthValid) {
      strength = "弱";
    } else {
      const criteriaCount = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;
      if (criteriaCount <= 2) {
        strength = "弱";
      } else if (criteriaCount === 3) {
        strength = "普通";
      } else {
        strength = "強";
      }
    }

    return { isValid, strength };
  };

  const validateConfirmPassword = (pwd: string, confirm: string): boolean => {
    return pwd === confirm;
  };

  // Enhanced password validation function
  const getPasswordErrorMessage = (pwd: string): string | null => {
    if (!pwd.trim()) {
      return 'パスワードを入力してください';
    }
    if (pwd.length < 8) {
      return 'パスワードは8文字以上で入力してください';
    }
    
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    
    const missingCriteria = [];
    if (!hasUpper) missingCriteria.push('大文字');
    if (!hasLower) missingCriteria.push('小文字');
    if (!hasDigit) missingCriteria.push('数字');
    if (!hasSpecial) missingCriteria.push('特殊文字');
    
    if (missingCriteria.length > 0) {
      return `パスワードに${missingCriteria.join('・')}を含めてください`;
    }
    
    return null;
  };

  // Real-time validation with single useEffect
  useEffect(() => {
    const newErrors: Errors = {};
    
    // Full Name validation
    if (touched.fullName) {
      if (!validateFullName(fullName)) {
        newErrors.fullName = 'フルネームは2文字以上で入力してください';
      }
    }
    
    // Email validation
    if (touched.email) {
      if (!email.trim()) {
        newErrors.email = 'メールアドレスを入力してください';
      } else if (!validateEmail(email)) {
        newErrors.email = '有効なメールアドレスを入力してください';
      }
    }
    
    // Password validation
    if (touched.password) {
      const passwordError = getPasswordErrorMessage(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }
    
    // Confirm Password validation
    if (touched.confirmPassword) {
      if (!validateConfirmPassword(password, confirmPassword)) {
        newErrors.confirmPassword = 'パスワードが一致しません';
      }
    }
    
    // Terms validation
    if (touched.terms) {
      if (!termsAccepted) {
        newErrors.terms = '利用規約とプライバシーポリシーに同意してください';
      }
    }
    
    setErrors(newErrors);
  }, [fullName, email, password, confirmPassword, termsAccepted, touched]);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    if (!touched.fullName) {
      setTouched(prev => ({ ...prev, fullName: true }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!touched.email) {
      setTouched(prev => ({ ...prev, email: true }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!touched.password) {
      setTouched(prev => ({ ...prev, password: true }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (!touched.confirmPassword) {
      setTouched(prev => ({ ...prev, confirmPassword: true }));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true, terms: true });
    if (Object.keys(errors).length) return;

    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 2000)); // mock API
      alert(`登録成功!\nようこそ, ${fullName} さん`);
      // reset state
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTermsAccepted(false);
      setTouched({ fullName: false, email: false, password: false, confirmPassword: false, terms: false });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert('登録に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signUpBox}>
        <Link to="/login" style={{ alignSelf: 'flex-start', marginBottom: 16, color: '#7165E3', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>
          ← 戻る
        </Link>
        <h1 className={styles.title}>アカウント作成</h1>
        <p className={styles.subtitle}>
          新しいアカウントを作成してください
        </p>

        <form className={styles.form} onSubmit={handleSignUp}>
          {/* --- Full Name Input --- */}
          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.label}>
              フルネーム
            </label>
            <div className={styles.inputWrapper}>
              <UserIcon className={styles.inputIcon} />
              <input
                id="fullName"
                type="text"
                placeholder="フルネームを入力"
                className={`${styles.inputField} ${errors.fullName ? styles.inputError : ''} ${fullName && !errors.fullName ? styles.inputValid : ''}`}
                value={fullName}
                onChange={handleFullNameChange}
                onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>
            {errors.fullName && (
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center' }} role="alert">{errors.fullName}</span>
            )}
          </div>

          {/* --- Email Input --- */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <div className={styles.inputWrapper}>
              <MailIcon className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                placeholder="メールアドレスを入力"
                className={`${styles.inputField} ${errors.email ? styles.inputError : ''} ${email && !errors.email ? styles.inputValid : ''}`}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                required
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center' }} role="alert">{errors.email}</span>
            )}
          </div>

          {/* --- Password Input --- */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>
            <div className={styles.inputWrapper}>
              <LockIcon className={styles.inputIcon} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="パスワードを入力"
                className={`${styles.inputField} ${errors.password ? styles.inputError : ''} ${password && !errors.password ? styles.inputValid : ''}`}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "非表示" : "表示"}
                disabled={isLoading}
              >
                <EyeIcon className={styles.passwordToggleIcon} />
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center' }} role="alert">{errors.password}</span>
            )}
            {/* Password strength indicator */}
            {password && touched.password && !errors.password && (
              <div className={styles.passwordStrength}>
                強度: <span className={`${styles.strengthIndicator} ${styles[`strength${validatePassword(password).strength}`]}`}>
                  {validatePassword(password).strength}
                </span>
              </div>
            )}
          </div>

          {/* --- Confirm Password Input --- */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              パスワード確認
            </label>
            <div className={styles.inputWrapper}>
              <LockIcon className={styles.inputIcon} />
              <input
                id="confirmPassword"
                type="password"
                placeholder="パスワードを再入力"
                className={`${styles.inputField} ${errors.confirmPassword ? styles.inputError : ''} ${confirmPassword && !errors.confirmPassword ? styles.inputValid : ''}`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                required
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center' }} role="alert">{errors.confirmPassword}</span>
            )}
          </div>

          {/* --- Terms Checkbox --- */}
          <div className={styles.inputGroup}>
            <label htmlFor="termsCheckbox" className={styles.checkboxLabel}>
              <input
                id="termsCheckbox"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (!touched.terms) {
                    setTouched(prev => ({ ...prev, terms: true }));
                  }
                }}
                required
                disabled={isLoading}
              />
              <a href="#" style={{ color: '#7165E3', textDecoration: 'none' }}>利用規約</a> と <a href="#" style={{ color: '#7165E3', textDecoration: 'none' }}>プライバシーポリシー</a> に同意します
            </label>
            {errors.terms && (
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center' }} role="alert">{errors.terms}</span>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.signUpButton} ${isLoading ? styles.signUpButtonLoading : ''}`}
            style={{ marginTop: 16, width: '100%' }}
            disabled={isLoading || Object.keys(errors).length > 0 || !fullName || !email || !password || !confirmPassword || !termsAccepted}
          >
            {isLoading ? (
              <>
                <span className={styles.loadingSpinner}></span>
                登録中...
              </>
            ) : (
              '登録'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;

