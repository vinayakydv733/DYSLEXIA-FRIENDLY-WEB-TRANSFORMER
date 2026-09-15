import React from 'react';

const Privacy = () => {
  return (
    <div className="section container" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '32px' }}>Privacy Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Local Browser Functionality</h2>
          <p>Core accessibility transformations happen within the browser where applicable. Your reading preferences are stored locally to enhance your experience without unnecessary data transmission.</p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>External Services</h2>
          <p>AI, translation, and dictionary functionality may send required text to our external secure backend services for processing. You do NOT need to provide your own API keys. We only process the specific text you select for assistance.</p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Account Information</h2>
          <p>If you create an account, we securely store your basic profile information and subscription status to synchronize your preferences and usage limits.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
