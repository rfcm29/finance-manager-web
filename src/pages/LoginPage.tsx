import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '../store/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);
      setAuth(res.token, { name: res.name, email: res.email });
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-page">
      <h1>Finance Manager</h1>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <input type="password" placeholder="Password" value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        <button type="submit">Sign In</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
