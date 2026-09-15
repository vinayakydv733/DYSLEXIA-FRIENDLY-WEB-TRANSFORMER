import React from 'react';
import { Book, GraduationCap, Users } from 'lucide-react';

const ForSchools = () => {
  return (
    <section id="for-schools" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Accessibility for every learner.</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem' }}>Designed for students, trusted by educators.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <GraduationCap size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Students</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Read research papers, articles, and assignments with less fatigue and better comprehension.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Book size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Teachers</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Empower students with a tool that runs securely in the browser without complicated setups.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Users size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Institutions</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Institutional licensing, student profiles, and education plans.</p>
          <div style={{ marginTop: 'auto', paddingTop: '16px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Coming Soon</div>
        </div>
      </div>
    </section>
  );
};

export default ForSchools;
