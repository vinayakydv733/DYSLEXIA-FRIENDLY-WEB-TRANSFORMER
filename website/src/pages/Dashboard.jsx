import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="section container">
      <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>Welcome back{user?.name ? `, ${user.name}` : ''}.</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>Current Plan</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>{user?.plan || 'FREE'}</div>
          <Link to="/pricing" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Upgrade Plan</Link>
        </div>
        
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>AI Usage</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px', color: 'var(--accent-primary)' }}>18 / 50</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Requests this month</div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>Reading Profile</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Focus Reading</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Bionic text enabled</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Install Extension</a>
        <button className="btn btn-outline">Manage Account</button>
        <Link to="/privacy" className="btn btn-outline">Privacy Settings</Link>
      </div>
    </div>
  );
};

export default Dashboard;
