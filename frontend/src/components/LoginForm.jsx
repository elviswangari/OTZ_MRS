/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, User, ArrowRight } from "lucide-react";
import mohImage from '../assets/moh.png';
import { postRequestNoHeader } from '@/Axios';

export function LoginForm() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await postRequestNoHeader('login', { identifier, password });
      if (response && response.token && response.role) {
        signIn({
          auth: {
            token: response.token,
          },
          userState: {
            role: response.role,
            userId: response.userId,
            firstName: response.firstName,
            email: response.email
          },
          expiresIn: 3600,
        });
        if (response.role === 'roc') {
          navigate('/roc');
        } else if (response.role === 'hcw') {
          navigate('/hcw');
        } else {
          setError('Unknown role. Please contact support.');
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 sm:p-8">
      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6 text-center p-8">
          <img
            src={mohImage}
            alt="Ministry of Health Logo"
            className="w-48 h-48 object-contain animate-in fade-in zoom-in duration-700"
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-primary">OTZ Module</h1>
            <p className="text-xl text-muted-foreground max-w-[400px]">
              Operation Triple Zero: Empowering Adolescents and Young People Living with HIV.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full max-w-[400px] pt-8">
            <div className="p-4 bg-background rounded-xl shadow-sm border">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground uppercase">Missed Dose</p>
            </div>
            <div className="p-4 bg-background rounded-xl shadow-sm border">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground uppercase">Missed Appt</p>
            </div>
            <div className="p-4 bg-background rounded-xl shadow-sm border">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground uppercase">Viral Load</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full shadow-xl border-none sm:border">
          <CardHeader className="space-y-1 text-center sm:text-left">
            <div className="flex justify-center lg:hidden mb-4">
              <img src={mohImage} alt="MOH Logo" className="w-20 h-20 object-contain" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="identifier">Email, Username, or Phone</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="identifier"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
