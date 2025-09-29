import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, MessageSquare, Users, Lightbulb, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault?.();
    // In a real app, this would send the form data to a backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const contactOptions = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'General Support',
      description: 'Questions about our products or need help getting started',
      category: 'support'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Feature Requests',
      description: 'Have an idea for a new feature or improvement',
      category: 'feature'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Partnership',
      description: 'Interested in partnering or collaborating with us',
      category: 'partnership'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Press & Media',
      description: 'Media inquiries and press-related questions',
      category: 'media'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" />
            <h2 className="text-2xl font-bold text-[var(--card-foreground)] mb-2">Message Sent!</h2>
            <p className="text-[var(--muted)]">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--card-foreground)] mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-[var(--card-foreground)] mb-6">How can we help?</h2>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md`}
                  onClick={() => handleInputChange('category', option.category)}
                  style={
                    formData.category === option.category
                      ? { borderColor: 'var(--accent)', backgroundColor: 'rgba(234,234,234,0.04)' }
                      : undefined
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className="p-2 rounded-lg"
                        style={
                          formData.category === option.category
                            ? { backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }
                            : { backgroundColor: 'rgba(234,234,234,0.04)', color: 'var(--accent)' }
                        }
                      >
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--card-foreground)] mb-1">{option.title}</h3>
                        <p className="text-sm text-[var(--muted)]">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">hb685612@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">Live chat (coming soon)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[var(--card-foreground)]">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e: any) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e: any) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e: any) => handleInputChange('subject', e.target.value)}
                      placeholder="What's this about?"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value: any) => handleInputChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">General Support</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="media">Press & Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e: any) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 hover:brightness-110"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                    disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
              <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[var(--card-foreground)] mb-2">When will new products launch?</h4>
                <p className="text-sm text-[var(--muted)]">JsBetter Create is expected in late 2025, with Flow and Insight following in 2026.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--card-foreground)] mb-2">Is JsBetter Study free?</h4>
                <p className="text-sm text-[var(--muted)]">We offer both free and premium tiers. Visit the Study app for current pricing details.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--card-foreground)] mb-2">Can I suggest new features?</h4>
                <p className="text-sm text-[var(--muted)]">Absolutely! Use the "Feature Request" category above to share your ideas with our team.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--card-foreground)] mb-2">Do you offer educational discounts?</h4>
                <p className="text-sm text-[var(--muted)]">Yes, we provide special pricing for students and educational institutions. Contact us for details.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}