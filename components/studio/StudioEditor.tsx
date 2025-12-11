'use client';

/**
 * Author: Yusuf Ali
 * GitHub: https://github.com/yusufdupsc1
 * 
 * Studio Editor - Client Component for Interactive Editing
 */

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function StudioEditor() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/api/posts', { title, content });
            toast.success('Story published successfully!', {
                description: 'Your narrative is now live for the world to see.',
            });
            setTimeout(() => router.push('/'), 800);
        } catch (error) {
            console.error(error);
            toast.error('Failed to publish', {
                description: 'Something went wrong. Please try again.',
            });
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Editor Column */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6"
                >
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter a captivating headline..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-3xl md:text-4xl font-serif font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 bg-transparent h-auto py-2"
                            autoFocus
                        />
                        <div className="relative flex-grow h-full">
                            <Textarea
                                placeholder="Tell your story... (Markdown supported)"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-[60vh] resize-none border-none p-0 focus-visible:ring-0 text-lg font-mono text-zinc-600 dark:text-zinc-300 leading-relaxed bg-transparent shadow-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Preview Column */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="hidden lg:block bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 overflow-y-auto max-h-[calc(100vh-12rem)]"
                >
                    <div className="flex items-center gap-2 text-zinc-400 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-widest">Live Preview</span>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none font-serif">
                        <h1>{title || "Untitled Story"}</h1>
                        {content ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-zinc-400 italic">Start typing to see your content appear here...</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl z-[60] flex justify-end gap-4 items-center">
                <span className="text-xs text-zinc-400 mr-auto ml-1 font-mono hidden sm:block">
                    {content.split(/\s+/).filter(w => w.length > 0).length} words
                </span>
                <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900" onClick={() => router.push('/')}>
                    Discard
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading || !title || !content} className="rounded-full px-8 py-6 text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                    Publish Narrative
                </Button>
            </div>
        </>
    );
}
