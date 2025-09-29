import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/dashboard' },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the login link');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-[var(--card-foreground)] mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-[var(--muted)]">Email</span>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded border border-[var(--border)] bg-[var(--input-background)] p-2 text-[var(--foreground)]"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-[var(--accent)] text-[var(--accent-foreground)]"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>

          {message && <div className="text-sm text-[var(--muted)]">{message}</div>}
          {error && <div className="text-sm text-red-400">{error}</div>}
        </form>
      </div>
    </div>
  );
}
