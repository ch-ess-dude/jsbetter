import React, { useState, ChangeEvent } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  BookOpen, 
  Video, 
  Image as ImageIcon, 
  Workflow, 
  BarChart3, 
  ExternalLink,
  Clock,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: any;
  status: 'active' | 'coming-soon';
  link?: string;
  category: string;
}

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false);

  const products: Product[] = [
    {
      id: 'study',
      name: 'JsBetter Study',
      tagline: 'Your complete learning companion',
      description: 'Accelerate your learning with AI-powered focus tools, intelligent flashcards, course summaries, and a personal AI tutor that adapts to your learning style.',
      features: [
        'AI-powered focus timer with smart break suggestions',
        'Intelligent flashcard generation from any content',
        'Course summaries and key concept extraction',
        'Personal AI tutor for Q&A and explanations',
        'Progress tracking and learning analytics',
        'Multi-subject organization and note-taking'
      ],
      icon: <BookOpen className="w-8 h-8" />,
      status: 'active',
      link: 'https://jsbetterstudy-3qmd.vercel.app',
      category: 'Learning'
    },
    {
      id: 'create-video',
      name: 'JsBetter Create - Video',
      tagline: 'AI-powered video generation',
      description: 'Create professional videos from text prompts, scripts, or ideas. Generate educational content, marketing videos, and creative projects with advanced AI.',
      features: [
        'Text-to-video generation',
        'Script-based video creation',
        'Multiple video styles and formats',
        'Voiceover and music integration',
        'Custom branding and themes',
        'Export in various resolutions'
      ],
      icon: <Video className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Creation'
    },
    {
      id: 'create-image',
      name: 'JsBetter Create - Image',
      tagline: 'AI-powered image generation',
      description: 'Generate stunning images, illustrations, and graphics from text descriptions. Perfect for presentations, social media, and creative projects.',
      features: [
        'Text-to-image generation',
        'Multiple art styles and formats',
        'High-resolution output',
        'Batch generation capabilities',
        'Style transfer and editing',
        'Commercial usage rights'
      ],
      icon: <ImageIcon className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Creation'
    },
    {
      id: 'flow',
      name: 'JsBetter Flow',
      tagline: 'Custom AI agent workflows',
      description: 'Design and deploy custom AI workflows for work and study. Automate repetitive tasks, create intelligent processes, and boost productivity.',
      features: [
        'Drag-and-drop workflow builder',
        'Pre-built templates for common tasks',
        'Integration with popular tools and APIs',
        'Custom AI agent creation',
        'Workflow scheduling and triggers',
        'Performance monitoring and optimization'
      ],
      icon: <Workflow className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Productivity'
    },
    {
      id: 'insight',
      name: 'JsBetter Insight',
      tagline: 'Track, analyze, and optimize',
      description: 'Comprehensive analytics for productivity and learning. Track your progress, identify patterns, and receive AI-powered recommendations for improvement.',
      features: [
        'Learning progress tracking across all apps',
        'Productivity analytics and time management',
        'AI-powered insights and recommendations',
        'Goal setting and achievement tracking',
        'Detailed reports and visualizations',
        'Integration with calendar and task apps'
      ],
      icon: <BarChart3 className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Analytics'
    }
  ];

  const handleWaitlistSubmit = (e: any) => {
    e.preventDefault?.();
    if (waitlistEmail.trim()) {
      setShowWaitlistSuccess(true);
      setWaitlistEmail('');
      setTimeout(() => {
        setShowWaitlistSuccess(false);
        setSelectedProduct(null);
      }, 2000);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Live</Badge>;
    }
    return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Coming Soon</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Learning': return <Brain className="w-4 h-4" />;
      case 'Creation': return <Sparkles className="w-4 h-4" />;
      case 'Productivity': return <Zap className="w-4 h-4" />;
      case 'Analytics': return <BarChart3 className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--card-foreground)] mb-4">
            Our Product Ecosystem
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            Discover our suite of AI-powered tools designed to enhance learning, creativity, and productivity. 
            Start with JsBetter Study today, and stay tuned for exciting new products launching soon.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              onClick={() => setSelectedProduct(product)}
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg text-[var(--primary)] transition-colors" style={{ backgroundColor: 'rgba(248,248,248,0.03)' }}>
                      {product.icon}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {getCategoryIcon(product.category)}
                      <span>{product.category}</span>
                    </div>
                  </div>
                  {getStatusBadge(product.status)}
                </div>
                
                <div>
                  <CardTitle className="text-xl transition-colors" style={{ color: 'var(--muted-foreground)' }}>
                    {product.name}
                  </CardTitle>
                  <CardDescription className="font-medium mt-1" style={{ color: 'var(--primary)' }}>
                    {product.tagline}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-[var(--muted)] mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    {product.features.length} features
                  </span>
                  {product.status === 'coming-soon' && (
                    <div className="flex items-center text-sm text-[var(--muted)]">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Soon</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader className="space-y-4">
                    <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg text-[var(--primary)]" style={{ backgroundColor: 'rgba(248,248,248,0.03)' }}>
                      {selectedProduct.icon}
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-2xl" style={{ color: 'var(--card-foreground)' }}>
                        {selectedProduct.name}
                      </DialogTitle>
                      <p className="font-medium" style={{ color: 'var(--primary)' }}>
                        {selectedProduct.tagline}
                      </p>
                    </div>
                    {getStatusBadge(selectedProduct.status)}
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  <p className="text-[var(--muted)] leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--card-foreground)' }} >Key Features:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}></div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {selectedProduct.status === 'active' ? (
                      <Button 
                        className="text-[var(--accent-foreground)] flex-1"
                        style={{ backgroundColor: 'var(--accent)' }}
                        onClick={() => window.open(selectedProduct.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open App
                      </Button>
                    ) : (
                      <>
                        {!showWaitlistSuccess ? (
                          <form onSubmit={handleWaitlistSubmit} className="flex-1 space-y-3">
                            <div>
                              <Label htmlFor="email" className="text-sm font-medium">
                                Join the waitlist to be notified when {selectedProduct.name} launches:
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={waitlistEmail}
                                onChange={(e: any) => setWaitlistEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="mt-1"
                              />
                            </div>
                            <Button 
                              type="submit"
                              className="w-full"
                              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                            >
                              Join Waitlist
                            </Button>
                          </form>
                        ) : (
                          <div className="flex-1 text-center py-4">
                            <div className="text-green-600 font-medium">
                              ✅ You've been added to the waitlist!
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              We'll notify you when {selectedProduct.name} launches.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}