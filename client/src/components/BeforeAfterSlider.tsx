import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    category?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    category = "Cleaning"
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    }, []);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    return (
        <div className="relative group">
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                {category}
            </div>

            {/* Main Slider Container */}
            <div
                ref={containerRef}
                className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-2xl"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                {/* After Image (Background) */}
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />

                <div
                    className="absolute inset-0 overflow-hidden bg-background"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={beforeImage}
                        alt={beforeLabel}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />
                </div>

                {/* Slider Line */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-transform"
                    style={{ left: `calc(${sliderPosition}% - 2px)` }}
                >
                    {/* Slider Handle */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="flex items-center gap-0.5">
                            <svg className="w-3 h-3 text-primary rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </motion.div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 z-20 bg-red-500/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {beforeLabel}
                </div>
                <div className="absolute bottom-4 right-4 z-20 bg-green-500/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {afterLabel}
                </div>

                {/* Hover Overlay Instructions */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full">
                        ← Drag to Compare →
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
