import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-bold tracking-tight rounded-lg transition-all duration-200 select-none py-3.5 px-6 text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99]';

  const variantStyles = {
    primary:
      'bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-extrabold shadow-[0_0_20px_rgba(195,244,0,0.25)] hover:shadow-[0_0_30px_rgba(195,244,0,0.45)]',
    secondary:
      'bg-[#201f1f] hover:bg-[#2a2a2a] text-[#e5e2e1] border border-[#333333] hover:border-[#555555]',
    outline:
      'bg-transparent border border-[#c3f400] text-[#c3f400] hover:bg-[#c3f400]/10',
    ghost:
      'bg-transparent text-[#e5e2e1] hover:text-white hover:bg-white/5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={18} />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-1">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        </span>
      )}
    </button>
  );
};
