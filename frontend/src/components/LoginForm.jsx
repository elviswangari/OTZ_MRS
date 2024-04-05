import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { postRequest } from '../Axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import mohImage from '../assets/moh.png';

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
    try {
      const response = await postRequest('login', { identifier, password });
      if (response && response.token && response.role) {
        signIn({
          auth: {
            token: response.token,
          },
          userState: {
            role: response.role
          },
          expiresIn: 3600,
        });
        if (response.role === 'roc') {
          navigate('/roc/');
        } else if (response.role === 'hcw') {
          navigate('/hcw/');
        } else {
          console.error('Unknown role:', response.role);
          setError('Unknown role. Please contact support.');
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Please check your credentials and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden lg:block rounded-lg flex items-center justify-center py-12">
        <img
          src={mohImage}
          alt="Image"
          width="600"
          height="600"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground"></p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="identifier">Email, Username, or Phone</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email, username, or phone number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
