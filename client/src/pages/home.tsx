import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Phone, 
  Check, 
  Star, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  Home as HomeIcon, 
  Briefcase, 
  Eraser, 
  Truck, 
  Hammer, 
  LayoutGrid,
  Clock,
  Leaf,
  Award,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Zap,
  Waves
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import heroBg from "@assets/stock_images/professional_cleanin_46f1c2c5.jpg";
import felicioLogo from "@assets/generated_images/felicio_cleaning_services_logo.png";

// --- Nav Item Component ---
const NavItem = ({ name, href, scrolled }: { name: string, href: string, scrolled: boolean }) => (
  <motion.a 
    href={href}
    className={`relative text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-white/80"}`}
    whileHover="hover"
  >
    {name}
    <motion.span 
      className="absolute -bottom-1 left-0 h-px bg-primary w-full origin-left"
      variants={{
        hover: { scaleX: 1 },
        initial: { scaleX: 0 }
      }}
      initial="initial"
    />
  </motion.a>
);

// --- Header Component ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Areas", href: "#areas" },
    { name: "Process", href: "#process" },
    { name: "Reviews", href: "#reviews" },
    { name: "About", href: "#about" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-background/80 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all rounded-full" />
            <img src={felicioLogo} alt="Felicio" className="h-10 w-auto relative z-10 brightness-110" />
          </div>
          <span className="text-xl font-heading font-black tracking-tighter hidden sm:block">
            FELICIO<span className="text-primary">.</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavItem key={link.name} {...link} scrolled={scrolled} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a 
            href="tel:+14709529626" 
            className={`flex items-center gap-3 font-bold group ${scrolled ? "text-foreground" : "text-white"}`}
          >
            <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
              <Phone size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest opacity-60">Call Us</span>
              <span>(470) 952-9626</span>
            </div>
          </a>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl px-8 h-12 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
            Book Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl absolute w-full h-screen p-8 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-3xl font-heading font-bold" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <Button className="w-full max-w-xs bg-primary text-white h-16 rounded-3xl text-xl">
              (470) 952-9626
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Dynamic Background */}
      <motion.div className="absolute inset-0 z-0 scale-110" style={ { y: y1 } }>
        <img src={heroBg} alt="Cleaning" className="w-full h-full object-cover opacity-40 brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full mb-10 border border-white/10">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Premium Cleaning Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black leading-[0.9] mb-8 tracking-tighter">
            THE ART OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">PURE SPACE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Elevating environments in East Cobb & Woodstock. <br className="hidden md:block" />
            Bespoke residential and commercial sanitation for the modern standard.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black text-xl h-20 px-12 rounded-[2rem] shadow-2xl shadow-primary/30 group">
                <Phone className="mr-3 group-hover:rotate-12 transition-transform" /> CALL NOW
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="glass hover:bg-white/10 text-white font-bold text-lg h-20 px-12 rounded-[2rem] border-white/10">
                Instant Quote
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats Floating */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-center opacity-60">
        {[
          { label: "Client Satisfaction", val: "99.9%" },
          { label: "Staff Certified", val: "100%" },
          { label: "Eco-Grade", val: "A+" }
        ].map(s => (
          <div key={s.label}>
            <div className="text-2xl font-black text-white">{s.val}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Modern Service Card ---
const ServiceCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent hover:from-primary/40 hover:to-primary/10 transition-all duration-500">
      <div className="bg-card p-10 rounded-[2.4rem] h-full flex flex-col relative z-10 overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
        
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
          <Icon className="h-8 w-8 text-primary group-hover:text-white" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-white/50 mb-8 leading-relaxed line-clamp-2">{desc}</p>
        
        <div className="mt-auto">
          <a href="#" className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
            Learn More <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Services Section ---
const Services = () => {
  const services = [
    { icon: HomeIcon, title: "Elite Residential", desc: "Molecular level detail for private residences and estates." },
    { icon: Briefcase, title: "Corporate Logic", desc: "Optimized hygiene workflows for high-performance workplaces." },
    { icon: Waves, title: "Deep Infusion", desc: "Revitalizing spaces with advanced deep-cleaning technologies." },
    { icon: Zap, title: "Transition Tech", desc: "Flawless move-in/out services with guaranteed handover quality." },
    { icon: ShieldCheck, title: "Post-Architectural", desc: "Scientific dust removal following construction completions." },
    { icon: LayoutGrid, title: "Surface Science", desc: "Specialized restorative treatments for luxury flooring materials." },
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">SURFACE MASTERY</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
};

// --- Process Section ---
const Process = () => {
  const steps = [
    { title: "Connect", desc: "Digital consultation and scope analysis." },
    { title: "Define", desc: "Tailored sanitization blueprint and quote." },
    { title: "Deploy", desc: "Execution by our elite certified operatives." },
    { title: "Enjoy", desc: "Enter your newly optimized environment." }
  ];

  return (
    <section id="process" className="py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">OUR<br /><span className="text-primary">PROTOCOL.</span></h2>
            <p className="text-xl text-white/50 mb-12 font-light">
              We've replaced traditional scrubbing with a systematic approach to environmental optimization.
            </p>
            <Button className="h-16 px-10 rounded-2xl bg-white text-black font-bold hover:bg-white/90">
              Start Your Protocol
            </Button>
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 group hover:bg-primary/5 hover:border-primary/20 transition-all"
              >
                <div className="text-5xl font-black text-white/10 group-hover:text-primary transition-colors">0{i+1}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-white/40">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="py-32 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 mb-20">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <img src={felicioLogo} alt="Felicio" className="h-10 w-auto" />
            <span className="text-2xl font-black tracking-tighter">FELICIO<span className="text-primary">.</span></span>
          </div>
          <h4 className="text-4xl font-black mb-8 max-w-sm">REDESIGNING THE CLEAN EXPERIENCE.</h4>
          <div className="flex gap-6">
            <a href="tel:+14709529626" className="text-primary font-black text-2xl hover:underline underline-offset-8">
              (470) 952-9626
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Navigation</div>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Process</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Reviews</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Company</div>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Location</div>
            <p className="text-white/60 leading-relaxed">
              East Cobb & Woodstock <br />
              Georgia, US
            </p>
          </div>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
        <div>© 2026 Felicio Cleaning Intel. All Rights Reserved.</div>
        <div className="flex gap-8">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,59,111,0.05)_0%,transparent_100%)] pointer-events-none" />
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
      </main>
      <Footer />
    </div>
  );
}
