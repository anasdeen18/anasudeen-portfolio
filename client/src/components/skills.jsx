import { useState, useEffect, useRef } from 'react';
import './Skills.css';

const skillsData = [
  { category: "Languages", items: ["JavaScript", "Python", "Java", "C", "C++"] },
  { category: "Frontend", items: ["React.js", "HTML", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "PHP"] },
  { category: "Database & Tools", items: ["MongoDB", "MySQL", "SQL", "DBMS", "Git/GitHub", "REST APIs", "Vercel"] }
];

function SkillBlock({ block }) {
  const [visible, setVisible] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`skill-block ${visible ? 'visible' : ''}`} ref={blockRef}>
      <h3 className="skill-category">{block.category}</h3>
      <div className="skill-pills">
        {block.items.map((skill, i) => (
          <span className="skill-pill" key={i}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-eyebrow">SKILLS & TOOLS</div>
      <h2 className="skills-title">What I Work With</h2>
      <div className="skills-grid">
        {skillsData.map((block, index) => (
          <SkillBlock key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

export default Skills;