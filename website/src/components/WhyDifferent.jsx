import React from 'react';

const WhyDifferent = () => {
  const points = [
    { title: "Browser-level accessibility", desc: "Works around the existing web experience. No need to copy and paste text." },
    { title: "Contextual AI assistance", desc: "Select difficult content to simplify or explain directly on the page." },
    { title: "Hindi / Indic support", desc: "Accessibility built beyond English-focused experiences." },
    { title: "Local-first accessibility", desc: "Core reading transformations can work directly in the browser safely." }
  ];

  return (
    <section className="section section-light">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '64px', maxWidth: '800px', margin: '0 auto 64px' }}>
          More than formatting.<br/>A complete reading layer.
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {points.map((point, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{point.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
