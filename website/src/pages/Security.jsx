import React from 'react';

const Security = () => {
  return (
    <div className="section container" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '32px' }}>Security</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Server-Side API Secrets</h2>
          <p>We do not expose AI provider keys or secrets in the browser. All AI processing is authenticated and routed through our secure backend infrastructure.</p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Data Protection & Minimal Permissions</h2>
          <p>Our browser extension only requests the minimal permissions necessary to function. We employ request validation, rate limiting, and secure payment verification to protect user accounts and service integrity.</p>
        </section>
      </div>
    </div>
  );
};

export default Security;
