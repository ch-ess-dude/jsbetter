import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../lib/AuthProvider';

// Single clean dashboard component
export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Welcome back, {user?.email ?? 'there'}!</h1>
            <p style={{ color: 'var(--muted)' }}>Your account is secured with magic-link authentication.</p>
          </div>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </header>

        <section style={{ padding: '1rem', borderRadius: 8, background: 'var(--card)' }}>
          <p style={{ margin: 0, color: 'var(--muted)' }}>No statistics are shown — there is no connected dataset. Use the products page to explore integrations.</p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products">
              <Button variant="outline">View Products</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}