import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Star, ShieldCheck, Zap, Waves, Home as HomeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const pricingTiers = [
    {
        name: "Standard Clean",
        icon: HomeIcon,
        price: "From $120",
        description: "Perfect for maintaining a tidy and healthy home environment.",
        features: [
            "All Living Areas & Bedrooms",
            "Kitchen Exterior surfaces",
            "Bathroom Sanitization",
            "Floor Vacuuming & Mopping",
            "Dusting All Surfaces",
            "Trash Removal"
        ],
        badge: "",
        highlight: false
    },
    {
        name: "Deep Cleaning",
        icon: Waves,
        price: "From $250",
        description: "Intensive care for a complete transformation of your space.",
        features: [
            "Everything in Standard Clean",
            "Baseboards Hand-cleaned",
            "Inside Microwave & Oven",
            "Behind Appliances",
            "Detailed Grout Cleaning",
            "Window Sills & Door Frames",
            "Light Fixtures & Fans"
        ],
        badge: "Most Popular",
        highlight: true
    },
    {
        name: "Move-In/Out",
        icon: Zap,
        price: "From $350",
        description: "Our most thorough service for property transitions.",
        features: [
            "Everything in Deep Clean",
            "Inside All Cabinets & Drawers",
            "Inside Refrigerator",
            "Full Wall Spot Cleaning",
            "Window Tracks & Blinds",
            "Closet Deep Cleaning",
            "Garage Surface Cleaning"
        ],
        badge: "Complete Care",
        highlight: false
    }
];

export default function PricingMatrix() {
    useEffect(() => {
        document.title = "Pricing Matrix — Felicio Cleaning Services";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute(
                "content",
                "Compare our professional cleaning service tiers. From Standard Maintenance to Deep Cleaning and Move-In/Out services."
            );
        }
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 text-white selection:bg-primary/30 bg-black">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-primary mb-6"
                    >
                        <ShieldCheck size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">
                            Transparent Pricing
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
                    >
                        Pricing <span className="text-primary italic">Matrix</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto"
                    >
                        Choose the service level that best fits your needs. All prices are estimates and may vary based on property size and condition.
                    </motion.p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {pricingTiers.map((tier, idx) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className={`relative group rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                                tier.highlight 
                                ? 'bg-primary/10 border-primary/40 shadow-2xl shadow-primary/20 scale-105 z-10' 
                                : 'bg-white/5 border-white/10 hover:bg-white/8'
                            }`}
                        >
                            {tier.badge && (
                                <div className="absolute top-6 right-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                    {tier.badge}
                                </div>
                            )}

                            <div className="p-8 md:p-12">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${tier.highlight ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                                    <tier.icon size={28} />
                                </div>

                                <h3 className="text-3xl font-black mb-2">{tier.name}</h3>
                                <div className="text-primary font-black text-2xl tracking-tighter mb-4">{tier.price}</div>
                                <p className="text-white/50 text-sm mb-10 leading-relaxed">
                                    {tier.description}
                                </p>

                                <div className="space-y-4 mb-10">
                                    {tier.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3">
                                            <div className="mt-1 bg-primary/20 rounded-full p-1">
                                                <Check size={12} className="text-primary" />
                                            </div>
                                            <span className="text-sm text-white/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/quote">
                                    <Button className={`w-full py-8 text-lg font-black transition-all hover:translate-y-[-4px] rounded-2xl ${
                                        tier.highlight 
                                        ? 'bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30' 
                                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                                    }`}>
                                        BOOK NOW <ArrowRight className="ml-2" size={20} />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center p-12 rounded-[3.5rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10"
                >
                    <Star className="text-yellow-400 fill-yellow-400 mx-auto mb-6" size={32} />
                    <h2 className="text-2xl font-black mb-4 uppercase italic">Custom Solutions?</h2>
                    <p className="text-white/60 max-w-xl mx-auto mb-8">
                        Need something specific or have a large commercial space? We offer customized cleaning plans tailored to your exact requirements.
                    </p>
                    <a href="tel:+17704077858" className="inline-flex items-center gap-3 text-primary font-black text-lg hover:scale-105 transition-transform">
                        CALL (770) 407-7858 <ArrowRight size={20} />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
