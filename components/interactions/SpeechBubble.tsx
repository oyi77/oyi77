'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SpeechBubbleProps {
  text: string;
  position: { x: number; y: number };
  visible: boolean;
  onClose: () => void;
}

export default function SpeechBubble({ 
  text, 
  position, 
  visible,
  onClose 
}: SpeechBubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-[200] bg-white rounded-lg p-3 shadow-lg border-2 border-onepiece-blue max-w-xs"
          style={{ left: position.x, top: position.y - 80 }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-text-dark font-medium">{text}</p>
          <div className="absolute bottom-0 left-4 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-onepiece-blue" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

