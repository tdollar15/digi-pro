import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        <div className="mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600 underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
