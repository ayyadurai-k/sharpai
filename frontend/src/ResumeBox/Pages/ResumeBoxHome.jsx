import React, { useState, useEffect } from 'react';
import Header from '@/components/custom/Header';
import MainContent from '../Components/MainContent';
import Footer from '@/components/custom/Footer';
import WhyChooseSection from '../Components/WhyChooseSection';

function ResumeBoxHome() {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'Empower Your Hiring Process';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <MainContent />
      <WhyChooseSection/>
      <Footer />

    </div>
  );
}

export default ResumeBoxHome;
