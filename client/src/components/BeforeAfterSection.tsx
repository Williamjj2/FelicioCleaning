import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ImagePair {
    id: number;
    before: string;
    after: string;
    category: string;
    title: string;
    enabled?: boolean;
}

interface BeforeAfterSectionProps {
    items?: ImagePair[];
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ items = [] }) => {
    const [pairs, setPairs] = useState<ImagePair[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (items && items.length > 0) {
            const enabledPairs = items.filter((p: ImagePair) => p.enabled !== false);
            setPairs(enabledPairs);
            setLoading(false);
        } else {
            setPairs([]);
            setLoading(false);
        }
    }, [items]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = pairs.length - 1;
            if (nextIndex >= pairs.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const currentPair = pairs[currentIndex];

    // Get visible pairs for grid view (show 3 at a time on desktop)
    const getVisiblePairs = () => {
        if (pairs.length === 0) return [];

        // If we have fewer than 3 pairs, show exactly what we have without duplication
        if (pairs.length < 3) {
            return pairs.map((p, i) => ({ ...p, displayIndex: i }));
        }

        const visiblePairs = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % pairs.length;
            visiblePairs.push({ ...pairs[index], displayIndex: i });
        }
        return visiblePairs;
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        })
    };

    // Loading state
    if (loading) {
        return (
            <section id="before-after" className="py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
                <div className="container mx-auto px-6 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                </div>
            </section>
        );
    }

    // Empty state - don't render section if no pairs
    if (pairs.length === 0) {
        return null;
    }

    return (
        <section id="before-after" className="py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Real Results</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        See The <span className="text-primary">Transformation</span>
                    </h2>
                    <p className="text-lg text-white/60">
                        Drag the slider to reveal the incredible difference our professional cleaning makes.
                        These are real homes, real results.
                    </p>
                </motion.div>

                {/* Main Slider Display - Mobile */}
                <div className="lg:hidden mb-8">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <BeforeAfterSlider
                                beforeImage={currentPair?.before}
                                afterImage={currentPair?.after}
                                category={currentPair?.category}
                            />
                            <div className="text-center mt-4">
                                <h3 className="text-xl font-bold">{currentPair?.title}</h3>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Mobile Navigation */}
                    {pairs.length > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={() => paginate(-1)}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary hover:text-white border border-white/20 flex items-center justify-center transition-all active:scale-95"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <div className="text-sm font-bold">
                                {currentIndex + 1} / {pairs.length}
                            </div>
                            <button
                                onClick={() => paginate(1)}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary hover:text-white border border-white/20 flex items-center justify-center transition-all active:scale-95"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Desktop Grid View */}
                <div className="hidden lg:block">
                    <div className={`grid gap-6 mb-8 ${pairs.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
                        pairs.length === 2 ? 'grid-cols-2 max-w-5xl mx-auto' :
                            'grid-cols-3'
                        }`}>
                        {getVisiblePairs().map((pair, idx) => (
                            <motion.div
                                key={`${pair.id}-${idx}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <BeforeAfterSlider
                                    beforeImage={pair.before}
                                    afterImage={pair.after}
                                    category={pair.category}
                                />
                                <div className="text-center mt-4">
                                    <h3 className="text-lg font-bold">{pair.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Navigation */}
                    {pairs.length > 3 && (
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => paginate(-3)}
                                className="px-6 py-3 rounded-full bg-white/10 hover:bg-primary hover:text-white border border-white/20 flex items-center gap-2 transition-all font-bold active:scale-95"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>
                            <div className="flex gap-2">
                                {Array.from({ length: Math.ceil(pairs.length / 3) }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setDirection(i * 3 > currentIndex ? 1 : -1);
                                            setCurrentIndex(i * 3);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all ${Math.floor(currentIndex / 3) === i
                                            ? 'bg-primary w-8'
                                            : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => paginate(3)}
                                className="px-6 py-3 rounded-full bg-white/10 hover:bg-primary hover:text-white border border-white/20 flex items-center gap-2 transition-all font-bold active:scale-95"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { number: "500+", label: "Homes Transformed" },
                        { number: "100%", label: "Satisfaction Rate" },
                        { number: "10+", label: "Years Experience" },
                        { number: "5★", label: "Google Rating" }
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.number}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-white/50">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="tel:+17704077858"
                        className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-black text-lg transition-all shadow-2xl shadow-primary/30 hover:scale-105"
                    >
                        Get Your Free Quote Today
                        <ChevronRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default BeforeAfterSection;
