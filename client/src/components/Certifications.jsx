import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Certifications.css';

const certificationsData = [
  {
    name: "Full Stack Development (MERN) Internship",
    issuer: "ICT Academy of Kerala",
    image: "/cert-mern.jpg"
  },
  {
    name: "Introduction to NLP and Generative AI",
    issuer: "Hajee Karutha Rowther Howdia College",
    image: "/cert-nlp.jpeg"
  },
  {
    name: "Fundamentals of SQL",
    issuer: "Hajee Karutha Rowther Howdia College",
    image: "/cert-sql.jpeg"
  }
];

function CertItem({ cert, onImageClick }) {
  const [visible, setVisible] = useState(false);
  const itemRef = useRef(null);

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

    const currentRef = itemRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={visible ? 'cert-item visible' : 'cert-item'}
      onClick={() => onImageClick(cert.image, cert.name)}
    >
      <span className="cert-check">✓</span>
      <div className="cert-info">
        <p className="cert-name">{cert.name}</p>
        <p className="cert-issuer">{cert.issuer}</p>
      </div>
      <span className="cert-view-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
    </div>
  );
}

function Certifications() {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle('');
  };

  return (
    <section className="certifications" id="certifications">
      <div className="certifications-eyebrow">CERTIFICATIONS</div>
      <h2 className="certifications-title">Credentials</h2>
      {certificationsData.map((cert, index) => (
        <CertItem key={index} cert={cert} onImageClick={openModal} />
      ))}

      {modalImage && createPortal(
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeModal}>✕</button>
            <img src={modalImage} alt={modalTitle} className="cert-modal-img" />
            <p className="cert-modal-caption">{modalTitle}</p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default Certifications;