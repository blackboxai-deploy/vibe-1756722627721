'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth token
        if (formData.rememberMe) {
          localStorage.setItem('auth_token', data.token);
        } else {
          sessionStorage.setItem('auth_token', data.token);
        }
        
        // Redirect to dashboard
        router.push('/servers');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MinecraftHost
              </h1>
            </Link>
          </div>
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-purple-200">
            Sign in to manage your Minecraft servers
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-purple-200">
                Username or Email
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="bg-purple-800/20 border-purple-500/30 text-white placeholder:text-purple-400 focus:border-purple-400"
                placeholder="Enter your username or email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-purple-800/20 border-purple-500/30 text-white placeholder:text-purple-400 focus:border-purple-400"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={handleCheckboxChange}
                className="border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="rememberMe" className="text-sm text-purple-200">
                Remember me for 30 days
              </Label>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-4">
            <Link href="/auth/forgot-password" className="text-sm text-purple-300 hover:text-purple-200">
              Forgot your password?
            </Link>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-purple-900/20 px-2 text-purple-400">Or</span>
              </div>
            </div>
            
            <p className="text-sm text-purple-300">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-purple-200 hover:text-white font-medium">
                Create one now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}