'use client';

import { useState } from 'react';
import { Folder, FileText, ChevronRight, Image as ImageIcon, Briefcase, Award, Code } from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';

interface FileSystemItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    icon?: React.ReactNode;
    children?: FileSystemItem[];
    action?: () => void;
}

export default function FileManagerWindow() {
    const { openWindow } = useWindowStore();
    const [currentPath, setCurrentPath] = useState<string[]>(['root']);

    const handleOpenProfile = () => openWindow('profile');
    const handleOpenProjects = () => openWindow('logpose');
    const handleOpenExperience = () => openWindow('bounty');
    const handleOpenStats = () => openWindow('tactical');
    const handleOpenBrowser = () => openWindow('browser');
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/assets/cv/resume.pdf';
        link.download = 'Fikri_Izzuddin_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const fileSystem: FileSystemItem[] = [
        {
            id: 'projects',
            name: 'Projects',
            type: 'folder',
            icon: <Briefcase className="w-10 h-10 text-retro-blue" />,
            children: [
                { id: 'proj-1', name: 'AI Trade Pulse', type: 'file', icon: <Code className="w-8 h-8 text-retro-yellow" />, action: handleOpenBrowser },
                { id: 'proj-2', name: 'Berkah Karya', type: 'file', icon: <Code className="w-8 h-8 text-green-600" />, action: handleOpenBrowser },
                { id: 'proj-3', name: 'Microservices Platform', type: 'file', icon: <Code className="w-8 h-8 text-retro-blue" />, action: handleOpenProjects },
            ]
        },
        {
            id: 'documents',
            name: 'Documents',
            type: 'folder',
            icon: <FileText className="w-10 h-10 text-retro-red" />,
            children: [
                { id: 'doc-cv', name: 'Resume.pdf', type: 'file', icon: <FileText className="w-8 h-8 text-retro-red" />, action: handleDownloadCV },
                { id: 'doc-profile', name: 'Profile.txt', type: 'file', icon: <FileText className="w-8 h-8 text-retro-blue" />, action: handleOpenProfile },
                { id: 'doc-exp', name: 'Experience.md', type: 'file', icon: <FileText className="w-8 h-8 text-retro-yellow" />, action: handleOpenExperience },
            ]
        },
        {
            id: 'code',
            name: 'Code',
            type: 'folder',
            icon: <Code className="w-10 h-10 text-retro-gray" />,
            children: [
                { id: 'code-1', name: 'GitHub Repos', type: 'file', icon: <Code className="w-8 h-8 text-retro-gray" />, action: () => window.open('https://github.com/oyi77', '_blank') },
                { id: 'code-2', name: 'Portfolio Site', type: 'file', icon: <Code className="w-8 h-8 text-purple-600" />, action: handleOpenBrowser },
            ]
        },
        {
            id: 'skills',
            name: 'Skills & Stats',
            type: 'folder',
            icon: <Award className="w-10 h-10 text-retro-yellow" />,
            children: [
                { id: 'stats-1', name: 'Tactical Map', type: 'file', icon: <ImageIcon className="w-8 h-8 text-retro-blue" />, action: handleOpenStats },
                { id: 'stats-2', name: 'Tech Stack', type: 'file', icon: <Award className="w-8 h-8 text-retro-yellow" />, action: handleOpenStats },
            ]
        },
    ];

    const getCurrentItems = () => {
        // Simplified navigation for now - typically involves traversing the tree based on currentPath
        // For this MVP, we just show root items. Real path traversal can be added if needed.
        return fileSystem;
    };

    return (
        <div className="h-full bg-tan flex flex-col text-retro-gray font-sans text-sm">
            {/* Address Bar */}
            <div className="flex items-center gap-2 p-2 border-b-2 border-retro-gray bg-retro-white">
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-retro-gray hover:text-white rounded border border-transparent hover:border-retro-gray transition-colors text-retro-gray disabled:opacity-50" disabled>
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button className="p-1 hover:bg-retro-gray hover:text-white rounded border border-transparent hover:border-retro-gray transition-colors text-retro-gray disabled:opacity-50" disabled>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 bg-white border-2 border-retro-gray shadow-brutal-sm px-3 py-1 text-sm flex items-center gap-1 font-mono">
                    <Folder className="w-4 h-4 text-retro-blue" />
                    <span className="font-bold">My PC</span>
                    <ChevronRight className="w-4 h-4 text-retro-gray/50" />
                    <span className="font-bold">Root</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                    {getCurrentItems().map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col items-center gap-3 p-4 bg-retro-white border-2 border-transparent hover:border-retro-gray hover:shadow-brutal cursor-pointer transition-all rounded-none"
                            onDoubleClick={item.action}
                        >
                            <div className="relative group-hover:scale-110 transition-transform">
                                {item.icon || (item.type === 'folder' ? <Folder className="w-12 h-12 text-retro-yellow" /> : <FileText className="w-12 h-12 text-retro-gray" />)}
                            </div>
                            <span className="text-center text-sm font-bold font-mono truncate w-full px-1">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Bar */}
            <div className="p-2 border-t-2 border-retro-gray bg-retro-white text-xs font-bold font-mono text-retro-gray/80 flex justify-between px-3">
                <span>{getCurrentItems().length} items</span>
                <span>Ready</span>
            </div>
        </div>
    );
}
