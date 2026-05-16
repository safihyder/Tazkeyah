'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
    const [input, setInput] = useState('');
    const { messages, append, sendMessage } = useChat() as any;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        // Using append if available, otherwise sendMessage
        if (append) {
            append({ role: 'user', content: input });
        } else if (sendMessage) {
            sendMessage({ role: 'user', content: input });
        }
        
        setInput('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <div className="max-w-3xl mx-auto p-4 pt-10">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Youth Path Guide</h1>
                    <p className="text-slate-500 dark:text-slate-400 italic">"Every effort in the right direction is a victory."</p>
                </header>

                <div className="space-y-6 pb-32">
                    {messages.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <div className="text-5xl mb-4">🌱</div>
                            <p>How can I help you on your path today?</p>
                        </div>
                    )}
                    {messages.map((m: any) => (
                        <div 
                            key={m.id} 
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div className={`
                                max-w-[85%] p-4 rounded-2xl shadow-sm
                                ${m.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-tr-none' 
                                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none'}
                            `}>
                                <div className="text-sm font-semibold mb-1 opacity-70">
                                    {m.role === 'user' ? 'You' : 'Guide'}
                                </div>
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative group">
                        <input
                            className="w-full p-4 pr-16 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl focus:outline-none focus:border-blue-500 transition-all dark:text-white"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask for guidance..."
                        />
                        <button 
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-3 top-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                        Guidance based on 'Sexual Problems of Youths'
                    </p>
                </div>
            </div>
        </div>
    );
}