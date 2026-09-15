import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="section" style={{ paddingTop: '120px', paddingBottom: '80px', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '800px', margin: '0 auto 24px' }}
        >
          Make the Web <span className="text-gradient">Easier to Read.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.25rem' }}
        >
          A browser accessibility layer that helps people see, read, understand and listen to online content.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={config.CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Install Free
          </a>
          <a href="#how-it-works" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            See How It Works <ArrowRight size={20} />
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: '32px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.95rem' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> No API key required</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Core accessibility is free</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Works with existing websites</span>
        </motion.div>

        {/* Product Visual Demo: Before / After */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ width: '100%', maxWidth: '1000px', marginTop: '64px', position: 'relative' }}
        >
          <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }}>
            
            {/* Before */}
            <div style={{ background: 'var(--card-bg)', padding: '32px', textAlign: 'left', opacity: 0.6 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Before</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.2 }}>Understanding Quantum Computing Algorithms</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>Quantum algorithms operate by manipulating quantum states using a series of quantum logic gates. Unlike classical algorithms which process bits serially, quantum algorithms can evaluate many possibilities simultaneously due to superposition and entanglement, offering exponential speedups for specific computational problems like integer factorization.</p>
            </div>

            {/* After */}
            <div style={{ background: 'var(--bg-primary)', padding: '32px', textAlign: 'left', borderLeft: '4px solid var(--accent-primary)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <span>After (Focus Mode + AI Simplified)</span>
                <span>🔊</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', lineHeight: 1.4 }}><b>Under</b>standing <b>Quan</b>tum <b>Compu</b>ters</h3>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8, letterSpacing: '0.5px' }}><b>Quan</b>tum <b>compu</b>ters <b>work</b> <b>differ</b>ently <b>than</b> <b>nor</b>mal <b>compu</b>ters. <b>In</b>stead <b>of</b> <b>look</b>ing <b>at</b> <b>one</b> <b>thing</b> <b>at</b> <b>a</b> <b>time</b>, <b>they</b> <b>can</b> <b>look</b> <b>at</b> <b>many</b> <b>things</b> <b>at</b> <b>once</b>. <b>This</b> <b>makes</b> <b>them</b> <b>very</b> <b>fast</b> <b>for</b> <b>solv</b>ing <b>cer</b>tain <b>types</b> <b>of</b> <b>prob</b>lems.</p>
            </div>

          </div>
          
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--accent-primary)', color: 'white', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.85rem', boxShadow: 'var(--shadow-md)' }}>
            TRANSFORMED
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
