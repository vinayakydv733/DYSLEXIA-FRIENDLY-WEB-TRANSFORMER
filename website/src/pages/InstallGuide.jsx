import React, { useEffect } from 'react';
import { Download, Settings, Puzzle } from 'lucide-react';

const InstallGuide = () => {
  useEffect(() => {
    // Automatically trigger the download of the zip file when they visit this page
    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/dyslexia-web-transformer.zip';
      link.download = 'dyslexia-web-transformer.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="section container" style={{ maxWidth: '800px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>Your download is starting...</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '48px' }}>
        Follow these 3 simple steps to add the extension to Chrome.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
        
        <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Download size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Step 1: Extract the ZIP file</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Locate the downloaded <b>dyslexia-web-transformer.zip</b> file on your computer, right-click it, and select "Extract All..." to unzip the folder.</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Settings size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Step 2: Open Chrome Extensions</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>Open a new tab in Chrome and go to this address:</p>
            <code style={{ fontSize: '1.1rem', padding: '8px 16px', display: 'inline-block', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>chrome://extensions/</code>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Then, turn on <b>"Developer mode"</b> using the toggle switch in the top right corner.</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Puzzle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Step 3: Load the Extension</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Click the <b>"Load unpacked"</b> button in the top left corner, and select the extracted folder from Step 1. You're done!</p>
          </div>
        </div>

      </div>
      
      <div style={{ marginTop: '48px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>If the download didn't start automatically, <a href="/dyslexia-web-transformer.zip" download style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>click here to download it again</a>.</p>
      </div>
    </div>
  );
};

export default InstallGuide;
