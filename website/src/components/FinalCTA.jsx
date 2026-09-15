import React from 'react';
import { config } from '../config';

const FinalCTA = () => {
  return (
    <section className="section" style={{ background: 'var(--accent-primary)', color: 'white' }}>
      <div className="container" style={{ textAlign: 'center', padding: '40px 0' }}>
        <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Start Reading Without Barriers.
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 48px' }}>
          Install the extension and make the web work better for the way you read.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'white', color: 'var(--accent-primary)', padding: '16px 32px', fontSize: '1.1rem' }}>
            Install Free
          </a>
          <a href="/pricing" className="btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: 'white', padding: '16px 32px', fontSize: '1.1rem' }}>
            Explore Premium
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
