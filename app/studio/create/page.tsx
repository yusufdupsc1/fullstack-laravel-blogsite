/**
 * Author: Yusuf Ali
 * GitHub: https://github.com/yusufdupsc1
 * 
 * Studio Create Page - Server Component Wrapper
 */

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StudioEditor } from '@/components/studio/StudioEditor';

export default function StudioCreatePage() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex flex-col pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/">
                            <ArrowLeft className="w-5 h-5 text-zinc-500" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-50">The Studio</h1>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Create New Narrative</p>
                    </div>
                </div>
            </div>

            {/* Editor Component */}
            <StudioEditor />
        </div>
    );
}
