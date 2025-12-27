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
        <div className="p-6 md:p-8 h-full bg-tan text-retro-gray overflow-y-auto">
            <div className="flex items-center justify-between mb-8 border-b-4 border-retro-gray pb-4">
                <h2 className="text-3xl font-black italic uppercase tracking-widest flex items-center gap-3">
                    <Users className="w-8 h-8 text-retro-gray" />
                    Ship&apos;s Manifest
                </h2>
                <div className="bg-retro-red text-white px-3 py-1 text-xs font-bold font-mono border-2 border-retro-gray shadow-brutal-sm animate-pulse">
                    ACTIVE SQUADS
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamData.map((team, index) => (
                    <motion.div
                        key={team.id}
                        className="group bg-retro-white border-2 border-retro-gray p-6 relative overflow-hidden shadow-brutal hover:shadow-brutal-hover transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tighter">{team.name}</h3>
                                    <p className="text-sm text-retro-blue font-bold font-mono border-b-2 border-retro-blue inline-block">{team.role}</p>
                                </div>
                                <div className="p-2 bg-retro-gray text-white rounded-full group-hover:bg-retro-red transition-colors border-2 border-transparent group-hover:border-retro-gray">
                                    <Anchor className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-tan/50 p-3 border-l-4 border-retro-gray">
                                    <p className="text-sm font-medium leading-relaxed">
                                        <span className="font-black uppercase text-xs text-retro-gray/60 block mb-1">Impact Analysis:</span>
                                        {team.impact}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-retro-gray/20">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-retro-gray/60">Squad Size</span>
                                        <span className="text-sm font-bold">{team.size}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-retro-gray/60">Style</span>
                                        <span className="text-sm font-bold text-retro-red">{team.style}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Tactical Overview */}
                <motion.div
                    className="md:col-span-2 bg-retro-white border-4 border-retro-blue p-6 shadow-brutal-lg relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award className="w-24 h-24 text-retro-blue" />
                    </div>

                    <div className="flex items-start gap-6 relative z-10">
                        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-retro-blue text-white border-2 border-retro-gray shadow-brutal shrink-0">
                            <Award className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-retro-blue uppercase italic mb-2">Management Philosophy</h4>
                            <p className="text-base font-medium leading-relaxed text-retro-gray">
                                &quot;My goal as a Technical Lead is to empower the team to build scalable, resilient systems while fostering a culture of continuous learning and ownership. I believe in <span className="bg-retro-yellow/30 px-1 font-bold">Servant Leadership</span>—removing blockers and enabling others to excel.&quot;
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
