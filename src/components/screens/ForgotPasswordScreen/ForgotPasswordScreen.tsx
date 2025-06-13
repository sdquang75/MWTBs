import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../LoginScreen/LoginScreen.module.css';
import MailIcon from '../../../assets/icons/mail-icon.svg?react';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  useEffect(() => {
    if (touched) {
      if (!email.trim()) {
        setError('メールアドレスを入力してください');
      } else if (!validateEmail(email)) {
        setError('有効なメールアドレスを入力してください');
      } else {
        setError('');
      }
    }
  }, [email, touched]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email.trim() || !validateEmail(email)) return;
    setIsLoading(true);
    setError('');
    setSuccess(false);
    try {
      await new Promise(r => setTimeout(r, 2000)); // mock API
      setSuccess(true);
      setEmail('');
      setTouched(false);
    } catch {
      setError('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Link to="/login" style={{ alignSelf: 'flex-start', marginBottom: 16, color: '#7165E3', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>
          ← 戻る
        </Link>
        <h1 className={styles.title}>パスワードを忘れた方</h1>
        <p className={styles.subtitle} style={{ color: '#6B7280', marginBottom: 24 }}>
          登録したメールアドレスを入力してください。<br />
          パスワード再設定用のリンクをお送りします。
        </p>
        <form className={styles.form} style={{ marginTop: 8 }} onSubmit={handleSubmit}>
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
                className={`${styles.inputField} ${error ? styles.inputError : ''} ${email && !error ? styles.inputValid : ''}`}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setTouched(true)}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>
            {error && (
              <span className={styles.errorMessage} role="alert">{error}</span>
            )}
            {success && (
              <span style={{ color: '#10B981', fontWeight: 600, marginTop: 8, display: 'block', textAlign: 'center' }} role="alert">
                パスワード再設定メールを送信しました。
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${styles.loginButton} ${isLoading ? styles.loginButtonLoading : ''}`}
            style={{ marginTop: 16, width: '100%' }}
            disabled={isLoading || !email || !!error}
          >
            {isLoading ? (
              <>
                <span className={styles.loadingSpinner}></span>
                送信中...
              </>
            ) : (
              '送信'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
