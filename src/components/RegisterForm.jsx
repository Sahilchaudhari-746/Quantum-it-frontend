import React, { useState } from 'react';
import { register as registerApi, saveAuth } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { User, Calendar, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast'; // 👈 Import toast

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', dob: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerApi(form);

      if (data.token) {
        saveAuth(data.token, data.user);
        toast.success('Registration successful 🎉');
        setTimeout(() => nav('/dashboard'), 1200);
      } else {
        toast.error(data.message || 'Registration failed');
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
        <div className="card-top">REGISTER</div>
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="avatar-circle">👤</div>

          <div className="input-group">
            <User className="input-icon" color="white" size={20} />
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <Calendar className="input-icon" color="white" size={20} />
            <input
              type="date"
              placeholder="Date of birth"
              value={form.dob}
              onChange={e => setForm({ ...form, dob: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon" color="white" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" color="white" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
            <div
              className="show-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="white" />
              ) : (
                <Eye size={20} color="white" />
              )}
            </div>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Create account'}
          </button>

          <div style={{ marginTop: 10 }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
