import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Signup successful! Please check your email to confirm.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        {success && <div className="mb-2 text-green-600">{success}</div>}
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
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Sign Up</button>
        <div className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
