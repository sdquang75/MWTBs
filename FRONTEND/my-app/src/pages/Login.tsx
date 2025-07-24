// src/pages/Login.tsx
import { useState } from 'react';
import { InputField } from '../components/InputField';
import { Icon } from '../components/Icon';
import styles from './Login.module.css';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('メールアドレスとパスワードを入力してください');
    } else {
      setLoginError('');
      // [Suy luận]: Xử lý logic đăng nhập ở đây
      console.log('Logging in with:', { email, password });
    }
  };

  return (
    <div className={styles.phoneFrame}>
      <div className={styles.screen}>
        <header className={styles.header}>
          <h1 className={styles.title}>自分レシピ</h1>
        </header>

        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>ログイン</h2>
              {/* Thông báo lỗi chỉ hiển thị khi có lỗi */}
              {loginError && (
                <p className={styles.errorMessage}>
                  {loginError}
                </p>
              )}
            </div>

            <form className={styles.form} onSubmit={handleLogin} noValidate>
              <InputField
                id="email"
                label="メールアドレス"
                type="email"
                placeholder="メールアドレスを入力"
                icon={<Icon name="mail" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <InputField
                  id="password"
                  label="パスワード"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="パスワードを入力"
                  icon={<Icon name="lock" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Icon name="eye-off" /> : <Icon name="eye" />}
                    </button>
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" className={styles.forgotPasswordLink}>
                  パスワードを忘れた方
                </a>
              </div>

              <button type="submit" className={styles.loginButton}>
                ログイン
              </button>
            </form>
          </div>
        </main>

        <footer className={styles.footer}>
          <Icon name="cutlery" className={styles.footerIcon} />
        </footer>
      </div>
    </div>
  );
};