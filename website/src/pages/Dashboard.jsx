import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const aiUsage = user?.aiUsage !== undefined ? user.aiUsage : 18;
  const usagePercentage = Math.min((aiUsage / 50) * 100, 100);
  
  return (
    <div className="section container" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px' }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', fontWeight: '700' }}>
          Welcome back{user?.name ? `, ${user.name}` : ''}.
        </h1>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="card" style={{ background: 'linear-gradient(145deg, var(--card-bg), rgba(255,255,255,0.02))', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '4px', background: 'var(--accent-primary)' }}></span>
            Current Plan
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', background: 'linear-gradient(90deg, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {user?.plan || 'FREE'}
          </div>
          <Link to="/pricing" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '12px', borderRadius: '30px' }}>Upgrade to Premium</Link>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'var(--bg-secondary)', width: '100%' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${usagePercentage}%` }} transition={{ duration: 1, delay: 0.5 }} style={{ height: '100%', background: 'var(--accent-primary)' }}></motion.div>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>AI Request Usage</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{aiUsage}</span>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ 50</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Requests remaining this month</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="card" style={{ background: 'var(--card-bg)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>Active Profile</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '12px' }}>Focus Reading</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>Bionic Text: ON</span>
            <span style={{ background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>Dyslexic Font: ON</span>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: 600 }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '14px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Install Extension
          </a>
          <button className="btn btn-outline" style={{ padding: '14px 24px', borderRadius: '12px' }}>Manage Account</button>
          <Link to="/privacy" className="btn btn-outline" style={{ padding: '14px 24px', borderRadius: '12px' }}>Privacy Settings</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
