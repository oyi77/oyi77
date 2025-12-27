'use client';

import { Ghost, Cpu, Terminal, CircuitBoard } from 'lucide-react';
import Character2D from '@/components/2d/Character2D';
import { motion } from 'framer-motion';

export default function DesktopGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-tan overflow-hidden select-none">
      {/* Background PostHog-style Grid */}
      <div className="absolute inset-0 bg-tan bg-dot-grid bg-[length:20px_20px] opacity-100" />

      {/* Retro Watermarks - Stamped on background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        {/* Top Left - Large Ghost */}
        <div className="absolute -top-20 -left-20 transform -rotate-12">
          <Ghost size={600} className="text-retro-gray" strokeWidth={1} />
        </div>

        {/* Bottom Right - CPU */}
        <div className="absolute -bottom-32 -right-32 transform rotate-12">
          <Cpu size={500} className="text-retro-gray" strokeWidth={1} />
        </div>

        {/* Center - Circuit Board Pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
          <CircuitBoard size={800} className="text-retro-gray" strokeWidth={0.5} />
        </div>
      </div>

      {/* Stronger Vignette & Paper Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* The Captain Mascot */}
      <div className="fixed bottom-24 right-10 md:right-20 z-0 pointer-events-auto">
        <Character2D
          character="captain"
          size="lg"
          variant="idle"
          animated={true}
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="relative z-40 h-full">
        {children}
      </div>
    </div>
  );
}
