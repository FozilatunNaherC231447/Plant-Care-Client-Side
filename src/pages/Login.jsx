import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { login, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success('Google sign-in successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2 text-gray-600">Or sign in with:</p>
        <button
          onClick={handleGoogle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
