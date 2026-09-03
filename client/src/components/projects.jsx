import { useState, useEffect, useRef } from 'react';
import './Projects.css';

function ProjectCard({ project }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

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

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`project-card ${visible ? 'visible' : ''}`} ref={cardRef}>
      <div className="project-top">
        <h3 className="project-title">{project.title}</h3>
        {project.featured && <span className="project-badge">FEATURED</span>}
      </div>
      <p className="project-tagline">// {project.tagline}</p>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.techTags && project.techTags.map((tech, i) => (
          <span className="project-tag" key={i}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching projects:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-eyebrow">PROJECTS</div>
      <h2 className="projects-title">What I've Built</h2>

      {loading && <p className="projects-status">Loading projects...</p>}
      {error && <p className="projects-status">Couldn't load projects right now. Please try again later.</p>}

      {!loading && !error && projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </section>
  );
}

export default Projects;