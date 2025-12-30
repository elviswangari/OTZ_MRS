import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import mohImage from '../assets/moh.png';
import { postRequestNoHeader } from '@/Axios';
import { useNavigate, Link } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { UserPlus, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignupForm() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [formData, setFormData] = useState({
    firstName: '',
    cccNumber: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await postRequestNoHeader('register', {
        firstName: formData.firstName,
        cccNumber: formData.cccNumber,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      });

      if (response && response.token) {
        signIn({
          auth: {
            token: response.token,
          },
          userState: {
            role: 'roc'
          },
          expiresIn: 3600,
        });
        navigate('/roc');
      } else {
        throw new Error('Signup failed.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="mx-auto w-full max-w-[450px] space-y-6">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <UserPlus className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">OTZ MRS</h1>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground">
              Join the Operation Triple Zero community today.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cccNumber">CCC Number</Label>
                <Input
                  id="cccNumber"
                  placeholder="1234567890"
                  value={formData.cccNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="0712345678"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center bg-muted p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="relative z-10 w-full max-w-md space-y-8 text-center">
          <img
            src={mohImage}
            alt="Ministry of Health Logo"
            className="mx-auto w-48 h-auto drop-shadow-xl"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Empowering Adolescents</h2>
            <p className="text-lg text-muted-foreground">
              "Zero missed appointments, Zero missed drugs, Zero viral load."
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            {[
              { label: "Appointments", value: "0 Missed" },
              { label: "Medication", value: "0 Missed" },
              { label: "Viral Load", value: "0 Detected" },
            ].map((stat, i) => (
              <div key={i} className="bg-background/80 backdrop-blur p-4 rounded-xl shadow-sm border">
                <div className="text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
