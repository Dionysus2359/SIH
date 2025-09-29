import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  LogOut,
  Plus,
  Edit,
  Save,
  Trash2,
  BookOpen,
  History,
  Settings
} from 'lucide-react';

export default function FacultyDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingTimetable, setIsEditingTimetable] = useState(false);
  const [newCircular, setNewCircular] = useState({
    title: '',
    category: '',
    content: ''
  });
  const [aiApiKey, setAiApiKey] = useState('');
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [newClass, setNewClass] = useState({
    day: '',
    time: '',
    subject: '',
    room: '',
    program: ''
  });

  const facultyInfo = {
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@snu.edu.in',
    id: 'FAC2024001',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor'
  };

  const [timetable, setTimetable] = useState([
    { id: 1, day: 'Monday', time: '9:00 AM - 10:30 AM', subject: 'Machine Learning', room: 'LH-301', program: 'B.Tech CSE' },
    { id: 2, day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Database Systems', room: 'LH-205', program: 'B.Tech CSE' },
    { id: 3, day: 'Tuesday', time: '2:00 PM - 3:30 PM', subject: 'Computer Networks', room: 'LH-401', program: 'B.Tech CSE' },
    { id: 4, day: 'Wednesday', time: '9:00 AM - 10:30 AM', subject: 'Software Engineering', room: 'LH-203', program: 'B.Tech CSE' },
    { id: 5, day: 'Thursday', time: '11:00 AM - 12:30 PM', subject: 'ML Lab', room: 'Lab-201', program: 'B.Tech CSE' }
  ]);

  const [circulars, setCirculars] = useState([
    { 
      id: 1, 
      title: 'Mid-Semester Examination Schedule', 
      date: '2025-10-01', 
      category: 'Academic',
      content: 'Mid-semester examinations will be conducted from October 15-20, 2025.',
      createdBy: 'Dr. Priya Sharma'
    },
    { 
      id: 2, 
      title: 'ML Assignment Deadline Extended', 
      date: '2025-09-28', 
      category: 'Assignment',
      content: 'The deadline for Machine Learning Assignment 2 has been extended to October 10, 2025.',
      createdBy: 'Dr. Priya Sharma'
    }
  ]);

  const queryLogs = [
    {
      id: 1,
      timestamp: '2025-01-15 14:30:25',
      query: 'What are the library timings?',
      response: 'The library is open Monday to Sunday from 8:00 AM to 11:00 PM. During examination period, extended hours till 11:00 PM are available.',
      category: 'General Info'
    },
    {
      id: 2,
      timestamp: '2025-01-15 14:25:10',
      query: 'When is the fee payment deadline?',
      response: 'The last date for semester fee payment is October 15, 2025. You can pay online through the portal or visit the Accounts Office.',
      category: 'Finance'
    },
    {
      id: 3,
      timestamp: '2025-01-15 14:20:45',
      query: 'Machine Learning assignment deadline?',
      response: 'The deadline for Machine Learning Assignment 2 has been extended to October 10, 2025.',
      category: 'Academic'
    },
    {
      id: 4,
      timestamp: '2025-01-15 14:15:30',
      query: 'Where is the computer lab?',
      response: 'The Computer Lab (Lab-201) is located on the 2nd floor of the Engineering Block.',
      category: 'Location'
    },
    {
      id: 5,
      timestamp: '2025-01-15 14:10:15',
      query: 'Mid-semester exam schedule?',
      response: 'Mid-semester examinations will be conducted from October 15-20, 2025. Please check your examination schedule on the portal.',
      category: 'Academic'
    }
  ];

  const handleAddCircular = () => {
    if (!newCircular.title || !newCircular.category || !newCircular.content) {
      alert('Please fill all fields');
      return;
    }

    const circular = {
      id: circulars.length + 1,
      title: newCircular.title,
      date: new Date().toISOString().split('T')[0],
      category: newCircular.category,
      content: newCircular.content,
      createdBy: facultyInfo.name
    };

    setCirculars([circular, ...circulars]);
    setNewCircular({ title: '', category: '', content: '' });
  };

  const handleDeleteCircular = (id: number) => {
    setCirculars(circulars.filter(c => c.id !== id));
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
                  Faculty Dashboard
                </h1>
                <p className="text-xs text-purple-300 hidden md:block">Shiv Nadar University</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <User className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200">{facultyInfo.name}</span>
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
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <User className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200">{facultyInfo.name}</span>
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
        {/* Faculty Info Card */}
        <Card className="mb-8 overflow-hidden bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 border-4 border-black shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {facultyInfo.name}
                </h2>
                <div className="flex flex-wrap gap-3 mb-3">
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-primary/20">
                    {facultyInfo.designation}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-primary/20">
                    {facultyInfo.department}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-primary/20">
                    {facultyInfo.id}
                  </Badge>
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
            <TabsTrigger value="circulars">
              <BookOpen className="w-4 h-4 mr-2" />
              Circulars
            </TabsTrigger>
            <TabsTrigger value="logs">
              <History className="w-4 h-4 mr-2" />
              Query Logs
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Timetable Management Tab */}
          <TabsContent value="timetable">
            <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Manage Timetable
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditingTimetable(!isEditingTimetable)}
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10"
                    >
                      {isEditingTimetable ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                      {isEditingTimetable ? 'Save Changes' : 'Edit Timetable'}
                    </Button>
                    <Button 
                      onClick={() => setShowAddClassForm(!showAddClassForm)}
                      className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Class
                    </Button>
                  </div>
                </div>

                {/* Add Class Form */}
                {showAddClassForm && (
                  <Card className="mb-6 p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30">
                    <h4 className="text-lg text-white mb-4">Add New Class</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Day</Label>
                        <Select value={newClass.day} onValueChange={(value: string) => setNewClass({...newClass, day: value})}> 
                            {/* // added :string by myself */}
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                            <SelectItem value="Saturday">Saturday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input
                          value={newClass.time}
                          onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                          placeholder="e.g., 9:00 AM - 10:30 AM"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input
                          value={newClass.subject}
                          onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                          placeholder="Enter subject name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Room</Label>
                        <Input
                          value={newClass.room}
                          onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                          placeholder="e.g., LH-301"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Program</Label>
                        <Input
                          value={newClass.program}
                          onChange={(e) => setNewClass({...newClass, program: e.target.value})}
                          placeholder="e.g., B.Tech CSE"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => {
                          if (!newClass.day || !newClass.time || !newClass.subject || !newClass.room || !newClass.program) {
                            alert('Please fill all fields');
                            return;
                          }
                          const newClassItem = {
                            id: timetable.length + 1,
                            day: newClass.day,
                            time: newClass.time,
                            subject: newClass.subject,
                            room: newClass.room,
                            program: newClass.program
                          };
                          setTimetable([...timetable, newClassItem]);
                          setNewClass({ day: '', time: '', subject: '', room: '', program: '' });
                          setShowAddClassForm(false);
                        }}
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Class
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowAddClassForm(false);
                          setNewClass({ day: '', time: '', subject: '', room: '', program: '' });
                        }}
                        className="border-primary/30"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card>
                )}

                <div className="space-y-4">
                  {timetable.map((item) => (
                    <Card key={item.id} className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30 hover:border-primary/50 transition-all">
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
                              <BookOpen className="w-3 h-3" />
                              {item.program}
                            </div>
                          </div>
                        </div>
                        {isEditingTimetable && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-primary/30"
                              onClick={() => {
                                // Edit timetable item
                                alert(`Edit ${item.subject} class`);
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-500/30 text-red-400 hover:bg-red-950/30"
                              onClick={() => {
                                // Delete timetable item
                                if (confirm(`Are you sure you want to delete ${item.subject} class?`)) {
                                  setTimetable(timetable.filter(t => t.id !== item.id));
                                }
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Circulars Management Tab */}
          <TabsContent value="circulars">
            <div className="space-y-6">
              {/* Add New Circular */}
              <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Add New Circular/Instruction
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="circularTitle">Title</Label>
                      <Input
                        id="circularTitle"
                        value={newCircular.title}
                        onChange={(e) => setNewCircular({...newCircular, title: e.target.value})}
                        placeholder="Enter circular title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="circularCategory">Category</Label>
                      <Select
                        value={newCircular.category}
                        onValueChange={(value: string) => setNewCircular({...newCircular, category: value})}
                      >
                        {/* added :string by myself */}
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Assignment">Assignment</SelectItem>
                          <SelectItem value="Examination">Examination</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="circularContent">Content</Label>
                    <Textarea
                      id="circularContent"
                      value={newCircular.content}
                      onChange={(e) => setNewCircular({...newCircular, content: e.target.value})}
                      placeholder="Enter circular content"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddCircular} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Circular
                  </Button>
                </div>
              </Card>

              {/* Existing Circulars */}
              <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Published Circulars
                  </h3>
                  <div className="space-y-4">
                    {circulars.map((circular) => (
                      <Card key={circular.id} className="p-5 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30 hover:border-primary/50 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={
                                circular.category === 'Academic' ? 'border-blue-500/40 text-blue-300 bg-blue-950/30' :
                                circular.category === 'Assignment' ? 'border-green-500/40 text-green-300 bg-green-950/30' :
                                circular.category === 'Examination' ? 'border-red-500/40 text-red-300 bg-red-950/30' :
                                'border-purple-500/40 text-purple-300 bg-purple-950/30'
                              }
                            >
                              {circular.category}
                            </Badge>
                            <span className="text-xs text-purple-400">{circular.date}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCircular(circular.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-950/30"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <h4 className="mb-2 text-white">{circular.title}</h4>
                        <p className="text-sm text-purple-300 leading-relaxed mb-2">{circular.content}</p>
                        <p className="text-xs text-purple-500">Created by: {circular.createdBy}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Query Logs Tab */}
          <TabsContent value="logs">
            <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-2xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Chatbot Query Logs
                </h3>
                <div className="mb-4 text-sm text-purple-400">
                  <p>* Personal information is not stored for privacy protection</p>
                </div>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4 pr-4">
                    {queryLogs.map((log) => (
                      <Card key={log.id} className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="outline" className="border-primary/40 text-purple-300 bg-purple-950/30">
                            {log.category}
                          </Badge>
                          <span className="text-xs text-purple-400">{log.timestamp}</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm text-purple-300 mb-1">Query:</h5>
                            <p className="text-sm text-white bg-purple-950/30 p-2 rounded border border-primary/20">
                              {log.query}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm text-purple-300 mb-1">AI Response:</h5>
                            <p className="text-sm text-purple-200 bg-purple-900/30 p-2 rounded border border-primary/20">
                              {log.response}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-2xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  System Settings
                </h3>
                <div className="space-y-6">
                  {/* AI API Key Configuration */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="aiApiKey" className="text-lg text-white mb-2 block">
                        AI API Key Configuration
                      </Label>
                      <p className="text-sm text-purple-400 mb-4">
                        Configure your AI API key to enhance chatbot responses. This is optional and will be securely stored.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aiApiKey">API Key</Label>
                      <Input
                        id="aiApiKey"
                        type="password"
                        value={aiApiKey}
                        onChange={(e) => setAiApiKey(e.target.value)}
                        placeholder="Enter your AI API key (optional)"
                        className="max-w-md"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          // Here you would typically send the API key to your backend
                          alert('API key saved successfully!');
                          setAiApiKey('');
                        }}
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
                      >
                        Save API Key
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setAiApiKey('')}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="text-xs text-purple-500 max-w-2xl">
                      <p className="mb-2">
                        <strong>Note:</strong> The API key will be encrypted and stored securely on the backend. 
                        This will be used to enhance the AI chatbot's responses with more advanced capabilities.
                      </p>
                      <p>
                        Supported APIs: OpenAI GPT, Google Gemini, Anthropic Claude, etc.
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-primary/20"></div>

                  {/* Additional Settings Placeholder */}
                  <div className="space-y-4">
                    <h4 className="text-lg text-white">Other Settings</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30">
                        <h5 className="text-white mb-2">Notification Preferences</h5>
                        <p className="text-sm text-purple-400">Configure how you receive notifications about student queries.</p>
                        <Button size="sm" variant="outline" className="mt-3 border-primary/30">
                          Configure
                        </Button>
                      </Card>
                      <Card className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-primary/30">
                        <h5 className="text-white mb-2">Data Export</h5>
                        <p className="text-sm text-purple-400">Export timetables, circulars, and anonymized query logs.</p>
                        <Button size="sm" variant="outline" className="mt-3 border-primary/30">
                          Export Data
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}