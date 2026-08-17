import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { AuthError } from '../api/auth';
import registerHero from '../assets/register-hero.jpg';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
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
      await register({ fullName, email, password });
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof AuthError) {
        setGeneralError(err.message);
        if (err.fieldErrors) {
          setFieldErrors(err.fieldErrors);
        }
      } else {
        setGeneralError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#131313] text-[#e5e2e1]">
      {/* Left Visual Hero Section */}
      <div className="relative w-full md:w-1/2 min-h-[340px] md:min-h-screen bg-[#0e0e0e] overflow-hidden flex flex-col justify-end p-8 md:p-14">
        <img
          src={registerHero}
          alt="Athlete sprinting"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />

        {/* Dramatic Vignette and Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#131313]/20 md:to-[#131313]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-black/40 to-transparent" />

        {/* Hero Branding Content */}
        <div className="relative z-10 space-y-2.5 max-w-lg mb-2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display drop-shadow-md">
            Join the Elite.
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[#c3f400] font-display tracking-tight">
            Level Up Your Fitness.
          </p>
          <div className="w-12 h-1.5 bg-[#c3f400] rounded-full mt-3 shadow-[0_0_12px_rgba(195,244,0,0.6)]" />
        </div>
      </div>

      {/* Right Form Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-[#131313]">
        <div className="w-full max-w-[460px] bg-[#1c1b1b]/95 border border-[#2a2a2a] rounded-2xl p-7 sm:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-2">
              Create Account
            </h2>
            <p className="text-sm text-[#9fa38c]">
              Start your high-performance journey today.
            </p>
          </div>

          {/* Error Message Box */}
          {generalError && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-sm flex items-start gap-2.5">
              <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              id="fullName"
              label="Full Name"
              placeholder="Jane Doe"
              icon={<UserIcon size={18} />}
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (fieldErrors.fullName) {
                  setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                }
              }}
              error={fieldErrors.fullName}
              autoComplete="name"
              required
            />

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="athlete@fitquest.com"
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
              label="Password"
              placeholder="••••••••"
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
              autoComplete="new-password"
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                icon={<ArrowRight size={18} />}
                className="group"
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Switch to Login Link */}
          <div className="mt-8 text-center text-sm text-[#9fa38c]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#c3f400] font-semibold hover:underline transition-colors hover:text-[#abd600] inline-block ml-1"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
