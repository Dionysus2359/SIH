import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { MessageCircle, Eye, EyeOff, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    const result = await register(formData);

    if (result.success) {
      navigate('/portal');
    } else {
      setError(result.message || 'An unknown error occurred.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, agreeToTerms: checked });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-muted';
    if (passwordStrength === 1) return 'bg-destructive';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0118]">
      {/* Header */}
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
      <main className="flex-1 flex items-center justify-center p-4 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/30 to-purple-900/20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
        <div className="w-full max-w-2xl relative z-10">
          <Card className="bg-black/60 border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Create an account</CardTitle>
              <CardDescription className="text-purple-300">
                Student registration - Enter your information to access the college portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-red-900/50 border border-red-500/50 text-red-300 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <p>{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength ? getPasswordStrengthColor() : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      {passwordStrength > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Password strength: {getPasswordStrengthText()}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-xs">Passwords match</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-sm text-purple-300">
                Already have an account?
              </p>
              <Link to="/login" className="text-sm text-purple-400 hover:text-purple-300 hover:underline">
                Sign in
              </Link>
            </CardFooter>
          </Card>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-purple-400 hover:text-purple-300">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}