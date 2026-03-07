import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const { login, user, isAuthenticated, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (error) {
      clearError();
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                <input
                    type="email"
                  name="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                  name="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    value={form.password}
                    onChange={handleChange}
                />

                
                <button
                    type="submit"
                  disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>

                <Link
                  to="/company-page/register"
                  className="block w-full mt-3 py-2 text-center border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
                >
                  Register
                </Link>
            </form>
              {error && <div className="ml-4 text-red-600">{error}</div>}
              {isAuthenticated && user && (
            <div className="ml-4 text-green-600">
              <p>Login berhasil! Redirecting...</p>
            </div>
            )}
            

        </div>
    </>
  );
};

export default LoginPage;

{/* <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br />
          <button type="submit">Login</button>
        </form>
        
      </div> */}