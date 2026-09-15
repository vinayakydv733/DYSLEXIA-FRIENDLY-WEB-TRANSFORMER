import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="section container" style={{ maxWidth: '400px', marginTop: '40px' }}>
      <div className="card">
        <h1 style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '24px' }}>Create Account</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Full Name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          <input type="email" placeholder="Email Address" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          <input type="password" placeholder="Password" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
