import React from 'react';
import { Eye, BookOpen, Brain, Volume2 } from 'lucide-react';

const Features = () => {
  const pillars = [
    {
      icon: <Eye size={32} color="var(--accent-primary)" />,
      title: "SEE",
      description: "Visual accessibility adjustments.",
      features: ["Color accessibility", "Contrast controls", "Theme controls"]
    },
    {
      icon: <BookOpen size={32} color="var(--accent-primary)" />,
      title: "READ",
      description: "Better reading and typography.",
      features: ["Bionic Reading", "Dyslexia-friendly typography", "Font & spacing controls", "Reading ruler"]
    },
    {
      icon: <Brain size={32} color="var(--accent-primary)" />,
      title: "UNDERSTAND",
      description: "AI-powered assistance.",
      features: ["AI simplification", "AI summarization", "Translation", "Dictionary integration"]
    },
    {
      icon: <Volume2 size={32} color="var(--accent-primary)" />,
      title: "LISTEN",
      description: "Audio assistance.",
      features: ["Text-to-Speech", "Selected text reading", "Reading speed controls"]
    }
  ];

  return (
    <section id="features" className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ marginBottom: '16px' }}>One unified experience.</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>Everything you need to make the web accessible, built directly into your browser.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {pillars.map((pillar, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ background: 'var(--accent-light)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', letterSpacing: '1px' }}>{pillar.title}</h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '24px', flex: 1 }}>{pillar.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pillar.features.map((feature, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--border)' }}></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
