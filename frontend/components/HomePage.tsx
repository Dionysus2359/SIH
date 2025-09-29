import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Globe, Menu, X, Clock, Users, Languages, Shield, Zap, BarChart3, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const problems = [
    {
      icon: Users,
      title: 'Long Queues',
      description: 'Students wait hours for simple information like fee deadlines and timetable changes'
    },
    {
      icon: Languages,
      title: 'Language Barriers',
      description: 'Communication gaps for students more comfortable in Hindi and regional languages'
    },
    {
      icon: Clock,
      title: 'Limited Hours',
      description: 'Office hours restrict access to information when students need it most'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: '5+ Languages',
      description: 'Supports English, Hindi, Marathi, Tamil, Telugu, and Bengali for inclusive communication',
      badge: 'Multi-lingual'
    },
    {
      icon: MessageCircle,
      title: 'Context Awareness',
      description: 'Maintains conversation context across multiple turns for natural interactions',
      badge: 'Smart AI'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock information access without office hour limitations',
      badge: 'Always On'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Secure conversations with no personal information storage',
      badge: 'Secure'
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Quick answers to common queries about fees, scholarships, and more',
      badge: 'Fast'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Admin insights and conversation logs for continuous improvement',
      badge: 'Data-Driven'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0118]">
      {/* Header */}
      <header className="border-b border-primary/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">CampusGenie</h1>
                <p className="text-xs text-purple-300 hidden md:block">Multilingual Campus Assistant</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all">
                  Get Started
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-purple-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-primary/20 flex flex-col gap-3">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">Login</Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-[0_0_20px_rgba(139,92,246,0.5)]">Get Started</Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/30 to-purple-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-violet-900/50 border border-primary/30 mb-8 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-purple-200">5+ Regional Languages Supported</span>
            </div>
            <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Break Language Barriers in Campus Communication
            </h2>
            <p className="text-lg md:text-xl mb-10 text-purple-200 max-w-3xl mx-auto leading-relaxed">
              CampusGenie is a multilingual AI chatbot that answers student queries in 5+ regional languages, 
              reducing office queues and ensuring 24/7 information access for all students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] transition-all px-8 py-6 text-lg">
                  Access College Portal
                </Button>
              </Link>
            </div>
            <p className="text-sm text-purple-400 mt-4 text-center">
              Faculty members can directly <Link to="/login" className="text-purple-300 hover:text-purple-200 underline">login here</Link> with their institutional credentials
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2 border-red-500/40 text-red-300 bg-red-950/30">
                Problem Statement
              </Badge>
              <h3 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                The Challenge We Solve
              </h3>
              <p className="text-lg text-purple-300 max-w-3xl mx-auto">
                Campus offices handle hundreds of repetitive queries daily, creating long queues and 
                communication barriers for students more comfortable in regional languages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-8 text-center bg-black/60 border-red-500/30 hover:border-red-500/50 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-sm"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <Icon className="w-10 h-10 text-red-400" />
                    </div>
                    <h4 className="mb-4 text-xl text-white">{problem.title}</h4>
                    <p className="text-purple-300 text-sm leading-relaxed">{problem.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/40 text-purple-300 bg-purple-950/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                Powered by Advanced Technology
              </Badge>
              <h3 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                CampusGenie Features
              </h3>
              <p className="text-lg text-purple-300 max-w-3xl mx-auto">
                A comprehensive multilingual chatbot that understands context, maintains conversation history, 
                and provides accurate information 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-8 bg-black/60 border-primary/30 hover:border-primary/60 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] backdrop-blur-sm group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all">
                        <Icon className="w-7 h-7 text-purple-400" />
                      </div>
                      <Badge variant="secondary" className="text-xs bg-purple-900/50 text-purple-200 border-primary/20">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h4 className="mb-3 text-lg text-white">{feature.title}</h4>
                    <p className="text-purple-300 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Preview Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/40 text-purple-300 bg-purple-950/30">
                Preview
              </Badge>
              <h3 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Master the Communication Realm
              </h3>
              <p className="text-lg text-purple-300">
                A glimpse of how students interact with our multilingual chatbot
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* English Conversation */}
              <Card className="overflow-hidden bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 border-b border-primary/30 p-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-purple-200">English</span>
                    <Badge variant="secondary" className="ml-auto text-xs bg-green-900/50 text-green-300 border-green-500/30">
                      Live
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3 bg-gradient-to-b from-purple-950/20 to-black/40 min-h-[300px]">
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-primary/30 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                      <p className="text-sm text-purple-100">Hello! How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                      <p className="text-sm text-white">What are the library timings?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-primary/30 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                      <p className="text-sm text-purple-100">The library is open Monday to Friday from 8:00 AM to 8:00 PM, and on weekends from 9:00 AM to 5:00 PM.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                      <p className="text-sm text-white">Thank you!</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Hindi Conversation */}
              <Card className="overflow-hidden bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 border-b border-primary/30 p-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-purple-200">हिन्दी (Hindi)</span>
                    <Badge variant="secondary" className="ml-auto text-xs bg-green-900/50 text-green-300 border-green-500/30">
                      Live
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3 bg-gradient-to-b from-purple-950/20 to-black/40 min-h-[300px]">
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-primary/30 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                      <p className="text-sm text-purple-100">नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                      <p className="text-sm text-white">फीस जमा करने की आखिरी तारीख क्या है?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-primary/30 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                      <p className="text-sm text-purple-100">इस सेमेस्टर की फीस जमा करने की आखिरी तारीख 15 अक्टूबर है।</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg px-4 py-3 max-w-[80%] shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                      <p className="text-sm text-white">धन्यवाद!</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-purple-400">
            <p>© 2025 CampusGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}