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
                    <div className="space-y-1 text-green-400">
                        <p>Available commands:</p>
                        <p>  <span className="text-yellow-400">about</span>       - About Muchammad Fikri Izzuddin</p>
                        <p>  <span className="text-yellow-400">skills</span>      - Technical skills breakdown</p>
                        <p>  <span className="text-yellow-400">tech-stack</span>  - Technology proficiency</p>
                        <p>  <span className="text-yellow-400">projects</span>    - Portfolio projects</p>
                        <p>  <span className="text-yellow-400">experience</span>  - Work history</p>
                        <p>  <span className="text-yellow-400">education</span>   - Educational background</p>
                        <p>  <span className="text-yellow-400">achievements</span> - Key achievements</p>
                        <p>  <span className="text-yellow-400">certifications</span> - Professional certifications</p>
                        <p>  <span className="text-yellow-400">contact</span>     - Contact information</p>
                        <p>  <span className="text-yellow-400">clear</span>       - Clear terminal</p>
                        <p>  <span className="text-yellow-400">whoami</span>      - Current user</p>
                    </div>
                );
                break;
            case 'about':
                output = (
                    <div className="space-y-2">
                        <p className="text-cyan-400 font-bold">Muchammad Fikri Izzuddin</p>
                        <p>Lead Software Engineer & Technical Architect</p>
                        <p className="text-gray-400">Passionate about building scalable systems and leading high-performance teams.</p>
                        <p className="text-gray-400">Specializing in full-stack development, system architecture, and technical leadership.</p>
                        <p className="mt-2">🎯 Focus: Microservices, Cloud Infrastructure, Team Mentorship</p>
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="grid grid-cols-2 max-w-2xl gap-2">
                        <div className="text-cyan-400">[Frontend]</div><div>React, Next.js, TypeScript, Tailwind CSS</div>
                        <div className="text-cyan-400">[Backend]</div><div>Node.js, Python, Go, Java</div>
                        <div className="text-cyan-400">[Cloud]</div><div>AWS, Docker, Kubernetes, Terraform</div>
                        <div className="text-cyan-400">[Database]</div><div>PostgreSQL, MongoDB, Redis</div>
                        <div className="text-cyan-400">[Leadership]</div><div>Agile, Mentoring, System Design, Code Review</div>
                        <div className="text-cyan-400">[Tools]</div><div>Git, CI/CD, Monitoring, Testing</div>
                    </div>
                );
                break;
            case 'tech-stack':
                output = (
                    <div className="space-y-3">
                        <div>
                            <p className="text-yellow-400">⚡ Expert Level:</p>
                            <p className="pl-4">JavaScript/TypeScript, React, Node.js, Python, AWS</p>
                        </div>
                        <div>
                            <p className="text-green-400">✓ Advanced:</p>
                            <p className="pl-4">Next.js, Docker, Kubernetes, PostgreSQL, System Design</p>
                        </div>
                        <div>
                            <p className="text-blue-400">→ Proficient:</p>
                            <p className="pl-4">Go, MongoDB, Redis, Terraform, GraphQL</p>
                        </div>
                    </div>
                );
                break;
            case 'projects':
                output = (
                    <div className="space-y-3">
                        <div>
                            <p className="text-cyan-400 font-bold">1. AI Trade Pulse (aitradepulse.com)</p>
                            <p className="pl-4 text-gray-400">Crypto trading analytics platform with ML-powered insights</p>
                            <p className="pl-4 text-sm">Tech: Python, React, AWS, TensorFlow</p>
                        </div>
                        <div>
                            <p className="text-cyan-400 font-bold">2. Berkah Karya (berkahkarya.org)</p>
                            <p className="pl-4 text-gray-400">Non-profit tech education platform</p>
                            <p className="pl-4 text-sm">Tech: Next.js, Node.js, PostgreSQL</p>
                        </div>
                        <div>
                            <p className="text-cyan-400 font-bold">3. Microservices Platform</p>
                            <p className="pl-4 text-gray-400">High-performance system serving 1M+ users</p>
                            <p className="pl-4 text-sm">Tech: Go, Kubernetes, gRPC, Redis</p>
                        </div>
                    </div>
                );
                break;
            case 'experience':
                output = (
                    <div className="space-y-3">
                        <div>
                            <p className="text-yellow-400 font-bold">Lead Software Engineer @ Tech Corp</p>
                            <p className="text-gray-400">2021 - Present</p>
                            <p className="pl-4">• Leading team of 8 engineers</p>
                            <p className="pl-4">• Architected microservices serving 1M+ users</p>
                            <p className="pl-4">• Achieved 99.9% system uptime</p>
                        </div>
                        <div>
                            <p className="text-yellow-400 font-bold">Senior Full Stack Developer @ StartupCo</p>
                            <p className="text-gray-400">2018 - 2021</p>
                            <p className="pl-4">• Built DeFi trading platform from scratch</p>
                            <p className="pl-4">• Implemented sub-millisecond latency systems</p>
                        </div>
                        <div>
                            <p className="text-yellow-400 font-bold">Software Engineer @ Innovation Labs</p>
                            <p className="text-gray-400">2016 - 2018</p>
                            <p className="pl-4">• Developed cloud infrastructure</p>
                            <p className="pl-4">• Mentored junior developers</p>
                        </div>
                    </div>
                );
                break;
            case 'education':
                output = (
                    <div className="space-y-2">
                        <div>
                            <p className="text-cyan-400 font-bold">Bachelor of Computer Science</p>
                            <p className="text-gray-400">University of Technology, 2012-2016</p>
                            <p className="pl-4">GPA: 3.8/4.0</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-yellow-400">Continuous Learning:</p>
                            <p className="pl-4">• AWS Solutions Architect</p>
                            <p className="pl-4">• Kubernetes Administrator</p>
                            <p className="pl-4">• System Design Courses</p>
                        </div>
                    </div>
                );
                break;
            case 'achievements':
                output = (
                    <div className="space-y-2">
                        <p className="text-green-400">🏆 Key Achievements:</p>
                        <p className="pl-4">✓ Scaled system to handle 1M+ concurrent users</p>
                        <p className="pl-4">✓ Reduced infrastructure costs by 40%</p>
                        <p className="pl-4">✓ Mentored 10+ developers to senior positions</p>
                        <p className="pl-4">✓ Implemented CI/CD reducing deployment time by 80%</p>
                        <p className="pl-4">✓ Led successful migration to microservices architecture</p>
                        <p className="pl-4">✓ Achieved 99.9% system uptime for 2+ years</p>
                    </div>
                );
                break;
            case 'certifications':
                output = (
                    <div className="space-y-2">
                        <p className="text-cyan-400">📜 Professional Certifications:</p>
                        <p className="pl-4">• AWS Certified Solutions Architect - Professional</p>
                        <p className="pl-4">• Certified Kubernetes Administrator (CKA)</p>
                        <p className="pl-4">• Google Cloud Professional Architect</p>
                        <p className="pl-4">• Scrum Master Certified (PSM I)</p>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div className="space-y-2">
                        <p className="text-cyan-400 font-bold">Contact Information:</p>
                        <p>📧 Email: muchammadfikriizzuddin@gmail.com</p>
                        <p>💼 LinkedIn: linkedin.com/in/muchammadfikriizzuddin</p>
                        <p>🐙 GitHub: github.com/oyi77</p>
                        <p>🌐 Portfolio: oyi77.github.io/oyi77</p>
                    </div>
                );
                break;
            case 'clear':
                setCommands([]);
                return;
            case 'whoami':
                output = 'muchammadfikriizzuddin@portfolio ~ You are viewing the portfolio of Muchammad Fikri Izzuddin';
                break;
            case '':
                output = '';
                break;
            default:
                output = `Command not found: ${trimmedCmd}. Type "help" for a list of commands.`;
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
        <div className="h-full bg-black font-mono text-sm p-4 overflow-hidden flex flex-col" onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-y-auto space-y-2">
                {commands.map((cmd, i) => (
                    <div key={i} className="space-y-1">
                        {cmd.input && (
                            <div className="flex gap-2 text-gray-400">
                                <span className="text-green-500">➜</span>
                                <span className="text-blue-400">~</span>
                                <span>{cmd.input}</span>
                            </div>
                        )}
                        <div className="text-gray-300 pl-4">{cmd.output}</div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-800">
                <span className="text-green-500">➜</span>
                <span className="text-blue-400">~</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white border-none focus:ring-0 p-0"
                    autoFocus
                />
            </div>
        </div>
    );
}
