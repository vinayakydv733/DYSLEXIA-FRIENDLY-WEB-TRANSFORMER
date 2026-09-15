import React from 'react';

const HowItWorks = () => {
  const steps = [
    { num: "1", title: "Install the Chrome Extension." },
    { num: "2", title: "Open a webpage." },
    { num: "3", title: "Choose your reading preferences." },
    { num: "4", title: "Customize how you read." },
    { num: "5", title: "Use AI assistance when content is difficult." }
  ];

  return (
    <section id="how-it-works" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ marginBottom: '16px' }}>How It Works</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>A seamless integration with your daily browsing.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {steps.map((step, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px 32px' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '50%', 
              background: 'var(--accent-primary)', color: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '1.25rem', fontWeight: 700, flexShrink: 0
            }}>
              {step.num}
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{step.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
