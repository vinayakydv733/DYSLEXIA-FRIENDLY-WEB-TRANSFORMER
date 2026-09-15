import React from 'react';

const FAQ = () => {
  const faqs = [
    { q: "Do I need an API key?", a: "No. AI functionality is handled through the product's secure backend." },
    { q: "Is the extension free?", a: "Core accessibility features are free. Advanced AI features may be part of Premium." },
    { q: "Does it diagnose dyslexia?", a: "No. It is an assistive reading tool, not a diagnostic product." },
    { q: "Does it work on every website?", a: "It is designed for modern webpages, although highly customized websites may behave differently." },
    { q: "Can I use it for Hindi?", a: "Yes, where the extension's supported Hindi/Indic functionality applies." },
    { q: "How does AI work?", a: "The extension sends the required text to the secure backend, which handles the AI request." }
  ];

  return (
    <div className="section container" style={{ maxWidth: '800px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '48px' }}>Frequently Asked Questions</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{faq.q}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
