// LoginPage.tsx - UPDATED

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext"; // Already imported, now we'll use it
import { ROUTES, USER_ROLES } from "../constants"; // Import USER_ROLES

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth(); // ✅ Get login function and loading state from context
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // ✅ Add state for error messages

  // ❌ REMOVE the local isLoading state: const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Call the login function from AuthContext
    const result = await login(formData);

    if (result.success) {
      // ✅ Navigate based on the user's role returned from the backend
      if (result.user?.role === USER_ROLES.FACULTY) {
        navigate('/faculty');
      } else {
        navigate('/portal');
      }
    } else {
      // ✅ Set the error message if login fails
      setError(result.message || 'An unknown error occurred.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0118]">
      {/* Header (no changes here) */}
      <header className="border-b border-primary/20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">CampusGenie</h1>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background elements (no changes) */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/30 to-purple-900/20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
        
        <div className="w-full max-w-md relative z-10">
          <Card className="bg-black/60 border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Welcome back</CardTitle>
              <CardDescription className="text-purple-300">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ✅ Error Message Display */}
                {error && (
                  <div className="p-3 rounded-md bg-red-900/50 border border-red-500/50 text-red-300 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <p>{error}</p>
                  </div>
                )}
                
                {/* Form fields (no changes) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@college.edu" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? (<EyeOff className="w-4 h-4" />) : (<Eye className="w-4 h-4" />)}
                    </button>
                  </div>
                </div>

                {/* ✅ Use the global loading state from the context */}
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </CardContent>
            {/* Card Footer and Back to Home link (no changes) */}
            <CardFooter className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-sm text-purple-300">Don't have an account?</p>
              <Link to="/register" className="text-sm text-purple-400 hover:text-purple-300 hover:underline">Sign up</Link>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-purple-400 hover:text-purple-300">← Back to home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}