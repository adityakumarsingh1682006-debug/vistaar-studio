import React, { createContext, useContext, useState, useEffect } from 'react';
import { RoutePath } from '../types';

interface NavigationContextType {
  currentPath: RoutePath;
  navigateTo: (path: RoutePath | string, hash?: string) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: 'default' | 'pointer' | 'view' | 'explore' | 'drag';
  setCursorVariant: (variant: 'default' | 'pointer' | 'view' | 'explore' | 'drag') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname as RoutePath;
      if (['/gym', '/restaurant', '/salon', '/boutique', '/real-estate'].includes(path)) {
        return path;
      }
    }
    return '/';
  });

  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'view' | 'explore' | 'drag'>('default');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as RoutePath;
      if (['/gym', '/restaurant', '/salon', '/boutique', '/real-estate', '/'].includes(path)) {
        setCurrentPath(path);
      } else {
        setCurrentPath('/');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: RoutePath | string, hash?: string) => {
    if (path.startsWith('#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/' + path);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(path.slice(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(path.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const cleanPath = path as RoutePath;
    window.history.pushState({}, '', cleanPath + (hash ? `#${hash}` : ''));
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigateTo,
        cursorText,
        setCursorText,
        cursorVariant,
        setCursorVariant,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
