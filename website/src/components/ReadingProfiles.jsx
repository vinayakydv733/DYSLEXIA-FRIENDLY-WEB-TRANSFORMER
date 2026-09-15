import React from 'react';

const ReadingProfiles = () => {
  const profiles = [
    { name: "Focus Reading", status: "Available", desc: "Bionic reading and high contrast to maintain attention." },
    { name: "Easier Reading", status: "Available", desc: "Simplified AI text and dyslexia-friendly typography." },
    { name: "Listen & Learn", status: "Available", desc: "Text-to-speech synchronized with text highlighting." },
    { name: "Hindi / Indic", status: "Available", desc: "Specialized typography and translation for Indic languages." },
    { name: "Custom", status: "Available", desc: "Create your own reading profile with full control." }
  ];

  return (
    <section className="section container">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ marginBottom: '16px' }}>Reading Profiles</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>Switch between different reading modes instantly based on your current task.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {profiles.map((profile, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{profile.name}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', flex: 1, marginBottom: '24px' }}>{profile.desc}</p>
            <div style={{ 
              display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 12px', 
              background: profile.status === 'Available' ? 'var(--accent-light)' : 'var(--bg-secondary)', 
              color: profile.status === 'Available' ? 'var(--accent-primary)' : 'var(--text-secondary)', 
              borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 
            }}>
              {profile.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReadingProfiles;
