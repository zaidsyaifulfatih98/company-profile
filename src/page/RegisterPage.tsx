import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Backendless from '../lib/backendless';
import Navbar from '../components/Navbar';

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterFormData>({ email: '', password: '', name: '' });
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await Backendless.UserService.register({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      setSuccess(true);
      setMessage('Registration successful! Redirecting to login…');
      setTimeout(() => navigate('/company-page/login'), 2000);
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-96"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={handleChange}
          />

          {message && (
            <p className={`text-sm mb-4 text-center ${success ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? 'Registering…' : 'Register'}
          </button>

          <Link
            to="/login"
            className="block w-full mt-3 py-2 text-center border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;