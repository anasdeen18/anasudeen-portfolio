import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [techTags, setTechTags] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const fetchProjects = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log('Error fetching projects:', err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setTitle('');
    setTagline('');
    setDescription('');
    setTechTags('');
    setLiveLink('');
    setGithubLink('');
    setFeatured(false);
    setOrder(0);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this project?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setTitle(project.title || '');
    setTagline(project.tagline || '');
    setDescription(project.description || '');
    setTechTags(project.techTags ? project.techTags.join(', ') : '');
    setLiveLink(project.liveLink || '');
    setGithubLink(project.githubLink || '');
    setFeatured(project.featured || false);
    setOrder(project.order || 0);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      title,
      tagline,
      description,
      techTags: techTags.split(',').map((tag) => tag.trim()),
      liveLink,
      githubLink,
      featured,
      order: Number(order)
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(projectData)
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(projectData)
        });
      }

      if (res.ok) {
        resetForm();
        fetchProjects();
      } else {
        alert(editingId ? 'Failed to update project' : 'Failed to add project');
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '32px' }}
      >
        <h3 style={{ marginBottom: '16px' }}>
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
          required
        />
        <input
          type="text"
          placeholder="Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
          required
        />
        <input
          type="text"
          placeholder="Tech tags, comma separated (e.g. React, Node, MongoDB)"
          value={techTags}
          onChange={(e) => setTechTags(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Live link (optional)"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="GitHub link (optional)"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Display order (lower shows first, e.g. 1, 2, 3)"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '12px' }}>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          {' '}Featured project
        </label>

        <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
          {editingId ? 'Update Project' : 'Add Project'}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} style={{ padding: '10px 20px' }}>
            Cancel
          </button>
        )}
      </form>

      {projects.map((project) => (
        <div
          key={project._id}
          style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '12px', borderRadius: '6px' }}
        >
          <h3>{project.title}</h3>
          <p>{project.tagline}</p>
          <button onClick={() => handleEditClick(project)} style={{ marginTop: '8px', marginRight: '8px' }}>
            Edit
          </button>
          <button onClick={() => handleDelete(project._id)} style={{ marginTop: '8px' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;