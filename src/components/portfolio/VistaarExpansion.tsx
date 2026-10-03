import React from 'react';

interface VistaarExpansionProps {
  className?: string;
  width?: string;
}

export const VistaarExpansion: React.FC<VistaarExpansionProps> = ({
  className = '',
  width = 'w-48 sm:w-64',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center my-4 py-1.5 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Expanding horizontal line */}
      <div className={`relative h-[1px] ${width} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent animate-vistaar-expand origin-center" />
      </div>
      {/* Central settling point with micro-glow */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(99,102,241,0.9)] animate-vistaar-dot" />
    </div>
  );
};
