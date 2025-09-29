import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  LogOut,
  Send,
  Sparkles,
  Minimize2,
  Maximize2,
  Bot,
  Languages
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function CollegePortal() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isChatFullscreen, setIsChatFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m Selene, your AI campus assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);

  const studentInfo = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@snu.edu.in',
    id: 'SNU2024001',
    program: 'B.Tech Computer Science',
    semester: 'Semester 6'
  };

  const timetable = [
    { day: 'Monday', time: '9:00 AM - 10:30 AM', subject: 'Machine Learning', room: 'LH-301', faculty: 'Dr. Sharma' },
    { day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Database Systems', room: 'LH-205', faculty: 'Prof. Gupta' },
    { day: 'Tuesday', time: '10:00 AM - 11:30 AM', subject: 'Web Development', room: 'Lab-102', faculty: 'Dr. Singh' },
    { day: 'Tuesday', time: '2:00 PM - 3:30 PM', subject: 'Computer Networks', room: 'LH-401', faculty: 'Prof. Verma' },
    { day: 'Wednesday', time: '9:00 AM - 10:30 AM', subject: 'Software Engineering', room: 'LH-203', faculty: 'Dr. Patel' },
    { day: 'Thursday', time: '11:00 AM - 12:30 PM', subject: 'ML Lab', room: 'Lab-201', faculty: 'Dr. Sharma' },
    { day: 'Friday', time: '9:00 AM - 10:30 AM', subject: 'Seminar', room: 'LH-101', faculty: 'Multiple' }
  ];

  const circulars = [
    { 
      id: 1, 
      title: 'Mid-Semester Examination Schedule', 
      date: '2025-10-01', 
      category: 'Academic',
      content: 'Mid-semester examinations will be conducted from October 15-20, 2025. Please check your examination schedule on the portal.'
    },
    { 
      id: 2, 
      title: 'Fee Payment Deadline Extended', 
      date: '2025-09-28', 
      category: 'Finance',
      content: 'The last date for semester fee payment has been extended to October 15, 2025.'
    },
    { 
      id: 3, 
      title: 'Cultural Fest Registration Open', 
      date: '2025-09-25', 
      category: 'Events',
      content: 'Register for the annual cultural fest "Transcendence 2025". Last date: October 5, 2025.'
    },
    { 
      id: 4, 
      title: 'Library Hours Extended', 
      date: '2025-09-20', 
      category: 'Facility',
      content: 'Library will remain open till 11:00 PM during examination period.'
    }
  ];

  const emergencyContacts = [
    { name: 'Campus Security', phone: '+91-120-266-7000', available: '24/7' },
    { name: 'Medical Center', phone: '+91-120-266-7100', available: '24/7' },
    { name: 'Student Helpdesk', phone: '+91-120-266-7200', available: '9 AM - 6 PM' },
    { name: 'IT Support', phone: '+91-120-266-7300', available: '9 AM - 5 PM' }
  ];

  const events = [
    {
      id: 1,
      title: 'Tech Fest 2025',
      date: '2025-10-12',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Auditorium',
      category: 'Academic',
      description: 'Annual technology festival featuring hackathons, tech talks, and innovation showcases.',
      registrationRequired: true,
      deadline: '2025-10-05'
    },
    {
      id: 2,
      title: 'Cultural Night - Transcendence',
      date: '2025-10-18',
      time: '6:00 PM - 11:00 PM',
      location: 'Open Air Theatre',
      category: 'Cultural',
      description: 'Grand cultural celebration with music, dance, drama performances by students.',
      registrationRequired: true,
      deadline: '2025-10-10'
    },
    {
      id: 3,
      title: 'Career Fair 2025',
      date: '2025-10-25',
      time: '10:00 AM - 4:00 PM',
      location: 'Convention Center',
      category: 'Career',
      description: 'Meet with top recruiters from leading companies for internships and job opportunities.',
      registrationRequired: false,
      deadline: null
    },
    {
      id: 4,
      title: 'Research Symposium',
      date: '2025-11-02',
      time: '9:00 AM - 5:00 PM',
      location: 'Conference Hall',
      category: 'Academic',
      description: 'Showcase of student and faculty research projects across all departments.',
      registrationRequired: true,
      deadline: '2025-10-20'
    },
    {
      id: 5,
      title: 'Sports Week',
      date: '2025-11-08',
      time: '8:00 AM - 8:00 PM',
      location: 'Sports Complex',
      category: 'Sports',
      description: 'Inter-department sports competitions including cricket, football, basketball, and more.',
      registrationRequired: true,
      deadline: '2025-11-01'
    }
  ];

  const officeTimings = [
    { office: 'Registrar Office', timing: 'Mon-Fri: 9:00 AM - 5:00 PM', location: 'Admin Block, Room 101' },
    { office: 'Accounts Office', timing: 'Mon-Fri: 9:30 AM - 4:30 PM', location: 'Admin Block, Room 205' },
    { office: 'Placement Cell', timing: 'Mon-Fri: 10:00 AM - 5:00 PM', location: 'Career Services, 2nd Floor' },
    { office: 'Library', timing: 'Mon-Sun: 8:00 AM - 11:00 PM', location: 'Central Library Building' }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        message: getBotResponse(chatMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('fee') || lowerQuery.includes('payment')) {
      return 'The last date for semester fee payment is October 15, 2025. You can pay online through the portal or visit the Accounts Office (Mon-Fri, 9:30 AM - 4:30 PM).';
    } else if (lowerQuery.includes('exam') || lowerQuery.includes('examination')) {
      return 'Mid-semester examinations will be conducted from October 15-20, 2025. Please check your examination schedule on the academic portal.';
    } else if (lowerQuery.includes('library')) {
      return 'The library is open Monday to Sunday from 8:00 AM to 11:00 PM. During examination period, extended hours till 11:00 PM are available.';
    } else if (lowerQuery.includes('timetable') || lowerQuery.includes('schedule')) {
      return 'You can view your complete timetable in the Timetable section of the portal. Your next class is Machine Learning on Monday at 9:00 AM in LH-301.';
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('help')) {
      return 'For immediate assistance, you can contact Student Helpdesk at +91-120-266-7200 (9 AM - 6 PM) or check the Info section for more emergency contacts.';
    } else if (lowerQuery.includes('event') || lowerQuery.includes('fest') || lowerQuery.includes('tech fest') || lowerQuery.includes('hackathon') || lowerQuery.includes('cultural')) {
      return 'Upcoming events include Tech Fest 2025 on October 12th, Cultural Night "Transcendence" on October 18th, Career Fair on October 25th, and more! Check the Events tab for full details and registration.';
    } else if (lowerQuery.includes('tech fest') || lowerQuery.includes('when is the fest')) {
      return 'Tech Fest 2025 is scheduled for October 12th, 2025 from 9:00 AM to 6:00 PM at the Main Auditorium. Registration deadline is October 5th, 2025.';
    } else if (lowerQuery.includes('transcendence') || lowerQuery.includes('cultural night')) {
      return 'Cultural Night "Transcendence" will be held on October 18th, 2025 from 6:00 PM to 11:00 PM at the Open Air Theatre. Registration required by October 10th.';
    } else if (lowerQuery.includes('career fair') || lowerQuery.includes('placement')) {
      return 'Career Fair 2025 is on October 25th, 2025 from 10:00 AM to 4:00 PM at the Convention Center. No registration required - just walk in!';
    } else {
      return 'I can help you with information about fees, examinations, library timings, timetables, events, and campus contacts. What would you like to know more about?';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0118]">
      {/* Header */}
      <header className="border-b border-primary/20 bg-black/40 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  Shiv Nadar University
                </h1>
                <p className="text-xs text-purple-300 hidden md:block">Student Portal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-primary/10">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <User className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200">{studentInfo.name}</span>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
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
            <nav className="md:hidden mt-4 pt-4 border-t border-primary/20 space-y-3">
              <Button variant="ghost" className="w-full justify-start text-purple-300 hover:text-white hover:bg-primary/10">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <User className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200">{studentInfo.name}</span>
              </div>
              <Link to="/" className="block">
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Student Info Card */}
        <Card className="mb-8 overflow-hidden bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
          <div className="relative h-48 md:h-64">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU5MTMwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Campus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Ask Selene Button - Top Left of Image */}
            {!isChatOpen && (
              <div className="absolute top-4 left-4 z-20">
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] flex items-center gap-3 px-8 py-4 rounded-full text-white transition-all hover:scale-105 animate-pulse text-lg"
                >
                  <Bot className="w-6 h-6" />
                  <span>Ask Selene</span>
                  <Sparkles className="w-5 h-5 animate-bounce" />
                </Button>
              </div>
            )}
          </div>
          <div className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 border-4 border-black shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {studentInfo.name}
                </h2>
                <div className="flex flex-wrap gap-3 mb-3">
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-primary/20">
                    {studentInfo.id}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-primary/20">
                    {studentInfo.program}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-primary/20">
                    {studentInfo.semester}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <Mail className="w-4 h-4" />
                  {studentInfo.email}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="timetable" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-black/60 border border-primary/30">
            <TabsTrigger value="timetable">
              <Calendar className="w-4 h-4 mr-2" />
              Timetable
            </TabsTrigger>
            <TabsTrigger value="events">
              <Sparkles className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="circulars">
              <Bell className="w-4 h-4 mr-2" />
              Circulars
            </TabsTrigger>
            <TabsTrigger value="info">
              <Phone className="w-4 h-4 mr-2" />
              Info
            </TabsTrigger>
          </TabsList>

          {/* Timetable Tab */}
          <TabsContent value="timetable">
            <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-2xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Weekly Schedule
                </h3>
                <div className="space-y-4">
                  {timetable.map((item, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30 hover:border-primary/50 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="border-primary/40 text-purple-300">
                              {item.day}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-purple-300">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </div>
                          </div>
                          <h4 className="mb-1 text-white">{item.subject}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-purple-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.room}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {item.faculty}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500/30 text-green-400 hover:bg-green-950/30"
                            onClick={() => {
                              // Add to calendar functionality
                              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.subject)}&dates=20251001T090000Z/20251001T103000Z&details=${encodeURIComponent(`Room: ${item.room}\nFaculty: ${item.faculty}`)}&location=${encodeURIComponent(item.room)}`;
                              window.open(calendarUrl, '_blank');
                            }}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-2xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="p-5 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30 hover:border-primary/50 transition-all">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <Badge 
                              variant="outline" 
                              className={
                                event.category === 'Academic' ? 'border-blue-500/40 text-blue-300 bg-blue-950/30' :
                                event.category === 'Cultural' ? 'border-purple-500/40 text-purple-300 bg-purple-950/30' :
                                event.category === 'Career' ? 'border-green-500/40 text-green-300 bg-green-950/30' :
                                event.category === 'Sports' ? 'border-orange-500/40 text-orange-300 bg-orange-950/30' :
                                'border-yellow-500/40 text-yellow-300 bg-yellow-950/30'
                              }
                            >
                              {event.category}
                            </Badge>
                            <span className="text-xs text-purple-400">{event.date}</span>
                          </div>
                          <h4 className="mb-2 text-white text-lg">{event.title}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-purple-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          </div>
                          <p className="text-sm text-purple-300 leading-relaxed mb-3">{event.description}</p>
                          {event.registrationRequired && (
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-300 border-yellow-500/30">
                                Registration Required
                              </Badge>
                              {event.deadline && (
                                <span className="text-purple-400">Deadline: {event.deadline}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500/30 text-green-400 hover:bg-green-950/30"
                            onClick={() => {
                              // Add to calendar functionality for events
                              const eventDate = new Date(event.date);
                              const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                              const endTime = new Date(eventDate.getTime() + 8 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
                              window.open(calendarUrl, '_blank');
                            }}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Add to Calendar
                          </Button>
                          {event.registrationRequired && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                            >
                              Register Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Circulars Tab */}
          <TabsContent value="circulars">
            <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-2xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Notices & Circulars
                </h3>
                <div className="space-y-4">
                  {circulars.map((circular) => (
                    <Card key={circular.id} className="p-5 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30 hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <Badge 
                          variant="outline" 
                          className={
                            circular.category === 'Academic' ? 'border-blue-500/40 text-blue-300 bg-blue-950/30' :
                            circular.category === 'Finance' ? 'border-green-500/40 text-green-300 bg-green-950/30' :
                            circular.category === 'Events' ? 'border-purple-500/40 text-purple-300 bg-purple-950/30' :
                            'border-yellow-500/40 text-yellow-300 bg-yellow-950/30'
                          }
                        >
                          {circular.category}
                        </Badge>
                        <span className="text-xs text-purple-400">{circular.date}</span>
                      </div>
                      <h4 className="mb-2 text-white">{circular.title}</h4>
                      <p className="text-sm text-purple-300 leading-relaxed">{circular.content}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Emergency Contacts */}
              <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Emergency Contacts
                  </h3>
                  <div className="space-y-3">
                    {emergencyContacts.map((contact, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-br from-red-900/20 to-red-950/20 border-red-500/30">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm text-white">{contact.name}</h4>
                          <Badge variant="secondary" className="text-xs bg-red-900/50 text-red-300 border-red-500/30">
                            {contact.available}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                          <Phone className="w-3 h-3" />
                          <a href={`tel:${contact.phone}`} className="hover:text-purple-200 transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Office Timings */}
              <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Office Timings
                  </h3>
                  <div className="space-y-3">
                    {officeTimings.map((office, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30">
                        <h4 className="text-sm text-white mb-2">{office.office}</h4>
                        <div className="flex items-center gap-2 text-xs text-purple-300 mb-1">
                          <Clock className="w-3 h-3" />
                          {office.timing}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-purple-400">
                          <MapPin className="w-3 h-3" />
                          {office.location}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced Floating Chat Button with Accessibility */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Main Floating Icon */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] flex items-center justify-center transition-all hover:scale-110 group relative"
          >
            <Bot className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-black flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-white animate-spin" />
            </div>
            
            {/* Accessibility Ring Animation */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-20 right-0 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Click to chat with Selene, your AI assistant
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div 
          className={`fixed ${
            isChatFullscreen 
              ? 'inset-0 w-full h-full' 
              : isChatMinimized 
                ? 'bottom-6 right-6 w-80' 
                : 'bottom-6 right-6 w-96 h-[600px]'
          } bg-black/95 border border-primary/30 ${isChatFullscreen ? 'rounded-none' : 'rounded-xl'} shadow-[0_0_40px_rgba(139,92,246,0.4)] backdrop-blur-md z-50 flex flex-col transition-all overflow-hidden`}
        >
          {/* Chat Header */}
          <div className={`flex-shrink-0 p-4 border-b border-primary/30 bg-gradient-to-r from-purple-900/50 to-violet-900/50 ${isChatFullscreen ? 'rounded-none' : 'rounded-t-xl'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">Selene</h3>
                <p className="text-xs text-purple-300">AI Campus Assistant</p>
              </div>
            </div>
            
            {/* Language Selection and Controls */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              {!isChatMinimized && (
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-purple-300" />
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[120px] h-8 bg-black/40 border-primary/30 text-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-primary/30">
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">हिंदी</SelectItem>
                      <SelectItem value="Marwari">मारवाड़ी</SelectItem>
                      <SelectItem value="Marathi">मराठी</SelectItem>
                      <SelectItem value="Tamil">தமிழ்</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                {/* Fullscreen Toggle */}
                {!isChatMinimized && (
                  <button
                    onClick={() => setIsChatFullscreen(!isChatFullscreen)}
                    className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                    title={isChatFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isChatFullscreen ? (
                      <Minimize2 className="w-4 h-4 text-purple-300" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-purple-300" />
                    )}
                  </button>
                )}
                
                {/* Minimize Toggle */}
                <button
                  onClick={() => setIsChatMinimized(!isChatMinimized)}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                  title={isChatMinimized ? "Expand" : "Minimize"}
                >
                  {isChatMinimized ? (
                    <Maximize2 className="w-4 h-4 text-purple-300" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-purple-300" />
                  )}
                </button>
                
                {/* Close */}
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                  title="Close Chat"
                >
                  <X className="w-4 h-4 text-purple-300" />
                </button>
              </div>
            </div>
          </div>

          {!isChatMinimized && (
            <>
              {/* Chat Messages */}
              <div className={`flex-1 overflow-y-auto p-4 ${isChatFullscreen ? 'w-full' : ''}`}>
                <div className={`space-y-4 ${isChatFullscreen ? 'max-w-4xl mx-auto' : ''}`}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`${isChatFullscreen ? 'max-w-[60%]' : 'max-w-[80%]'} rounded-lg px-4 py-3 ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                            : 'bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-primary/30 text-purple-100'
                        }`}
                      >
                        <p className={`${isChatFullscreen ? 'text-base' : 'text-sm'} leading-relaxed`}>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Language Information Banner */}
                  {selectedLanguage !== 'English' && (
                    <div className="flex justify-center my-4">
                      <div className="bg-gradient-to-r from-purple-800/30 to-violet-800/30 border border-primary/30 rounded-lg px-4 py-2">
                        <p className="text-xs text-purple-300 text-center">
                          Language set to {selectedLanguage} - I'll respond in your selected language
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input */}
              <div className={`flex-shrink-0 p-4 border-t border-primary/30 ${isChatFullscreen ? 'w-full' : ''}`}>
                <div className={`flex gap-2 ${isChatFullscreen ? 'max-w-4xl mx-auto' : ''}`}>
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Ask Selene anything... (${selectedLanguage})`}
                    className={`flex-1 bg-purple-950/30 border-primary/30 focus:border-primary/50 text-white placeholder:text-purple-400 ${isChatFullscreen ? 'text-base py-3' : ''}`}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size={isChatFullscreen ? "default" : "icon"}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  >
                    <Send className="w-4 h-4" />
                    {isChatFullscreen && <span className="ml-2">Send</span>}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}