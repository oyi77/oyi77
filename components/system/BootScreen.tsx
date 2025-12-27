'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
    onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const bootSequence = [
            'PAIJO BIOS v1.0.5 (c) 2024 Paijo Corp.',
            'CPU: AMD Paijo 9 5950X 16-Core Processor',
            'Mem Check: 65536KB OK',
            'Detecting Primary Master ... PAIJO-SSD-1TB',
            'Detecting Primary Slave  ... None',
            'Detecting Secondary Master ... CD-ROM',
            'Initialize USB Controllers ... Done',
            'Loading OS ................. Done',
            'Mounting File System ....... Done',
            'Starting System Services ... OK',
            'Initializing Graphical Interface...',
        ];

        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines((prev) => [...prev, line]);
                if (index === bootSequence.length - 1) {
                    setTimeout(() => setShowLogo(true), 500);
                }
            }, delay);
        });
    }, []);

    return (
        <motion.div
            className="fixed inset-0 bg-black z-[100] font-mono p-8 text-retro-white cursor-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="max-w-4xl mx-auto space-y-1">
                {lines.map((line, i) => (
                    <div key={i} className="text-sm md:text-base opacity-80">
                        {line}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>

            <AnimatePresence>
                {showLogo && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onAnimationComplete={() => setTimeout(onComplete, 1500)}
                    >
                        <div className="text-center space-y-4">
                            <pre className="text-xs md:text-sm leading-none text-retro-yellow font-bold">
                                {`
    ____  ___    _____________  ____  _____
   / __ \\/   |  /  _/  _/ __ \\/ __ \\/ ___/
  / /_/ / /| |  / / / // / / / / / /\\__ \\ 
 / ____/ ___ |_/ /_/ // /_/ / /_/ /___/ / 
/_/   /_/  |_/___/___/\\____/\\____//____/  
`}
                            </pre>
                            <div className="text-retro-white animate-pulse mt-8">
                                SYSTEM READY...
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
