import type { CSSProperties } from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'sm',
  className = '' 
}: BadgeProps) {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'var(--font-bold)',
    borderRadius: 'var(--radius-sm)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };
  
  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      padding: '2px var(--space-2)',
      fontSize: '10px',
    },
    md: {
      padding: 'var(--space-1) var(--space-2)',
      fontSize: 'var(--text-xs)',
    },
  };
  
  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: 'rgba(0, 200, 83, 0.15)',
      color: 'var(--color-primary)',
    },
    accent: {
      background: 'rgba(255, 214, 0, 0.15)',
      color: 'var(--color-accent)',
    },
    success: {
      background: 'rgba(0, 200, 83, 0.15)',
      color: 'var(--color-success)',
    },
    warning: {
      background: 'rgba(255, 171, 0, 0.15)',
      color: 'var(--color-warning)',
    },
    error: {
      background: 'rgba(255, 61, 0, 0.15)',
      color: 'var(--color-error)',
    },
    neutral: {
      background: 'var(--bg-elevated)',
      color: 'var(--text-secondary)',
    },
  };
  
  return (
    <span
      className={`badge badge-${variant} ${className}`}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
