import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Camera,
    X,
    Maximize2,
    Phone,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            const { data, error } = await supabase
                .from('site_content')
                .select('content')
                .single();

            if (error) {
                console.error("Failed to load portfolio:", error);
            } else if (data?.content?.portfolio && Array.isArray(data.content.portfolio)) {
                setImages(data.content.portfolio);
            }
        };

        fetchPortfolio();
    }, []);

    const tabs = ["All", "Residential", "Commercial", "Deep Clean"];

    const filteredImages = activeTab === "All"
        ? images
        : images.filter(img => img.category === activeTab);

    return (
        <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
            {/* Hero */}
            <section className="container mx-auto px-6 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 text-primary mb-6"
                >
                    <Camera size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Visual Portfolio</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.9]"
                >
                    See Our <br /><span className="text-primary italic">Results.</span>
                </motion.h1>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-12 bg-white/5 p-4 rounded-3xl border border-white/10 max-w-2xl mx-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </section>

            {/* Pinterest Grid */}
            <section className="container mx-auto px-6">
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.length > 0 ? filteredImages.map((img) => (
                            <motion.div
                                layout
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setSelectedImage(img)}
                                className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/5 break-inside-avoid"
                            >
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-[8px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-4 inline-block">
                                            {img.category}
                                        </span>
                                        <h3 className="text-xl font-black uppercase leading-tight">{img.title}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-white/60">
                                            <Maximize2 size={16} />
                                            <span className="text-[10px] uppercase font-bold tracking-widest">Enlarge Photo</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="text-center w-full py-12 text-white/40 col-span-full">
                                No images found in this category.
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20 bg-background/95 backdrop-blur-2xl"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-10 right-10 text-white/40 hover:text-white group z-10"
                        >
                            <X size={48} className="group-hover:rotate-90 transition-transform" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative max-w-6xl w-full h-full flex flex-col md:flex-row items-center gap-12"
                        >
                            <div className="flex-grow h-full bg-white/5 rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
                                <img src={selectedImage.url} className="w-full h-full object-cover" alt={selectedImage.title} />
                            </div>

                            <div className="md:w-1/3 shrink-0">
                                <div className="flex items-center gap-3 text-primary mb-6">
                                    <CheckCircle2 size={24} />
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">Verified Final Result</span>
                                </div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">{selectedImage.title}</h2>
                                <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                                    Professional execution of our {selectedImage.category.toLowerCase()} protocol.
                                    Every corner meticulously inspected and verified according to Felicio Standards.
                                </p>

                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 mb-12">
                                    <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">Location Service</p>
                                    <p className="text-xl font-bold italic">Cobb & Cherokee Area</p>
                                </div>

                                <a href="tel:+17704077858">
                                    <Button className="w-full h-20 rounded-[2rem] bg-primary text-white font-black text-xl hover:bg-primary/90 flex items-center justify-center gap-4 group">
                                        I want this <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer CTA */}
            <section className="container mx-auto px-6 mt-32 text-center">
                <div className="p-20 bg-white/5 border border-primary/20 rounded-[4rem] relative overflow-hidden group">
                    <Sparkles className="text-primary mx-auto mb-8 animate-pulse" size={48} />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Want results like these <br />in your home?</h2>
                    <p className="text-white/40 text-xl font-light mb-12 max-w-2xl mx-auto">
                        Join our list of 500+ satisfied clients. We offer the most meticulous cleaning experience in Georgia.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <a href="tel:+17704077858">
                            <Button size="lg" className="h-24 px-16 rounded-[2rem] bg-primary text-white font-black text-3xl shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                                <Phone size={32} className="mr-4" /> (770) 407-7858
                            </Button>
                        </a>
                        <div className="text-left">
                            <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">Book Today</p>
                            <p className="text-xl font-black italic">Free Quote In 5 Minutes</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
