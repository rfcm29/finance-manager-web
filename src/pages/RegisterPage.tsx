import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuthStore } from '../store/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form.name, form.email, form.password);
      setAuth(res.token, { name: res.name, email: res.email });
      navigate('/');
    } catch {
      setError('Registration failed. Email may already be in use.');
    }
  };

  return (
    <div className="auth-page">
      <h1>Finance Manager</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Full Name" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <input type="email" placeholder="Email" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <input type="password" placeholder="Password (min 8 chars)" value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={8} />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
  );
}
