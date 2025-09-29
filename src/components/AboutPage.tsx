import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Target, Users, Lightbulb, Rocket, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Purpose-Driven',
      description: 'Every tool we build has a clear purpose: to make your life genuinely better through intelligent assistance.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User-Centric',
      description: 'We listen to our community and build features that solve real problems for students, creators, and professionals.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We push the boundaries of what AI can do while keeping the user experience simple and intuitive.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Quality First',
      description: 'We believe in building fewer, better products rather than rushing to market with incomplete solutions.'
    }
  ];

  const timeline = [
    {
      year: '2025(early)',
      title: 'The Beginning',
      description: 'Founded with a vision to create AI tools that genuinely improve daily workflows for learning and productivity.',
      status: 'completed'
    },
    {
      year: '2025(mid)',
      title: 'JsBetter Study Launch',
      description: 'Our first product goes live, helping thousands of students learn more effectively with AI-powered tools.',
      status: 'current'
    },
    {
      year: '2025(late)',
      title: 'Creation Suite',
      description: 'Launching JsBetter Create with video and image generation capabilities for content creators.',
      status: 'upcoming'
    },
    {
      year: '2026',
      title: 'Full Ecosystem',
      description: 'Complete the ecosystem with Flow (workflows) and Insight (analytics) to create a comprehensive productivity suite.',
      status: 'future'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'current':
        return <Badge className="bg-blue-100 text-blue-800">Current</Badge>;
      case 'upcoming':
        return <Badge className="bg-orange-100 text-orange-800">Upcoming</Badge>;
      case 'future':
        return <Badge variant="secondary">Future</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--card-foreground)] mb-6">
            About JsBetter
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto leading-relaxed">
           At JsBetter, we believe technology should serve you, not overwhelm you.
           In a world where people constantly switch between scattered apps and platforms, 
           we aim to create seamless, connected experiences that save time, reduce friction, 
           and help you focus on what truly matters.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16" style={{ background: 'linear-gradient(90deg, rgba(234,234,234,0.04), rgba(45,47,54,0.05))', borderColor: 'rgba(234,234,234,0.05)' }}>
          <CardContent className="p-8 text-center">
            <Globe className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[var(--card-foreground)] mb-4">Our Mission</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Our vision is to build a unified ecosystem of digital tools
              designed to bring convenience, efficiency, and ease into everyday life.
              In a world where people constantly switch between scattered apps and platforms, 
              we aim to create seamless, connected experiences that save time, reduce friction, 
              and help you focus on what truly matters.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[var(--card-foreground)] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors" style={{ backgroundColor: 'rgba(234,234,234,0.04)' }}>
                    <div className="text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--card-foreground)] mb-3">{value.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[var(--card-foreground)] text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    item.status === 'completed' || item.status === 'current' 
                      ? '' 
                      : 'bg-gray-400'
                  }`}>
                    {item.status === 'completed' ? '✓' : 
                     item.status === 'current' ? <Rocket className="w-6 h-6" /> : 
                     index + 1}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className={`w-0.5 h-16 mt-2 ${
                      item.status === 'completed' ? '' : 'bg-gray-300'
                    }`} style={{ backgroundColor: item.status === 'completed' ? 'var(--accent)' : undefined }}></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-[var(--accent)]">{item.year}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--card-foreground)] mb-2">{item.title}</h3>
                  <p className="text-[var(--muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <Card className="" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Built by Innovators</h2>
            <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
              
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">1000+</div>
                <div className="text-[var(--muted)]">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">243</div>
                <div className="text-[var(--muted)]">Study Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">4(and more soon)</div>
                <div className="text-[var(--muted)]">Products</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}