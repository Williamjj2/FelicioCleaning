import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    Instagram,
    Facebook,
    MapPin,
    Clock,
    Send,
    Sparkles,
    CheckCircle2,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const serviceAreas = [
        "Marietta", "Alpharetta", "Roswell", "Kennesaw",
        "Woodstock", "Canton", "East Cobb", "Sandy Springs",
        "Smyrna", "Mableton", "Acworth", "Holly Springs"
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-32">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 text-primary mb-8"
                        >
                            <div className="w-12 h-px bg-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Direct Contact</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.9]"
                        >
                            Let's <span className="text-primary italic">Talk</span> <br /> Cleaning.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/40 text-xl font-light mb-12 max-w-lg leading-relaxed"
                        >
                            Skip the long forms. We prioritize direct phone support for instant quotes and same-day scheduling.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="p-10 bg-primary rounded-[3rem] shadow-3xl text-white relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <p className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px] mb-6">Primary Line</p>
                            <a href="tel:+17704077858" className="text-4xl md:text-5xl font-black tracking-tighter hover:tracking-normal transition-all duration-300 block mb-4">
                                (770) 407-7858
                            </a>
                            <p className="text-white/80 font-light flex items-center gap-2">
                                <Clock size={16} /> Mon - Fri: 8am - 6pm | Sat: 9am - 2pm
                            </p>
                        </motion.div>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <a href="mailto:contact@feliciocleaning.com" className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-colors">
                                <Mail className="text-primary" />
                            </div>
                            <p className="text-white/40 uppercase font-black text-[10px] tracking-widest mb-2 text-center sm:text-left">Email Us</p>
                            <p className="text-lg font-bold break-all text-center sm:text-left">contact@feliciocleaning.com</p>
                        </a>
                        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-colors">
                                <MapPin className="text-primary" />
                            </div>
                            <p className="text-white/40 uppercase font-black text-[10px] tracking-widest mb-2 text-center sm:text-left">Coverage</p>
                            <p className="text-lg font-bold text-center sm:text-left">Cobb & Cherokee County, GA</p>
                        </div>
                        <a href="https://instagram.com" className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-colors">
                                <Instagram className="text-primary" />
                            </div>
                            <p className="text-white/40 uppercase font-black text-[10px] tracking-widest mb-2 text-center sm:text-left">Follow Us</p>
                            <p className="text-lg font-bold text-center sm:text-left">@feliciocleaning</p>
                        </a>
                        <a href="https://facebook.com" className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-colors">
                                <Facebook className="text-primary" />
                            </div>
                            <p className="text-white/40 uppercase font-black text-[10px] tracking-widest mb-2 text-center sm:text-left">Connect</p>
                            <p className="text-lg font-bold text-center sm:text-left">Felicio Cleaning Services</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Areas & Form */}
            <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Service Areas */}
                <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center animate-pulse">
                            <MapPin className="text-primary" size={24} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">Cities <br /><span className="text-primary">We Clean.</span></h2>
                    <div className="grid grid-cols-2 gap-4">
                        {serviceAreas.map((area) => (
                            <div key={area} className="flex items-center gap-3 text-white/50 group hover:text-white transition-colors">
                                <CheckCircle2 size={16} className="text-primary/30 group-hover:text-primary" />
                                <span className="font-light">{area}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-sm text-white/30 italic">
                        Don't see your city? Call us – we're expanding rapidly across North Georgia!
                    </p>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20">
                    <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">Get a <span className="text-primary italic">Fast</span> Quote.</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input placeholder="Full Name" className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50" />
                            <Input placeholder="Phone Number" className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50" />
                        </div>
                        <Input placeholder="Email Address" type="email" className="h-16 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50" />
                        <select className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 px-6 text-white/40 appearance-none">
                            <option disabled selected>Select Service Type</option>
                            <option>Residential Standard</option>
                            <option>Residential Deep Clean</option>
                            <option>Move-In / Move-Out</option>
                            <option>Commercial / Office</option>
                            <option>Post-Construction</option>
                        </select>
                        <Textarea placeholder="How can we help? (Optional)" className="min-h-[160px] rounded-3xl bg-white/5 border-white/10 focus:border-primary/50 p-6" />

                        <Button className="w-full h-20 rounded-[1.5rem] bg-white text-black hover:bg-primary hover:text-white font-black text-xl transition-all flex items-center justify-center gap-4 group">
                            Send Request <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                        </Button>

                        <div className="flex items-center justify-center gap-3 py-4 text-white/40 text-sm">
                            <Sparkles size={16} />
                            <span>We typically respond in less than 30 minutes during hours.</span>
                        </div>
                    </form>
                </div>
            </section>

            {/* After Hours Note */}
            <section className="container mx-auto px-6 mt-32 text-center">
                <div className="max-w-2xl mx-auto p-12 bg-white/5 border border-dashed border-white/10 rounded-[3rem]">
                    <Calendar size={32} className="text-white/20 mx-auto mb-6" />
                    <h3 className="text-2xl font-black mb-4 uppercase">Contacting Outside Business Hours?</h3>
                    <p className="text-white/40 mb-8 font-light">
                        If you're messaging during the night or Sunday, don't worry! Our automated booking system via phone is still available, or you can fill the form and we'll call you first thing at 8:00 AM.
                    </p>
                    <a href="tel:+17704077858">
                        <Button variant="outline" className="h-14 px-8 rounded-xl border-primary/30 text-primary hover:bg-primary/10">
                            Click to Dial Anyway
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
}
