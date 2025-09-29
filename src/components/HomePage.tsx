import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';

interface HomePageProps {
  isLoggedIn: boolean;
}

export default function HomePage({ isLoggedIn }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
  <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 10%, transparent), var(--background) 30%)' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Welcome to the JsBetter Ecosystem</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--card-foreground)] mb-6 leading-tight">
              Making life <span style={{ color: 'var(--primary)' }}>JsBetter</span>
            </h1>
            
            <p className="text-xl text-[var(--muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
              Through learning, creating, and flowing smarter with AI-powered tools designed for students, creators, and professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg font-medium group"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  See Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {isLoggedIn && (
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-4 text-lg font-medium"
                    style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}
                  >
                    Enter Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl" style={{ backgroundColor: 'rgba(234,234,234,0.05)' }}></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: 'rgba(45,47,54,0.06)' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--card)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--card-foreground)] mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Empowering individuals with intelligent tools that enhance productivity, creativity, and learning outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: 'rgba(234,234,234,0.04)' }}>
                <Target className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--card-foreground)] mb-4">Learn Better</h3>
              <p className="text-[var(--muted)]">
                Accelerate your learning with AI-powered study tools, flashcards, and personalized tutoring.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: 'rgba(234,234,234,0.04)' }}>
                <Sparkles className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--card-foreground)] mb-4">Create Better</h3>
              <p className="text-[var(--muted)]">
                Generate stunning videos, images, and content with our upcoming AI creation suite.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: 'rgba(234,234,234,0.04)' }}>
                <Users className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--card-foreground)] mb-4">Flow Better</h3>
              <p className="text-[var(--muted)]">
                Optimize your workflow with custom AI agents and productivity insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'rgba(45,47,54,0.09)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--card-foreground)] mb-6">
            Ready to make your life JsBetter?
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of our AI-driven ecosystem.
          </p>
          <Link to="/products">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-medium"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              Explore Our Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}