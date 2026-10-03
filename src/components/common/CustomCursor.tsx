import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useNavigation();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], [data-cursor="pointer"]')
        );
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing animation loop
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const hasCustomText = Boolean(cursorText);

  return (
    <>
      {/* Precision core dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          opacity: hasCustomText ? 0 : 1,
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-150 ease-out ${
            isPointer ? 'w-2 h-2 opacity-50' : 'w-1.5 h-1.5 opacity-90'
          }`}
        />
      </div>

      {/* Trailing interactive halo / badge */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {hasCustomText ? (
          <div className="px-3.5 py-1.5 bg-white text-[#090A0D] font-display font-bold text-[11px] tracking-wider uppercase rounded-full shadow-2xl shadow-black/80 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
            <span>{cursorText}</span>
            <span className="text-[13px] leading-none">↗</span>
          </div>
        ) : (
          <div
            className={`rounded-full border border-white/30 transition-all duration-300 ease-out ${
              cursorVariant === 'view' || cursorVariant === 'explore'
                ? 'w-14 h-14 bg-white/10 backdrop-blur-[2px] border-white/60'
                : isPointer
                ? 'w-10 h-10 border-white/50 bg-white/5'
                : 'w-7 h-7'
            }`}
          />
        )}
      </div>
    </>
  );
};
