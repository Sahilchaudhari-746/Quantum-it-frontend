import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { login as loginApi, saveAuth } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // 👈 Import toast

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginApi(form);

      if (data.token) {
        saveAuth(data.token, data.user);
        toast.success('Login successful 🎉');
        setTimeout(() => nav('/dashboard'), 1200);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="card">
        <div className="card-top">SIGN IN</div>
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="avatar-circle">
            <i className="user-icon">👤</i>
          </div>

          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} color="white" />
              ) : (
                <Eye size={18} color="white" />
              )}
            </div>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing...' : 'LOGIN'}
          </button>

          <div style={{ marginTop: 10, textAlign: 'center' }}>
            No account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
