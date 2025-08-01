// src/pages/Login.tsx
import { useState } from 'react';
import { InputField } from '../components/InputField';
import { Icon } from '../components/Icon';
import styles from './Login.module.css';
import logo from '../assets/image 6.svg'


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Lấy thông tin user bằng token
  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch('http://localhost:8000/api/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        // Có thể lưu user vào state hoặc localStorage nếu muốn
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch {}
  };

  // Đăng xuất: xóa token, chuyển hướng về login
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('メールアドレスとパスワードを入力してください');
      return;
    }
    setLoginError('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        await fetchUserInfo(data.access_token);
        window.location.href = '/';
      } else {
        setLoginError(data.message || data.errors?.email?.[0] || 'ログインに失敗しました');
      }
    } catch (err) {
      setLoginError('サーバーへの接続に失敗しました');
    }
    setIsLoading(false);
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

              <button type="submit" className={styles.loginButton} disabled={isLoading}>
                {isLoading ? 'ログイン中...' : 'ログイン'}
              </button>
            </form>
          </div>
        </main>

        <footer className={styles.footer}>
      
          <img src={logo} className={styles.footerIcon} />
        </footer>
      </div>
    </div>
  );
};