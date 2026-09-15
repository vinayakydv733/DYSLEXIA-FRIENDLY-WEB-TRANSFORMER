import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', padding: '64px 0 32px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
            <div style={{ background: 'var(--accent-primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>W</div>
            Web Transformer
          </div>
          <p style={{ fontSize: '0.95rem' }}>An accessibility layer that helps people see, read, understand and listen to web content.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Product</h4>
          <Link to="/#features" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Features</Link>
          <Link to="/#how-it-works" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>How It Works</Link>
          <Link to="/pricing" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Pricing</Link>
          <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Install</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Resources</h4>
          <Link to="/faq" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>FAQ</Link>
          <Link to="/privacy" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Privacy</Link>
          <Link to="/security" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Security</Link>
          <Link to="/contact" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Help</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Company</h4>
          <Link to="/#about" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>About</Link>
          <Link to="/contact" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Contact</Link>
          <Link to="/#for-schools" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>For Schools</Link>
        </div>

      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} Dyslexia-Friendly Web Transformer. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Social links placeholders */}
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Twitter/X</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
