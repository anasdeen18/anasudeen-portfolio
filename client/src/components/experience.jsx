import { useState, useEffect, useRef } from 'react';
import './Experience.css';

const experienceData = [
  {
    role: "Full Stack Development (MERN) Intern",
    org: "ICT Academy of Kerala",
    date: "Feb - Mar 2026",
    description: "Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Developed frontend interfaces and backend REST APIs, and worked with database operations and Git/GitHub workflows."
  },
  {
    role: "Smart India Hackathon - Internal Round",
    org: "UC College Aluva",
    date: "Sept 2025",
    description: "Participated with an AI/ML problem statement focused on satellite navigation systems."
  }
];

function ExpRow({ exp }) {
  const [visible, setVisible] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = rowRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={rowRef} className={visible ? 'exp-row visible' : 'exp-row'}>
      <div className="exp-dot"></div>
      <div className="exp-date">{exp.date}</div>
      <h3 className="exp-role">{exp.role}</h3>
      <p className="exp-org">{exp.org}</p>
      <p className="exp-desc">{exp.description}</p>
    </div>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience-eyebrow">EXPERIENCE</div>
      <h2 className="experience-title">Where I've Worked</h2>
      <div className="timeline">
        {experienceData.map((exp, index) => (
          <ExpRow key={index} exp={exp} />
        ))}
      </div>
    </section>
  );
}

export default Experience;