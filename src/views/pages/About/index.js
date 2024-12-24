import React, { useLayoutEffect } from 'react';
import AboutText from '../../components/AboutText';
import ContactForm from '../../components/ContactForm';

const About = () => {
  useLayoutEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <AboutText />
      <ContactForm />
    </>
  );
};

export default About;
