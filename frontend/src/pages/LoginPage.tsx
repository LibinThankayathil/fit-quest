import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import { AuthError } from '../api/auth';
import loginHero from '../assets/login-hero.jpg';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof AuthError) {
        setGeneralError(err.message);
        if (err.fieldErrors) {
          setFieldErrors(err.fieldErrors);
        }
      } else {
        setGeneralError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#131313] text-[#e5e2e1]">
      {/* Left Visual Hero Section */}
      <div className="relative w-full md:w-1/2 min-h-[380px] md:min-h-screen bg-[#0e0e0e] overflow-hidden flex flex-col items-center justify-center p-8 md:p-14 text-center">
        <img
          src={loginHero}
          alt="FitQuest Athlete"
          className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-black/50 md:bg-gradient-to-r md:from-black/70 md:via-[#131313]/50 md:to-[#131313]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#131313]/30 to-[#131313]/90" />

        {/* Centered Brand Identity Hero Block */}
        <div className="relative z-10 flex flex-col items-center max-w-sm space-y-4">
          <Logo size="lg" className="flex-col !gap-4" />

          {/* Slogan */}
          <p className="text-sm md:text-base text-[#a9ada0] leading-relaxed font-normal text-center">
            Push past your limits. Track your evolution. Dominate the leaderboard.
          </p>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-[#131313]">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-[#9fa38c]">
              Log in to continue your training.
            </p>
          </div>

          {/* Error Message Box */}
          {generalError && (
            <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-sm flex items-start gap-2.5">
              <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
              error={fieldErrors.email}
              autoComplete="email"
              required
            />

            <Input
              id="password"
              placeholder="Password"
              isPassword
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: '' }));
                }
              }}
              error={fieldErrors.password}
              autoComplete="current-password"
              required
            />

            {/* Forgot Password Affordance */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => alert('Password reset flow will be available soon.')}
                className="text-xs font-semibold text-[#c3f400] hover:text-[#abd600] hover:underline transition-colors focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Log In
              </Button>
            </div>
          </form>

          {/* Switch to Signup Link */}
          <div className="text-center text-sm text-[#9fa38c]">
            New to FitQuest?{' '}
            <Link
              to="/register"
              className="text-white font-bold hover:underline transition-colors hover:text-[#c3f400] inline-block ml-1"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
