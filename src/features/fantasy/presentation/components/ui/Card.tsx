import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive';
  onClick?: () => void;
  style?: CSSProperties;
}

export function Card({ children, className = '', variant = 'default', onClick, style }: CardProps) {
  const baseStyles: CSSProperties = {
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-primary)',
    overflow: 'hidden',
    transition: 'all var(--transition-fast)',
  };
  
  const variants: Record<string, CSSProperties> = {
    default: {},
    elevated: {
      background: 'var(--bg-tertiary)',
      boxShadow: 'var(--shadow-md)',
    },
    interactive: {
      cursor: 'pointer',
    },
  };
  
  return (
    <div
      className={`card card-${variant} ${className}`}
      style={{ ...baseStyles, ...variants[variant], ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Sub-componentes para estructura consistente

Card.Header = function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4)',
        borderBottom: '1px solid var(--border-primary)',
      }}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ 
  children, 
  className = '',
  padding = 'normal',
}: { 
  children: ReactNode; 
  className?: string;
  padding?: 'none' | 'normal' | 'large';
}) {
  const paddingMap = {
    none: 0,
    normal: 'var(--space-4)',
    large: 'var(--space-6)',
  };
  
  return (
    <div 
      className={className}
      style={{ padding: paddingMap[padding] }}
    >
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-3) var(--space-4)',
        borderTop: '1px solid var(--border-primary)',
        background: 'var(--bg-tertiary)',
      }}
    >
      {children}
    </div>
  );
};
