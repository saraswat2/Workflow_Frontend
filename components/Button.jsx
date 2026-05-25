import React from 'react';
import { clsx as cx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge Tailwind classes cleanly
function cn(...classes) {
  return twMerge(cx(classes));
}

export default function Button({
  type = 'button',
  children,
  className,
  isLoading = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3',
        'font-medium text-white transition-all duration-300 ease-out',
        'bg-gradient-to-r from-indigo-500 hover:from-indigo-400 to-purple-600 hover:to-purple-500',
        'rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]',
        'border border-white/10 overflow-hidden',
        'disabled:opacity-70 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
      
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      )}
    </button>
  );
}
