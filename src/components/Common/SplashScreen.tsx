import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import NamasteLogo from '../../assets/Untitled design (2).svg';

interface SplashScreenProps {
  isLoading: boolean;
}

export const SplashScreen = ({ isLoading }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      // 1. Initial State - Only for elements that exist
      if (footerRef.current) gsap.set(footerRef.current, { y: 20, opacity: 0 });
      if (logoRef.current) gsap.set(logoRef.current, { scale: 0.5, opacity: 0, z: -100, filter: "blur(10px)" });

      // 2. Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2 }});

      if (logoRef.current) {
        tl.to(logoRef.current, { 
          scale: 1, 
          opacity: 1, 
          z: 0, 
          filter: "blur(0px)",
          delay: 0.3,
          ease: "back.out(1.7)" // Adds a slight bounce for that "to the front" feel
        });
      }

      if (footerRef.current) {
        tl.to(footerRef.current, { y: 0, opacity: 1 }, "-=1");
      }

      // 3. Floating Animation for Logo
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: "-=15",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // 4. Aurora Background Glows
      gsap.to(".aurora-glow", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div 
      ref={containerRef}
      className={`
        fixed inset-0 z-10000 flex flex-col justify-between p-8 md:p-12
        bg-[#0a0a0a] text-[#e4e4e4] overflow-hidden
        transition-transform duration-1200 ease-[cubic-bezier(0.87,0,0.13,1)]
        ${!isLoading ? '-translate-y-full' : 'translate-y-0'}
      `}
      style={{ perspective: '1000px' }}
    >
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-glow absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full"></div>
        <div className="aurora-glow absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)]"></div>
      </div>

      {/* Center/Main Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center z-10">
        <div ref={logoRef} className="mb-10 relative">
            <img 
                src={NamasteLogo} 
                alt="Namaste PMS Logo" 
                className="w-48 md:w-72 h-auto relative z-10"
            />
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; scale: 1; }
          50% { opacity: 0.5; scale: 1.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
