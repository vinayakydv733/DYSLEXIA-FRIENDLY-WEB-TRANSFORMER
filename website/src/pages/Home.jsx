import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AIAssistant from '../components/AIAssistant';
import ReadingProfiles from '../components/ReadingProfiles';
import WhyDifferent from '../components/WhyDifferent';
import ForSchools from '../components/ForSchools';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <AIAssistant />
      <ReadingProfiles />
      <WhyDifferent />
      <ForSchools />
      <FinalCTA />
    </div>
  );
};

export default Home;
