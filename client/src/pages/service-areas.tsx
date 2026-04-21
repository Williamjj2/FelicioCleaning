import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    CheckCircle2,
    ArrowRight,
    Users,
    Star,
    Clock,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AREAS = [
    {
        id: "east-cobb",
        title: "East Cobb & Marietta",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
        description: "Our primary hub. We have multiple specialized teams serving the entire East Cobb corridor with premium residential and executive commercial cleaning.",
        neighborhoods: [
            "East Cobb", "Sandy Plains", "Lassiter", "Johnson Ferry",
            "Indian Hills", "Mount Bethel", "Paper Mill", "Terrell Mill",
            "Powers Ferry", "Lower Roswell"
        ],
        stats: { clients: "250+", rating: "5.0", years: "8" }
    },
    {
        id: "woodstock",
        title: "Woodstock",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        description: "From the vibrant Downtown to the quiet residential enclaves of Towne Lake, we provide deep sanitation and regular maintenance for active families.",
        neighborhoods: [
            "Downtown Woodstock", "Towne Lake", "Eagle Watch", "Rivergate",
            "Deer Run", "Wyngate", "Bradshaw Farm", "Arbor View",
            "Woodlands", "Mountain Park"
        ],
        stats: { clients: "150+", rating: "5.0", years: "5" }
    }
];

const TRUST_POINTS = [
    { icon: Users, label: "500+ Happy Clients" },
    { icon: Star, label: "5.0 Google Rating" },
    { icon: Clock, label: "Same-Day Available" },
    { icon: Shield, label: "Insured & Bonded" }
];

export default function ServiceAreasPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-primary mb-8"
                    >
                        <MapPin size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Proudly Serving North Georgia</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.95]"
                    >
                        Local Experts. <br /><span className="text-primary italic">Exceptional Results.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto"
                    >
                        Our dedicated teams know every neighborhood. We're not just cleaners — we're your neighbors committed to keeping Cobb & Cherokee counties spotless.
                    </motion.p>

                    {/* Trust Points */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16"
                    >
                        {TRUST_POINTS.map((point) => (
                            <div key={point.label} className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                                <point.icon size={20} className="text-primary" />
                                <span className="text-sm font-bold text-white/70">{point.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Coverage Map Visual */}
            <section className="container mx-auto px-6 mb-32">
                <div className="relative rounded-[3rem] overflow-hidden border border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80"
                        alt="Georgia aerial view"
                        className="w-full h-[400px] md:h-[500px] object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <div className="bg-primary/20 backdrop-blur-xl px-8 py-4 rounded-full border border-primary/30 mb-8">
                            <span className="text-primary font-black uppercase tracking-widest text-sm">Active Coverage Zone</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                            Cobb & Cherokee Counties
                        </h2>
                        <p className="text-white/50 text-lg max-w-xl">
                            From busy commercial strips to peaceful suburban streets, we have the local expertise to deliver immaculate results every time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Area Cards */}
            <section className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                        Our Primary Service Regions
                    </h2>
                    <p className="text-white/40 text-lg">Dedicated teams ready to serve your home or business.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {AREAS.map((area, idx) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:border-primary/30 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={area.image}
                                    alt={area.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
                                    <h3 className="text-3xl font-black uppercase tracking-tight">{area.title}</h3>
                                    <MapPin className="text-primary" size={28} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10">
                                <p className="text-white/50 font-light text-lg mb-8 leading-relaxed">
                                    {area.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-primary">{area.stats.clients}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Clients</p>
                                    </div>
                                    <div className="text-center border-x border-white/10">
                                        <p className="text-2xl font-black text-primary">{area.stats.rating}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Rating</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-primary">{area.stats.years}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Years</p>
                                    </div>
                                </div>

                                {/* Neighborhoods */}
                                <div className="mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Neighborhoods We Serve</p>
                                    <div className="flex flex-wrap gap-2">
                                        {area.neighborhoods.map((ns) => (
                                            <span
                                                key={ns}
                                                className="bg-white/5 px-4 py-2 rounded-full text-sm font-medium text-white/60 border border-white/5 hover:border-primary/30 hover:text-white transition-all"
                                            >
                                                {ns}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <a href="tel:+17704077858">
                                    <Button className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/90 flex items-center justify-center gap-3 group/btn">
                                        <Phone size={22} /> Book in {area.title.split(" ")[0]}
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Expansion CTA */}
            <section className="container mx-auto px-6 mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
                        alt="Suburban neighborhood"
                        className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="p-8 md:p-16 max-w-2xl">
                            <div className="flex items-center gap-3 text-primary mb-6">
                                <CheckCircle2 size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expanding Coverage</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-[0.95]">
                                Don't see your neighborhood?
                            </h2>
                            <p className="text-white/50 text-lg font-light mb-10 leading-relaxed">
                                We're growing fast! Call us to check availability in your area. Many requests become part of our regular routes within weeks.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:+17704077858">
                                    <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black text-lg flex items-center gap-3 transition-all">
                                        <Phone size={22} /> Check Availability
                                    </Button>
                                </a>
                                <div className="flex items-center gap-3 text-white/40">
                                    <span className="text-sm font-medium">or call</span>
                                    <span className="text-xl font-black text-white">(770) 407-7858</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer CTA */}
            <section className="container mx-auto px-6 text-center mt-32">
                <p className="text-white/20 text-sm font-bold uppercase tracking-widest mb-6">Ready to experience the Felicio difference?</p>
                <a href="tel:+17704077858">
                    <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-primary text-white font-black text-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                        <Phone size={28} className="mr-4" /> (770) 407-7858
                    </Button>
                </a>
            </section>
        </div>
    );
}
