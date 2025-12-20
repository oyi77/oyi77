'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Zap, Anchor, Target, Award } from 'lucide-react';

interface Team {
    id: string;
    name: string;
    role: string;
    impact: string;
    size: string;
    style: string;
}

const teamData: Team[] = [
    {
        id: '1',
        name: 'Core Platform Team',
        role: 'Technical Lead',
        impact: 'Architected high-performance microservices serving 1M+ users.',
        size: '8 Engineers',
        style: 'Servant Leadership',
    },
    {
        id: '2',
        name: 'DeFi Strategy Squad',
        role: 'Lead Architect',
        impact: 'Developed algo-trading engines with sub-millisecond latency.',
        size: '5 Specialized Devs',
        style: 'High Performance',
    },
    {
        id: '3',
        name: 'Mentorship Program',
        role: 'Mentor & Advisor',
        impact: 'Guided 10+ junior developers to senior positions through active pairing.',
        size: '12 Mentees',
        style: 'Growth Mindset',
    },
];

export default function CrewWindow() {
    return (
        <div className="p-6 text-white overflow-y-auto h-full space-y-8 bg-black/40">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-onepiece-gold italic uppercase tracking-widest flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    Ship&apos;s Manifest: Leadership
                </h2>
                <div className="bg-onepiece-red px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    ACTIVE SQUADS
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamData.map((team, index) => (
                    <motion.div
                        key={team.id}
                        className="group bg-[#2a1a0f] border-2 border-[#8b4513] rounded-xl p-6 relative overflow-hidden cartoon-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, borderColor: '#FFD700' }}
                    >
                        {/* Background Texture Overlay */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-black text-onepiece-gold uppercase tracking-tighter">{team.name}</h3>
                                    <p className="text-sm text-onepiece-blue font-bold italic">{team.role}</p>
                                </div>
                                <Anchor className="w-6 h-6 text-[#8b4513] group-hover:text-onepiece-gold transition-colors" />
                            </div>

                            <div className="space-y-4">
                                <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                                    <p className="text-xs font-medium text-gray-300 leading-relaxed">
                                        <span className="text-onepiece-gold font-bold">Impact: </span>
                                        {team.impact}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#8b4513]/50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-[#8b4513] uppercase tracking-widest">Squad Size</span>
                                        <span className="text-sm font-bold text-white">{team.size}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-[#8b4513] uppercase tracking-widest">Style</span>
                                        <span className="text-sm font-bold text-onepiece-red">{team.style}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Aura */}
                        <div className="absolute inset-0 bg-onepiece-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}

                {/* Tactical Overview */}
                <motion.div
                    className="md:col-span-2 bg-gradient-to-r from-onepiece-blue/20 to-transparent border-l-4 border-onepiece-blue p-6 rounded-r-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center gap-4">
                        <Award className="w-10 h-10 text-onepiece-blue" />
                        <div>
                            <h4 className="text-lg font-black text-white uppercase italic">Management Philosophy</h4>
                            <p className="text-sm text-gray-400 mt-1">
                                &quot;My goal as a Technical Lead is to empower the team to build scalable, resilient systems while fostering a culture of continuous learning and ownership. I believe in &apos;Servant Leadership&apos;—removing blockers and enabling others to excel.&quot;
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
