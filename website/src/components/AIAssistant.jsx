import React from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

const AIAssistant = () => {
  return (
    <section id="ai-assistant" className="section section-light">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
        
        <div>
          <h2 style={{ marginBottom: '24px', fontSize: '2.5rem' }}>Understand difficult content instantly.</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '32px' }}>Typography helps improve visual readability. AI helps reduce linguistic complexity.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-bg)', padding: '16px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'inline-flex', fontWeight: 500 }}>
            <CheckCircle2 color="var(--accent-primary)" /> No API key required.
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: 'var(--card-bg)' }}>
          <div style={{ padding: '16px 32px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontWeight: 600, width: '100%', textAlign: 'center' }}>SELECT TEXT</div>
          <ArrowDown color="var(--text-secondary)" />
          <div style={{ padding: '16px 32px', background: 'var(--accent-light)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-primary)', fontWeight: 600, width: '100%', textAlign: 'center' }}>EXPLAIN</div>
          <ArrowDown color="var(--text-secondary)" />
          <div style={{ padding: '16px 32px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontWeight: 600, width: '100%', textAlign: 'center' }}>SIMPLIFY</div>
          <ArrowDown color="var(--text-secondary)" />
          <div style={{ padding: '16px 32px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontWeight: 600, width: '100%', textAlign: 'center' }}>TRANSLATE</div>
          <ArrowDown color="var(--text-secondary)" />
          <div style={{ padding: '16px 32px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontWeight: 600, width: '100%', textAlign: 'center' }}>READ ALOUD</div>
        </div>

      </div>
    </section>
  );
};

export default AIAssistant;
