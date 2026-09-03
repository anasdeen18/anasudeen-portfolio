import { useState, useEffect, useRef } from 'react';
import './Education.css';

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Union Christian College (Autonomous), Aluva - Affiliated to Mahatma Gandhi University, Kottayam",
    date: "2025 - 2027 (Expected)"
  },
  {
    degree: "Bachelor of Science in Computer Science (B.Sc.)",
    institution: "Hajee Karutha Rowther Howdia College (Autonomous), Uthamapalayam - Affiliated to Madurai Kamaraj University, Madurai",
    date: "2022 - 2025"
  }
];

function EduRow({ edu }) {
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
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={rowRef} className={visible ? 'edu-row visible' : 'edu-row'}>
      <div className="edu-date">{edu.date}</div>
      <div>
        <h3 className="edu-degree">{edu.degree}</h3>
        <p className="edu-institution">{edu.institution}</p>
      </div>
    </div>
  );
}

function Education() {
  return (
    <section className="education" id="education">
      <div className="education-eyebrow">EDUCATION</div>
      <h2 className="education-title">Academic Background</h2>
      {educationData.map((edu, index) => (
        <EduRow key={index} edu={edu} />
      ))}
    </section>
  );
}

export default Education;