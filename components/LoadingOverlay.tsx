'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  onComplete: () => void;
}

export default function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Array<{ id: number; x: number }>>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const obstacleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const lastObstacleTimeRef = useRef(0);

  // Track actual loading progress
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let checkCompleteInterval: NodeJS.Timeout;

    // Simulate progress (for UX)
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // Cap at 95% until actually loaded
        return prev + Math.random() * 10 + 3;
      });
    };

    progressInterval = setInterval(updateProgress, 150);

    // Check if page is actually loaded
    const checkComplete = () => {
      if (document.readyState === 'complete' && window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        // Wait for resources to load or minimum time
        const minLoadTime = 800; // Minimum 800ms for better UX
        const elapsed = Date.now() - perfData.navigationStart;
        
        if (elapsed >= minLoadTime && document.readyState === 'complete') {
          setProgress(100);
          clearInterval(progressInterval);
          clearInterval(checkCompleteInterval);
          
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onComplete();
            }, 500);
          }, 300);
        }
      }
    };

    // Check every 100ms
    checkCompleteInterval = setInterval(checkComplete, 100);

    // Also listen for load event
    const handleLoad = () => {
      setTimeout(() => {
        setProgress(100);
        clearInterval(progressInterval);
        clearInterval(checkCompleteInterval);
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkCompleteInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  // Jump handler
  const handleJump = useCallback(() => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 400);
    setScore((prev) => prev + 1);
  }, [isJumping]);

  // Game loop - lightweight animation
  useEffect(() => {
    if (isComplete) return;

    let lastTime = Date.now();
    const gameLoop = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      
      // Spawn obstacles every 2 seconds
      if (now - lastObstacleTimeRef.current > 2000) {
        lastObstacleTimeRef.current = now;
        setObstacles((prev) => {
          // Limit obstacles to 3 max for performance
          if (prev.length >= 3) return prev;
          return [...prev, { id: obstacleIdRef.current++, x: 100 }];
        });
      }

      // Move obstacles (only update if delta is reasonable)
      if (delta < 100) {
        setObstacles((prev) =>
          prev
            .map((obs) => ({ ...obs, x: obs.x - 2 }))
            .filter((obs) => obs.x > -10)
        );
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isComplete]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#f4e4bc] flex flex-col items-center justify-center"
          onClick={handleJump}
        >
          {/* Simple Dino Game */}
          <div className="relative w-full max-w-md h-64 mb-8 overflow-hidden">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#8b4513] to-[#d4a574] border-t-4 border-[#654321]" />
            
            {/* Ground line */}
            <div className="absolute bottom-16 left-0 right-0 h-1 bg-[#654321]" />

            {/* Dino Character */}
            <motion.div
              className="absolute bottom-16 left-20 w-12 h-16"
              animate={{
                y: isJumping ? -60 : 0,
              }}
              transition={{
                type: 'easeOut',
                duration: 0.4,
              }}
            >
              <div className="relative w-full h-full">
                {/* Simple dino shape */}
                <div className="absolute inset-0 bg-[#2d5016] rounded-t-lg" />
                <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full" />
                <div className="absolute bottom-0 left-4 w-6 h-4 bg-[#1a3009] rounded-b" />
                <div className="absolute bottom-0 right-2 w-4 h-4 bg-[#1a3009] rounded-b" />
              </div>
            </motion.div>

            {/* Obstacles */}
            {obstacles.map((obs) => (
              <motion.div
                key={obs.id}
                className="absolute bottom-16 w-6 h-12 bg-[#8b0000] rounded-t"
                style={{ left: `${obs.x}%` }}
              >
                <div className="absolute top-2 left-1 right-1 h-2 bg-[#ff0000] rounded" />
              </motion.div>
            ))}

            {/* Instructions */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-sm text-[#2d5016] font-bold mb-1">
                Press SPACE or Click to Jump!
              </p>
              <p className="text-xs text-[#654321]">Score: {score}</p>
            </div>
          </div>

          {/* Loading Progress */}
          <div className="w-full max-w-md px-8">
            <div className="mb-2 flex justify-between text-sm text-[#2d5016] font-bold">
              <span>Loading Portfolio...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-[#d4a574] rounded-full overflow-hidden border-2 border-[#8b4513]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2d5016] to-[#4a7c1f]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Loading text animation */}
          <motion.p
            className="mt-6 text-sm text-[#654321] font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Preparing your adventure...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

