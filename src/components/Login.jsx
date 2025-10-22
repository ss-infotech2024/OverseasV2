import { useState } from 'react';
import axios from 'axios';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  // Simple email regex
  const isValidEmail = (e) => /^\S+@\S+\.\S+$/.test(e);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');

    // ---- Front-end validation ----
    if (!email) return setMsg('Email is required');
    if (!isValidEmail(email)) return setMsg('Enter a valid email address');
    if (!password) return setMsg('Password is required');

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (err) {
      const errorMsg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        'Login failed – check your credentials';
      setMsg(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={submit} className="space-y-4">
          {/* ---------- EMAIL ---------- */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ---------- PASSWORD ---------- */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ---------- ERROR MESSAGE ---------- */}
          {msg && <p className="text-red-600 text-sm text-center">{msg}</p>}

          {/* ---------- SUBMIT BUTTON ---------- */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}