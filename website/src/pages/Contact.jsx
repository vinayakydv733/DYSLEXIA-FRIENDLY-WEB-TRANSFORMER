import React from 'react';

const Contact = () => {
  return (
    <div className="section container" style={{ maxWidth: '600px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Contact & Feedback</h1>
      <p style={{ textAlign: 'center', marginBottom: '48px', color: 'var(--text-secondary)' }}>We'd love to hear your thoughts, feedback, or feature requests.</p>
      
      <div className="card">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 500 }}>Type of message</label>
            <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
              <option>Feedback</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>General Contact</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 500 }}>Email Address</label>
            <input type="email" placeholder="you@example.com" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 500 }}>Message</label>
            <textarea rows="5" placeholder="How can we help?" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
