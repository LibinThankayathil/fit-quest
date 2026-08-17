import React, { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-bold tracking-wider text-[#9fa38c] uppercase mb-2 select-none"
        >
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center w-full bg-[#201f1f] rounded-lg border transition-all duration-200 ${
          error
            ? 'border-red-500/80 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
            : 'border-[#333333] hover:border-[#444444] focus-within:border-[#c3f400] focus-within:ring-2 focus-within:ring-[#c3f400]/20'
        }`}
      >
        {icon && (
          <div className="pl-3.5 pr-2.5 text-[#8e9379] flex items-center justify-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`w-full bg-transparent text-[#e5e2e1] text-sm md:text-base placeholder-[#555555] py-3.5 ${
            icon ? 'pl-0' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} rounded-lg outline-none transition-colors ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 text-[#8e9379] hover:text-[#e5e2e1] p-1 rounded transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
          {error}
        </span>
      )}
    </div>
  );
};
