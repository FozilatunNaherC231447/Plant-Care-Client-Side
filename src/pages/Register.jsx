import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', photoURL: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password) => /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error('Password must include uppercase, lowercase, and be 6+ characters.');
      return;
    }

    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/');
    } catch {
      toast.error('Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="photoURL" placeholder="Photo URL" value={formData.photoURL} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
