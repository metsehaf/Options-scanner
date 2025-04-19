'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { FaGoogle, FaFacebookF, FaMicrosoft, FaLinkedinIn } from 'react-icons/fa';
import './register.scss';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const socialProviders = [
    { name: 'LinkedIn', icon: <FaLinkedinIn />, color: '#0A66C2' },
    { name: 'Google', icon: <FaGoogle />, color: '#DB4437' },
    { name: 'Facebook', icon: <FaFacebookF />, color: '#1877F2' },
    { name: 'Microsoft', icon: <FaMicrosoft />, color: '#F35325' },
  ];

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <main className="register-page">
      <div className="register-card">
        <h2 className="title">Join Bullx for free</h2>
        <p className="subtitle">
          Unlock trading tools and paper trading for free. Already have an account?{' '}
          <a href="/login" className="link">Login here</a>.
        </p>

        <div className="social-buttons">
          {socialProviders.map(({ name, icon, color }) => (
            <button
              key={name}
              className="social-button"
              style={{ borderColor: color, color }}
            >
              <span className="icon">{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>


        <div className="divider">
          <div className="line" />
          <span className="or">OR</span>
          <div className="line" />
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="name-fields">
            <div className="form-group">
              <label>
                First Name <span className="required">*</span>
              </label>
              <input type="text" name="firstName" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                Last Name <span className="required">*</span>
              </label>
              <input type="text" name="lastName" required onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="password-label">
              <span>
                Enter password <span className="required">*</span>
              </span>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <p className="terms">
          By continuing, you agree to Bullx's{' '}
          <a href="/terms" className="link">Terms of Service</a> and{' '}
          <a href="/privacy" className="link">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}