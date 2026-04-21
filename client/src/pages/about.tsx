import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    CheckCircle2,
    MapPin,
    Star,
    ShieldCheck,
    Users,
    Leaf,
    Clock,
    Award,
    Target,
    Phone,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    const [content, setContent] = useState<any>({});

    useEffect(() => {
        const fetchContent = async () => {
            const { data, error } = await supabase
                .from('site_content')
                .select('content')
                .single();

            if (error) {
                console.error("Failed to load site content:", error);
            } else if (data?.content) {
                setContent(data.content);
            }
        };

        fetchContent();
    }, []);

    const reasons = [
        { icon: ShieldCheck, title: "Fully Insured", desc: "Your property is protected under our comprehensive insurance coverage." },
        { icon: Leaf, title: "Eco-Friendly", desc: "We use non-toxic, biodegradable products safe for your kids and pets." },
        { icon: Users, title: "Expert Team", desc: "Every cleaner undergoes rigorous training and a complete background check." },
        { icon: Target, title: "Detail Oriented", desc: "Our 50-point checklist ensures no corner is left untouched." },
        { icon: Clock, title: "Punctuality", desc: "We respect your time. Our team arrives as scheduled, every single time." },
        { icon: Award, title: "Guaranteed", desc: "Not satisfied? We'll re-clean the area for free within 24 hours." },
    ];

    const testimonials = [
        { name: "Sean Conley", location: "Marietta, GA", text: "Danielle is very attentive to detail. Very professional and dedicated. I would recommend her to any of my family." },
        { name: "Thays Almeida", location: "East Cobb", text: "Best cleaning service in the East Cobb area! Extremely professional and reliable." },
        { name: "lorena diomedio", location: "East Cobb", text: "I recommend! Great attention to detail and professional service." },
    ];

    // Default team members if none in content
    const teamMembers = content.about?.team || [
        {
            id: "1",
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
            name: "Cleaning Specialist"
        },
        {
            id: "2",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
            name: "Quality Auditor"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-32 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse" />

                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6"
                    >
                        Since 2015
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter"
                    >
                        Meet <span className="text-primary italic">Felicio</span> <br /> Cleaning.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/40 font-light max-w-2xl leading-relaxed"
                    >
                        A legacy of excellence built on precision, trust, and the pursuit of a perfect home environment for Georgia families.
                    </motion.p>
                </div>
            </section>

            {/* Our Story & Mission */}
            <section className="container mx-auto px-6 mb-40">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative group">
                        <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10">
                            <img
                                src={content.about?.story?.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&w=800&q=80"}
                                alt="Our Professional Journey"
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-primary p-12 rounded-[3rem] shadow-3xl hidden md:block">
                            <div className="text-5xl font-black italic mb-2">10+</div>
                            <div className="text-xs font-black uppercase tracking-widest text-white/80">Years of Experience</div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-1 bg-primary rounded-full" />
                            <h2 className="text-3xl font-black tracking-tighter uppercase">Our Story</h2>
                        </div>
                        <div className="prose prose-invert max-w-none space-y-8">
                            <p className="text-xl text-white/60 leading-relaxed font-light">
                                Founded with a simple vision of elevating the standard of living through cleanliness, Felicio Cleaning started as a small family-operated endeavor.
                            </p>
                            <p className="text-white/40 leading-relaxed">
                                As word spread about our uncompromising attention to detail and professional reliability, we naturally expanded across **East Cobb**, **Marietta**, and **Woodstock**. Today, we are the preferred choice for those who view cleaning not as a chore, but as an essential part of a healthy, premium lifestyle.
                            </p>

                            <div className="bg-white/5 border-l-4 border-primary p-8 rounded-r-3xl mt-12">
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">Our Mission</div>
                                <p className="text-2xl font-black italic leading-tight">
                                    "To transform spaces with professional, high-performance, and sustainable cleaning that empowers people to breathe easier and live better."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Expertise */}
            <section className="bg-secondary/30 border-y border-white/5 py-32 mb-40 overflow-hidden relative">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Our Elite Team</h2>
                            <p className="text-white/40 text-lg font-light leading-relaxed">
                                Cleanliness is an art. Our technicians are the artists. We don't just hire; we recruit based on precision and integrity.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 py-4 px-8 rounded-2xl border border-white/10 font-black text-sm uppercase tracking-widest">
                            <ShieldCheck className="text-primary" /> 100% Background Checked
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member: any) => (
                            <div key={member.id} className="aspect-square rounded-[3rem] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 relative group">
                                <img src={member.image} className="w-full h-full object-cover" alt={member.name} />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-bold text-lg">{member.name}</p>
                                </div>
                            </div>
                        ))}
                        <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 flex flex-col items-center justify-center bg-white/5 p-12 text-center">
                            <Users size={48} className="text-primary mb-6" />
                            <h4 className="text-2xl font-black mb-4">Trained & Certified</h4>
                            <p className="text-white/40 text-sm font-light">Every member of the Felicio team undergoes 80 hours of specialized sanitation training before entering a client's home.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="container mx-auto px-6 mb-40">
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-black tracking-widest uppercase mb-4">The Felicio Edge</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                                <reason.icon className="text-primary" size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">{reason.title}</h3>
                            <p className="text-white/40 leading-relaxed font-light">{reason.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Commitments & Testimonials */}
            <section className="container mx-auto px-6 mb-40">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase mb-12">Our Core Commitments</h2>
                        <div className="space-y-6">
                            {[
                                "Sustainability: Using eco-friendly technology.",
                                "Quality: Zero-compromise sanitation standards.",
                                "Punctuality: Precise arrival windows.",
                                "Satisfaction: Guaranteed re-intervention."
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <CheckCircle2 size={24} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-xl text-white/60 font-light">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {testimonials.map((t, i) => (
                            <Card key={i} className="bg-white/5 border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all">
                                <div className="flex gap-2 mb-4">
                                    {[...Array(5)].map((_, idx) => <Star key={idx} size={14} className="text-primary fill-primary" />)}
                                </div>
                                <p className="text-white/60 italic font-light mb-6">"{t.text}"</p>
                                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                    <span className="font-black uppercase text-[10px] tracking-widest">{t.name}</span>
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest">{t.location}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-6 text-center">
                <div className="bg-primary p-20 md:p-32 rounded-[4rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] group-hover:scale-110 transition-transform duration-1000" />
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                        Join Our Satisfied <br /> <span className="text-secondary-foreground italic">Clients Today.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-16 font-light">
                        Experience the peace of mind that comes with a truly professional clean.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a href="tel:+17704077858">
                            <Button size="lg" className="h-20 px-12 rounded-[1.5rem] bg-white text-primary hover:bg-white/90 font-black text-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                <Phone size={28} /> (770) 407-7858
                            </Button>
                        </a>
                        <button className="text-white font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:gap-6 transition-all group/btn">
                            View Service Hub <ArrowRight size={20} className="group-hover/btn:text-secondary-foreground" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
