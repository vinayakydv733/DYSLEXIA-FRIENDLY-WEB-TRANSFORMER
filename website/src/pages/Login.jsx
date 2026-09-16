import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)' }}>
      {/* Left Form Column */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '420px', background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Enter your details to access your dashboard.</p>
          </div>
          
          {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</motion.div>}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', transition: 'border-color 0.2s' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', transition: 'border-color 0.2s' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }} disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Social Mock Logins */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-outline" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '12px', background: 'var(--bg-primary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </button>
              <button className="btn btn-outline" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '12px', background: 'var(--bg-primary)' }}>
                <svg width="20" height="20" viewBox="0 0 21 21"><path fill="#F35325" d="M0 0h10v10H0z"/><path fill="#81BC06" d="M11 0h10v10H11z"/><path fill="#05A6F0" d="M0 11h10v10H0z"/><path fill="#FFBA08" d="M11 11h10v10H11z"/></svg>
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign up</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Graphic Column */}
      <div style={{ flex: 1, display: 'none', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', '@media (min-width: 900px)': { display: 'flex' } }} className="desktop-only-flex">
        <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', width: '100%', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ maxWidth: '400px', textAlign: 'center' }}
          >
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✨</div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', lineHeight: 1.3 }}>"Web Transformer completely changed how I read online."</h2>
              <p style={{ opacity: 0.8 }}>— Sarah M., Premium User</p>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) { .desktop-only-flex { display: flex !important; } }
      `}</style>
    </div>
  );
};

export default Login;
