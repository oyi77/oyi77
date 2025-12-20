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
            icon: <Briefcase className="w-10 h-10 text-onepiece-blue" />,
            children: [
                { id: 'proj-1', name: 'AI Trade Pulse', type: 'file', icon: <Code className="w-8 h-8 text-yellow-500" />, action: handleOpenBrowser },
                { id: 'proj-2', name: 'Berkah Karya', type: 'file', icon: <Code className="w-8 h-8 text-green-500" />, action: handleOpenBrowser },
                { id: 'proj-3', name: 'Microservices Platform', type: 'file', icon: <Code className="w-8 h-8 text-blue-500" />, action: handleOpenProjects },
            ]
        },
        {
            id: 'documents',
            name: 'Documents',
            type: 'folder',
            icon: <FileText className="w-10 h-10 text-onepiece-red" />,
            children: [
                { id: 'doc-cv', name: 'Resume.pdf', type: 'file', icon: <FileText className="w-8 h-8 text-red-500" />, action: handleDownloadCV },
                { id: 'doc-profile', name: 'Profile.txt', type: 'file', icon: <FileText className="w-8 h-8 text-blue-500" />, action: handleOpenProfile },
                { id: 'doc-exp', name: 'Experience.md', type: 'file', icon: <FileText className="w-8 h-8 text-green-500" />, action: handleOpenExperience },
            ]
        },
        {
            id: 'code',
            name: 'Code',
            type: 'folder',
            icon: <Code className="w-10 h-10 text-green-600" />,
            children: [
                { id: 'code-1', name: 'GitHub Repos', type: 'file', icon: <Code className="w-8 h-8 text-gray-700" />, action: () => window.open('https://github.com/oyi77', '_blank') },
                { id: 'code-2', name: 'Portfolio Site', type: 'file', icon: <Code className="w-8 h-8 text-purple-500" />, action: handleOpenBrowser },
            ]
        },
        {
            id: 'skills',
            name: 'Skills & Stats',
            type: 'folder',
            icon: <Award className="w-10 h-10 text-onepiece-gold" />,
            children: [
                { id: 'stats-1', name: 'Tactical Map', type: 'file', icon: <ImageIcon className="w-8 h-8 text-purple-500" />, action: handleOpenStats },
                { id: 'stats-2', name: 'Tech Stack', type: 'file', icon: <Award className="w-8 h-8 text-yellow-500" />, action: handleOpenStats },
            ]
        },
    ];

    const getCurrentItems = () => {
        // Simplified navigation for now - typically involves traversing the tree based on currentPath
        // For this MVP, we just show root items. Real path traversal can be added if needed.
        return fileSystem;
    };

    return (
        <div className="h-full bg-white flex flex-col text-gray-800 font-sans text-sm">
            {/* Address Bar */}
            <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500" disabled>
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500" disabled>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm flex items-center gap-1">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span>My PC</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span>Root</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {getCurrentItems().map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col items-center gap-2 p-2 rounded hover:bg-blue-100 cursor-pointer transition-colors"
                            onDoubleClick={item.action}
                        >
                            <div className="relative group-hover:scale-105 transition-transform">
                                {item.icon || (item.type === 'folder' ? <Folder className="w-10 h-10 text-yellow-400" /> : <FileText className="w-10 h-10 text-gray-400" />)}
                            </div>
                            <span className="text-center text-xs font-medium truncate w-full px-1">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Bar */}
            <div className="p-1 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between px-2">
                <span>{getCurrentItems().length} items</span>
            </div>
        </div>
    );
}
