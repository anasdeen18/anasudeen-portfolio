import { useState, useEffect } from 'react';
import './Hero.css';

const roleText = "Software Engineer · MCA Student · MERN + AI Integrations";

function Hero() {
  // This state holds however much of the text has "typed" so far
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyped(roleText.slice(0, index + 1));
      index++;
      if (index === roleText.length) {
        clearInterval(interval); // stop once fully typed
      }
    }, 35); // typing speed in milliseconds per character

    return () => clearInterval(interval); // cleanup if component unmounts
  }, []);

  return (
    <section className="hero">
      <div className="hero-tag">● Available for full-stack roles</div>
      <h1 className="hero-name">Anasudeen S</h1>
      <p className="hero-role">
        {typed}
        <span className="type-cursor"></span>
      </p>
      <p className="hero-desc">
        I build web applications end-to-end — from database schema to deployed UI —
        with a growing focus on integrating AI into practical, real-world tools.
      </p>
      <div className="hero-btns">
        <a href="#projects" className="btn-primary">View Work →</a>
        <a href="/AnasudeenS_Resume.pdf" download className="btn-ghost">Resume ↓</a>
      </div>
    </section>
  );
}

export default Hero;