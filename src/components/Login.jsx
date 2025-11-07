import { useState } from 'react';
import axios from 'axios';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false); // ← Loading state
  const navigate = useNavigate();

  const isValidEmail = (e) => /^\S+@\S+\.\S+$/.test(e);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true); // ← Start loading

    // ---- Front-end validation ----
    if (!email) {
      setMsg('Email is required');
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setMsg('Enter a valid email address');
      setLoading(false);
      return;
    }
    if (!password) {
      setMsg('Password is required');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        'https://overseas-server.onrender.com/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (err) {
      const errorMsg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        'Login failed – check your credentials';
      setMsg(errorMsg);
    } finally {
      setLoading(false); // ← Always stop loading
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
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* ---------- ERROR MESSAGE ---------- */}
          {msg && <p className="text-red-600 text-sm text-center">{msg}</p>}

          {/* ---------- SUBMIT BUTTON ---------- */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition flex items-center justify-center gap-2
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}