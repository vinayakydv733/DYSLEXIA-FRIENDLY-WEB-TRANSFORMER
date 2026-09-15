import React from 'react';
import { config } from '../config';

const Pricing = () => {
  return (
    <div className="section container" style={{ textAlign: 'center' }}>
      <h1>Pricing</h1>
      <p style={{ marginBottom: '48px' }}>Core accessibility is free. Advanced AI assistance is Premium.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
        {Object.entries(config.pricing).map(([key, plan]) => (
          <div key={key} className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', border: key === 'premium' ? '2px solid var(--accent-primary)' : '' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{plan.name}</h2>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '24px' }}>{plan.price}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--accent-primary)' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
            <button className={key === 'premium' ? 'btn btn-primary' : 'btn btn-outline'} style={{ width: '100%' }}>
              {key === 'premium' ? 'Get Premium' : 'Get Started Free'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
