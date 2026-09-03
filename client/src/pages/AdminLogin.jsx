import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // lets us redirect the user after login

  const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page from refreshing on form submit

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save the token so we can use it later for protected requests
      localStorage.setItem('adminToken', data.token);

      // Redirect to the dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '360px', margin: '100px auto', padding: '24px' }}>
      <h2 style={{ marginBottom: '20px' }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '12px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '12px' }}
          required
        />
        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px' }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;