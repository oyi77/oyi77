'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  onCommand: (command: string) => string[];
  prompt?: string;
}

export default function Terminal({ onCommand, prompt = '$' }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
    { type: 'output', content: 'Welcome to Projects Terminal. Type "help" for available commands.' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const command = currentInput.trim();
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    // Add input to history
    setHistory((prev) => [...prev, { type: 'input', content: command }]);

    // Execute command and add output
    const output = onCommand(command);
    if (command.toLowerCase() === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        ...output.map((line): { type: 'input' | 'output'; content: string } => ({ type: 'output' as const, content: line })),
      ]);
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 font-mono text-sm">
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 text-green-400"
        style={{ maxHeight: 'calc(100% - 60px)' }}
      >
        {history.map((item, index) => (
          <div key={index} className={item.type === 'input' ? 'text-cyan-400' : 'text-green-400'}>
            {item.type === 'input' && <span className="text-neon-cyan">{prompt} </span>}
            {item.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-cyan-500/20 p-4">
        <div className="flex items-center gap-2">
          <span className="text-neon-cyan">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-cyan-400"
            autoFocus
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-neon-cyan animate-cursor-blink" />
        </div>
      </form>
    </div>
  );
}

