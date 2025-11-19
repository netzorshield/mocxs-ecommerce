'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { login, register, getAuthToken, getCurrentUser, removeAuthToken } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        // Verify token is valid by checking current user
        const user = await getCurrentUser();
        if (user) {
          // Valid token, redirect to home
          const redirect = searchParams.get('redirect') || '/';
          router.push(redirect);
        } else {
          // Invalid token, remove it
          removeAuthToken();
        }
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Login successful!');
        const redirect = searchParams.get('redirect') || '/';
        router.push(redirect);
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success('Registration successful!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.msg ||
                          error.message || 
                          'Authentication failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white p-8 rounded-lg shadow-md border text-center">
              <p>Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h1 className="text-3xl font-bold text-center mb-8 text-charcoal">
              {isLogin ? 'Login' : 'Sign Up'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Password</label>
                  {isLogin && (
                    <Link
                      href="/forgot-password"
                      className="text-sm text-deepBlue hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-deepBlue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-deepBlue hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

