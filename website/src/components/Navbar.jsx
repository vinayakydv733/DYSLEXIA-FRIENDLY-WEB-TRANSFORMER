import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { config } from '../config';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Features', path: '/#features' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'AI Assistant', path: '/#ai-assistant' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'For Schools', path: '/#for-schools' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'glass shadow-sm' : ''}`} style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      transition: 'all 0.3s ease',
      padding: isScrolled ? '12px 0' : '20px 0',
      background: isScrolled ? 'var(--card-bg)' : 'transparent',
      borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '1.25rem' }}>
          <div style={{ background: 'var(--accent-primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>W</div>
          Web Transformer
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
              {link.name}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="desktop-nav">
          <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>Login</Link>
          <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Install Free
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'none', color: 'var(--text-primary)' }}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid var(--border)' }}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.1rem' }}>
              {link.name}
            </Link>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />
          <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.1rem' }}>Login</Link>
          <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
            Install Free
          </a>
        </div>
      )}
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .nav-link:hover { color: var(--accent-primary) !important; }
      `}</style>
    </header>
  );
};

export default Navbar;
