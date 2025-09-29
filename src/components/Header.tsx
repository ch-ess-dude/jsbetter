import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../lib/AuthProvider';

export default function Header() {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'See Products', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="border-b bg-[var(--background)] shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold transition-colors"
            style={{ color: 'var(--primary)' }}
          >
            JsBetter
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? 'font-medium'
                    : ''
                }`}
                style={{ color: location.pathname === item.path ? 'var(--primary)' : 'var(--muted-foreground)' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-[var(--border)] text-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={async () => await signOut()}
                  variant="outline"
                  className="border-[var(--border)] text-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-[var(--border)] text-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]">
                    Login
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-[var(--accent)] hover:bg-[color-mix(in srgb, var(--accent) 80%, black)]" style={{ color: 'var(--accent-foreground)' }}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}