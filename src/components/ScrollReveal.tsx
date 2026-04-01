import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerStart?: string;
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'slideUp',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  triggerStart = 'top 85%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger > 0 ? { each: stagger } : undefined,
    };

    switch (variant) {
      case 'slideUp':
        from.y = 50;
        to.y = 0;
        break;
      case 'slideLeft':
        from.x = 80;
        to.x = 0;
        break;
      case 'slideRight':
        from.x = -80;
        to.x = 0;
        break;
      case 'scale':
        from.scale = 0.85;
        to.scale = 1;
        break;
      case 'fade':
      default:
        break;
    }

    const targets = stagger > 0 ? ref.current.children : ref.current;

    const tween = gsap.fromTo(targets, from, {
      ...to,
      scrollTrigger: {
        trigger: ref.current,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      // Only kill THIS component's ScrollTrigger, not all of them
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [variant, delay, duration, stagger, triggerStart]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
