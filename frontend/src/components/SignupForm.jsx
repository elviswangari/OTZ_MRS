import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import mohImage from '../assets/moh.png';
// import { postRequestNoHeader } from '../Axios';
import { postRequestNoHeader } from '@/Axios';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

export function SignupForm() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [firstName, setFirstName] = useState('');
  const [cccNumber, setCccNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const response = await postRequestNoHeader('register', { firstName, cccNumber, email, phoneNumber, password });
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
        navigate('/roc/');
      } else {
        throw new Error('Signup failed.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden lg:block rounded-lg items-center justify-center py-12">
        <img
          src={mohImage}
          alt="Image"
          width="600"
          height="600"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cccNumber">CCC Number</Label>
                <Input
                  id="cccNumber"
                  type="text"
                  placeholder="1234567890"
                  value={cccNumber}
                  onChange={(e) => setCccNumber(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="0712346890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="/" className="underline">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
