// src/components/screens/LoginScreen/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import styles from './LoginScreen.module.css';

// Import icons (giả định cậu có các file SVG)
import { ReactComponent as LogoIcon } from '../../../assets/icons/logo.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';
import { ReactComponent as LockIcon } from '../../../assets/icons/lock.svg';
import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../../assets/icons/eye-off.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/google.svg';
// import { ReactComponent as FacebookIcon } from '../../../assets/icons/facebook.svg';
// import { ReactComponent as AppleIcon } from '../../../assets/icons/apple.svg';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const isFormValid = email !== '' && password !== '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; general?: string } = {};

    // --- Giả lập validation ---
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Định dạng email không hợp lệ.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);

    // --- Giả lập gọi API ---
    setTimeout(() => {
      setIsLoading(false);
      // Giả lập đăng nhập thất bại
      if (email !== "test@example.com" || password !== "password123") {
          setErrors({ general: "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại nhé." });
      } else {
        alert("Đăng nhập thành công!");
        // Chuyển hướng tới trang chính ở đây
      }
    }, 2000);
  };

  // Tự động ẩn snackbar lỗi
  useEffect(() => {
    if (errors.general) {
      const timer = setTimeout(() => {
        setErrors(prev => ({ ...prev, general: undefined }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors.general]);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {/* BƯỚC 2: BIỂN HIỆU */}
        <header className={styles.header}>
          <LogoIcon className={styles.logo} />
          <h1 className={styles.title}>Chào mừng trở lại!</h1>
          <p className={styles.subtitle}>Căn bếp của bạn vẫn còn nhiều điều kỳ diệu đang chờ đó.</p>
        </header>

        {/* BƯỚC 3 & 4: CỔNG VÀO & LỐI THOÁT */}
        <form className={styles.form} onSubmit={handleLogin} noValidate>
          {/* Email Input */}
          <div className={styles.inputWrapper}>
            <label htmlFor="email" className="sr-only">Email</label>
            <EmailIcon className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              placeholder="Email"
              className={`${styles.inputField} ${errors.email ? styles.error : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className={styles.inputWrapper}>
             <label htmlFor="password" className="sr-only">Mật khẩu</label>
            <LockIcon className={styles.inputIcon} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          
          <a href="#" className={styles.forgotPassword}>Quên mật khẩu?</a>
          
          {/* Nút Đăng nhập */}
          <button type="submit" className={styles.loginButton} disabled={!isFormValid || isLoading}>
            {isLoading ? <div className={styles.spinner}></div> : 'Đăng nhập'}
          </button>
        </form>
        
        {/* BƯỚC 5: CỬA PHỤ */}
        <div className={styles.divider}><span>hoặc</span></div>
        <div className={styles.socialLoginContainer}>
            <button className={styles.socialButton} aria-label="Đăng nhập với Google">
                <GoogleIcon className={styles.socialIcon} />
            </button>
            {/* Thêm Facebook, Apple tương tự */}
        </div>

        {/* BƯỚC 6: DẪN LỐI NGƯỜI MỚI */}
        <p className={styles.signupPrompt}>
            Bạn là người mới? <a href="#" className={styles.signupLink}>Tạo tài khoản ngay</a>
        </p>

      </div>
      
      {/* BƯỚC 7: THÔNG BÁO LỖI TINH TẾ */}
      <div className={`${styles.snackbar} ${errors.general ? styles.show : ''}`}>
        {errors.general}
      </div>
    </div>
  );
};

export default LoginScreen;