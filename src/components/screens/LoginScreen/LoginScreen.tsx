import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginScreen.module.css';

import MailIcon from '../../../assets/icons/mail-icon.svg?react';
import LockIcon from '../../../assets/icons/lock-icon.svg?react';
import EyeIcon from '../../../assets/icons/eye-icon.svg?react';

// TypeScript type for errors
 type Errors = {
   email?: string;
   password?: string;
 };

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<keyof Errors, boolean>>({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Helper validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = (pwd: string): boolean => {
    return pwd.length >= 6;
  };

  // Real-time validation with single useEffect
  useEffect(() => {
    const newErrors: Errors = {};
    if (touched.email) {
      if (!email.trim()) {
        newErrors.email = 'メールアドレスを入力してください';
      } else if (!validateEmail(email)) {
        newErrors.email = '有効なメールアドレスを入力してください';
      }
    }
    if (touched.password) {
      if (!password.trim()) {
        newErrors.password = 'パスワードを入力してください';
      } else if (!validatePassword(password)) {
        newErrors.password = 'パスワードは6文字以上で入力してください';
      }
    }
    setErrors(newErrors);
  }, [email, password, touched]);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmail('');
      setPassword('');
      setTouched({ email: false, password: false });
      setErrors({});
      navigate('/register-safety-status');
    } catch (error) {
      alert('ログインに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>ログイン</h1>
        <p className={styles.subtitle}>
          メールアドレスとパスワードを入力してください
        </p>
        <form className={styles.form} onSubmit={handleLogin}>
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
                required
                disabled={isLoading}
                autoFocus
                style={{ transition: 'border 0.2s, box-shadow 0.2s' }}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center', transition: 'color 0.2s' }} role="alert">{errors.email}</span>
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
                required
                disabled={isLoading}
                style={{ transition: 'border 0.2s, box-shadow 0.2s' }}
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
              <span className={styles.errorMessage} style={{ fontWeight: 600, color: '#EF4444', marginTop: 8, display: 'block', textAlign: 'center', transition: 'color 0.2s' }} role="alert">{errors.password}</span>
            )}
          </div>
          <Link to="/forgot-password" className={styles.forgotPassword}>
            パスワードを忘れた方
          </Link>
          <button
            type="submit"
            className={`${styles.loginButton} ${isLoading ? styles.loginButtonLoading : ''}`}
            style={{ marginTop: 16, width: '100%', transition: 'background 0.2s' }}
            disabled={isLoading || Object.keys(errors).length > 0 || !email || !password}
          >
            {isLoading ? (
              <>
                <span className={styles.loadingSpinner}></span>
                ログイン中...
              </>
            ) : (
              'ログイン'
            )}
          </button>
        </form>
        <div className={styles.signupLink}>
          <Link to="/signup" className={styles.signupLinkText}>
            アカウントをお持ちでない方は登録
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;