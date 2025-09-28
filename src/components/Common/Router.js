import React from 'react';

export function Router({ children }) {
  return children;
}

export function Link({ to, children, className, style, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    // Dispatch custom event for navigation
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: to } }));
  };
  
  return (
    <a href={`#${to}`} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}