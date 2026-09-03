import './Contact.css';

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-eyebrow">GET IN TOUCH</div>
      <h2 className="contact-title">Lets build something.</h2>
      <p className="contact-desc">
        Open to full-stack roles and internship opportunities. Reach out any time.
      </p>
      <div className="contact-links">
        <a href="mailto:syedabuthahir131@gmail.com" className="contact-btn-primary">
          Email me
        </a>
        <a href="https://linkedin.com/in/anasudeen-s18" target="_blank" rel="noreferrer" className="contact-btn-ghost">
          LinkedIn
        </a>
        <a href="https://github.com/anasdeen18" target="_blank" rel="noreferrer" className="contact-btn-ghost">
          GitHub
        </a>
      </div>
    </section>
  );
}

export default Contact;