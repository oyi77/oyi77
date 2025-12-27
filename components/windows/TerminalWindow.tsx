'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Command {
    input: string;
    output: React.ReactNode;
}

export default function TerminalWindow() {
    const [commands, setCommands] = useState<Command[]>([
        { input: '', output: 'Welcome to Captain\'s Terminal v1.0.0. Type "help" for available commands.' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [commands]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div className="space-y-1 text-retro-white/80">
                        <p>Available commands:</p>
                        <p>  <span className="text-retro-yellow font-bold">about</span>       - About Muchammad Fikri Izzuddin</p>
                        <p>  <span className="text-retro-yellow font-bold">skills</span>      - Technical skills breakdown</p>
                        <p>  <span className="text-retro-yellow font-bold">tech-stack</span>  - Technology proficiency</p>
                        <p>  <span className="text-retro-yellow font-bold">projects</span>    - Portfolio projects</p>
                        <p>  <span className="text-retro-yellow font-bold">experience</span>  - Work history</p>
                        <p>  <span className="text-retro-yellow font-bold">education</span>   - Educational background</p>
                        <p>  <span className="text-retro-yellow font-bold">achievements</span> - Key achievements</p>
                        <p>  <span className="text-retro-yellow font-bold">certifications</span> - Professional certifications</p>
                        <p>  <span className="text-retro-yellow font-bold">contact</span>     - Contact information</p>
                        <p>  <span className="text-retro-yellow font-bold">clear</span>       - Clear terminal</p>
                        <p>  <span className="text-retro-yellow font-bold">whoami</span>      - Current user</p>
                    </div>
                );
                break;
            case 'about':
                output = (
                    <div className="space-y-2">
                        <p className="text-retro-blue font-black bg-retro-blue/10 inline-block px-1">Muchammad Fikri Izzuddin</p>
                        <p className="text-retro-white font-bold">Lead Software Engineer & Technical Architect</p>
                        <p className="text-retro-white/70">Passionate about building scalable systems and leading high-performance teams.</p>
                        <p className="text-retro-white/70">Specializing in full-stack development, system architecture, and technical leadership.</p>
                        <p className="mt-2 text-retro-red font-bold">🎯 Focus: Microservices, Cloud Infrastructure, Team Mentorship</p>
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="grid grid-cols-2 max-w-2xl gap-2 border-l-2 border-retro-gray pl-2">
                        <div className="text-retro-blue font-bold">[Frontend]</div><div className="text-retro-white">React, Next.js, TypeScript, Tailwind CSS</div>
                        <div className="text-retro-blue font-bold">[Backend]</div><div className="text-retro-white">Node.js, Python, Go, Java</div>
                        <div className="text-retro-blue font-bold">[Cloud]</div><div className="text-retro-white">AWS, Docker, Kubernetes, Terraform</div>
                        <div className="text-retro-blue font-bold">[Database]</div><div className="text-retro-white">PostgreSQL, MongoDB, Redis</div>
                        <div className="text-retro-blue font-bold">[Leadership]</div><div className="text-retro-white">Agile, Mentoring, System Design, Code Review</div>
                        <div className="text-retro-blue font-bold">[Tools]</div><div className="text-retro-white">Git, CI/CD, Monitoring, Testing</div>
                    </div>
                );
                break;
            case 'tech-stack':
                output = (
                    <div className="space-y-3">
                        <div>
                            <p className="text-retro-yellow font-bold">⚡ Expert Level:</p>
                            <p className="pl-4 text-retro-white/80">JavaScript/TypeScript, React, Node.js, Python, AWS</p>
                        </div>
                        <div>
                            <p className="text-retro-blue font-bold">✓ Advanced:</p>
                            <p className="pl-4 text-retro-white/80">Next.js, Docker, Kubernetes, PostgreSQL, System Design</p>
                        </div>
                        <div>
                            <p className="text-retro-red font-bold">→ Proficient:</p>
                            <p className="pl-4 text-retro-white/80">Go, MongoDB, Redis, Terraform, GraphQL</p>
                        </div>
                    </div>
                );
                break;
            case 'projects':
                output = (
                    <div className="space-y-4">
                        <div className="bg-retro-white/5 p-2 border-l-2 border-retro-blue">
                            <p className="text-retro-blue font-black">1. AI Trade Pulse (aitradepulse.com)</p>
                            <p className="pl-4 text-retro-white/70">Crypto trading analytics platform with ML-powered insights</p>
                            <p className="pl-4 text-xs font-mono text-retro-yellow mt-1">Tech: Python, React, AWS, TensorFlow</p>
                        </div>
                        <div className="bg-retro-white/5 p-2 border-l-2 border-retro-red">
                            <p className="text-retro-red font-black">2. Berkah Karya (berkahkarya.org)</p>
                            <p className="pl-4 text-retro-white/70">Non-profit tech education platform</p>
                            <p className="pl-4 text-xs font-mono text-retro-yellow mt-1">Tech: Next.js, Node.js, PostgreSQL</p>
                        </div>
                        <div className="bg-retro-white/5 p-2 border-l-2 border-retro-yellow">
                            <p className="text-retro-yellow font-black">3. Microservices Platform</p>
                            <p className="pl-4 text-retro-white/70">High-performance system serving 1M+ users</p>
                            <p className="pl-4 text-xs font-mono text-retro-yellow mt-1">Tech: Go, Kubernetes, gRPC, Redis</p>
                        </div>
                    </div>
                );
                break;
            case 'experience':
                output = (
                    <div className="space-y-4">
                        <div>
                            <p className="text-retro-yellow font-black underline decoration-retro-red">Lead Software Engineer @ Tech Corp</p>
                            <p className="text-retro-white/60 text-xs mb-1">2021 - Present</p>
                            <p className="pl-4 text-retro-white">• Leading team of 8 engineers</p>
                            <p className="pl-4 text-retro-white">• Architected microservices serving 1M+ users</p>
                            <p className="pl-4 text-retro-white">• Achieved 99.9% system uptime</p>
                        </div>
                        <div>
                            <p className="text-retro-yellow font-black underline decoration-retro-blue">Senior Full Stack Developer @ StartupCo</p>
                            <p className="text-retro-white/60 text-xs mb-1">2018 - 2021</p>
                            <p className="pl-4 text-retro-white">• Built DeFi trading platform from scratch</p>
                            <p className="pl-4 text-retro-white">• Implemented sub-millisecond latency systems</p>
                        </div>
                        <div>
                            <p className="text-retro-yellow font-black underline decoration-white">Software Engineer @ Innovation Labs</p>
                            <p className="text-retro-white/60 text-xs mb-1">2016 - 2018</p>
                            <p className="pl-4 text-retro-white">• Developed cloud infrastructure</p>
                            <p className="pl-4 text-retro-white">• Mentored junior developers</p>
                        </div>
                    </div>
                );
                break;
            case 'education':
                output = (
                    <div className="space-y-4">
                        <div className="border-b border-retro-white/20 pb-2">
                            <p className="text-retro-blue font-black">Bachelor of Computer Science</p>
                            <p className="text-retro-white/80">University of Technology, 2012-2016</p>
                            <p className="pl-4 text-retro-yellow font-bold">GPA: 3.8/4.0</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-retro-yellow font-bold uppercase">Continuous Learning:</p>
                            <p className="pl-4 text-retro-white">• AWS Solutions Architect</p>
                            <p className="pl-4 text-retro-white">• Kubernetes Administrator</p>
                            <p className="pl-4 text-retro-white">• System Design Courses</p>
                        </div>
                    </div>
                );
                break;
            case 'achievements':
                output = (
                    <div className="space-y-2">
                        <p className="text-retro-red font-black bg-retro-red/10 inline-block px-1">🏆 Key Achievements:</p>
                        <p className="pl-4 text-retro-white">✓ Scaled system to handle 1M+ concurrent users</p>
                        <p className="pl-4 text-retro-white">✓ Reduced infrastructure costs by 40%</p>
                        <p className="pl-4 text-retro-white">✓ Mentored 10+ developers to senior positions</p>
                        <p className="pl-4 text-retro-white">✓ Implemented CI/CD reducing deployment time by 80%</p>
                        <p className="pl-4 text-retro-white">✓ Led successful migration to microservices architecture</p>
                        <p className="pl-4 text-retro-white">✓ Achieved 99.9% system uptime for 2+ years</p>
                    </div>
                );
                break;
            case 'certifications':
                output = (
                    <div className="space-y-2">
                        <p className="text-retro-blue font-bold">📜 Professional Certifications:</p>
                        <ul className="pl-4 list-disc list-inside text-retro-white">
                            <li>AWS Certified Solutions Architect - Professional</li>
                            <li>Certified Kubernetes Administrator (CKA)</li>
                            <li>Google Cloud Professional Architect</li>
                            <li>Scrum Master Certified (PSM I)</li>
                        </ul>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div className="space-y-2 bg-retro-white/10 p-4 border border-retro-white/30 rounded">
                        <p className="text-retro-yellow font-black uppercase tracking-widest mb-2">Contact Signal</p>
                        <p className="text-retro-white">📧 Email: muchammadfikriizzuddin@gmail.com</p>
                        <p className="text-retro-white">💼 LinkedIn: linkedin.com/in/muchammadfikriizzuddin</p>
                        <p className="text-retro-white">🐙 GitHub: github.com/oyi77</p>
                        <p className="text-retro-white">🌐 Portfolio: oyi77.github.io/oyi77</p>
                    </div>
                );
                break;
            case 'clear':
                setCommands([]);
                return;
            case 'whoami':
                output = <span className="text-retro-white/80">captain@grand-line ~ You are viewing the portfolio of Muchammad Fikri Izzuddin</span>;
                break;
            case '':
                output = '';
                break;
            default:
                output = <span className="text-retro-red">Command not found: {trimmedCmd}. Type &quot;help&quot; for a list of commands.</span>;
        }

        setCommands(prev => [...prev, { input: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className="h-full bg-retro-gray font-mono text-sm p-4 overflow-hidden flex flex-col text-retro-white selection:bg-retro-red selection:text-white" onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                {commands.map((cmd, i) => (
                    <div key={i} className="space-y-1">
                        {cmd.input && (
                            <div className="flex gap-2 text-retro-white/60">
                                <span className="text-retro-red font-bold">➜</span>
                                <span className="text-retro-blue font-bold">~</span>
                                <span className="text-retro-yellow">{cmd.input}</span>
                            </div>
                        )}
                        <div className="pl-4 leading-relaxed">{cmd.output}</div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 pt-2 border-t border-retro-white/20 mt-2">
                <span className="text-retro-red font-bold">➜</span>
                <span className="text-retro-blue font-bold">~</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-retro-white border-none focus:ring-0 p-0 placeholder-retro-white/30"
                    placeholder="Type command..."
                    autoFocus
                />
            </div>
        </div>
    );
}
