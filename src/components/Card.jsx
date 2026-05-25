import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export default function Card({ children, className, hoverEffect = false, ...props }) {
  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-[2rem] p-6 md:p-10',
          'bg-[#0c0c0c]/80 backdrop-blur-2xl border border-white/[0.08]',
          'shadow-2xl overflow-hidden',
          hoverEffect && 'transition-all duration-300 hover:border-white/20 hover:-translate-y-1',
          className
        )
      )}
      {...props}
    >
      {/* Top subtle highlight simulating light reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Content wrapper to ensure z-index above absolute decorations if added */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
