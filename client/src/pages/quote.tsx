import { useEffect } from "react";
import { motion } from "framer-motion";
import { QuoteForm } from "@/components/QuoteForm";
import { ShieldCheck, MessageSquare } from "lucide-react";

export default function QuotePage() {
    useEffect(() => {
        document.title = "Request Free Quote — Felicio Cleaning Services";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute(
                "content",
                "Get a free professional cleaning quote from Felicio Cleaning Services. Residential and commercial cleaning in East Cobb and Woodstock, GA."
            );
        }
    }, []);

    // The QuoteForm component is built as a modal, but we'll use its internal UI 
    // or just trigger it to open immediately on this page.
    // For a better UX on a dedicated page, we'll render a non-modal version 
    // or just use the same form logic.
    
    return (
        <div className="min-h-screen pt-32 pb-20 text-white selection:bg-primary/30 bg-black">
            <article className="container mx-auto px-6 max-w-[800px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 text-primary mb-6"
                >
                    <MessageSquare size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">
                        Free Estimate
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-center"
                >
                    Request a <span className="text-primary italic">Quote</span>
                </motion.h1>

                <p className="text-center text-white/60 text-lg mb-12 max-w-xl mx-auto">
                    Fill out the form below to receive a personalized cleaning estimate within 24 hours.
                </p>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-visible">
                    {/* We provide the QuoteForm as a persistent element here */}
                    <QuoteForm isOpen={true} onClose={() => {}} isInline={true} />
                </div>

                <div className="mt-12 text-center text-white/40 text-sm flex items-center justify-center gap-2">
                    <ShieldCheck size={16} />
                    Your information is protected by our professional privacy standards.
                </div>
            </article>
        </div>
    );
}
