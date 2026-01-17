import { useState } from "react";
import { 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  Home as HomeIcon, 
  Briefcase, 
  Waves, 
  Zap, 
  ShieldCheck, 
  LayoutGrid,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Service Item Component ---
const ServiceItem = ({ id, title, icon: Icon, description, includes, frequencies, cta, ctaLink, type, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`group cursor-pointer p-8 rounded-[2rem] border transition-all duration-500 ${
          isOpen ? "bg-card border-primary/30 ring-1 ring-primary/20" : "bg-white/5 border-white/5 hover:border-white/20"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isOpen ? "bg-primary text-white" : "bg-white/5 text-primary group-hover:scale-110"
            }`}>
              <Icon size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-primary/20 text-primary">{type}</Badge>
                <h3 className="text-2xl font-black tracking-tight">{title}</h3>
              </div>
              <p className="text-white/40 text-sm">{description.split('.')[0]}.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto md:ml-0">
             <div className="hidden md:block text-right mr-4">
                <div className="text-[10px] uppercase tracking-widest opacity-40">Starting At</div>
                <div className="text-xl font-black text-primary">$120*</div>
             </div>
             {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown className="opacity-40" />}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-10 grid lg:grid-cols-2 gap-12 border-t border-white/5 mt-8">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">What's Included</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {includes.map((item: string) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {frequencies && (
                    <div className="mt-8">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">Availability</h4>
                      <div className="flex flex-wrap gap-2">
                        {frequencies.map((f: string) => (
                          <Badge key={f} variant="secondary" className="bg-white/5 text-white/60 hover:text-white">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-center bg-white/5 p-8 rounded-3xl border border-white/5">
                  <p className="text-white/60 mb-8 text-sm leading-relaxed italic">
                    "{description}"
                  </p>
                  <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 group">
                    <Phone className="mr-3 group-hover:rotate-12 transition-transform" /> {cta}
                  </Button>
                  <p className="text-center text-[10px] uppercase tracking-widest opacity-40 mt-4">
                    Instant Booking via (470) 952-9626
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [filter, setFilter] = useState("all");

  const services = [
    {
      id: "residential",
      type: "Residential",
      icon: HomeIcon,
      title: "Elite Residential",
      description: "Comprehensive sanitation for luxury homes. We don't just clean; we restore your environment to its molecular best using surgical precision.",
      includes: ["Cozinha completa", "Banheiros sanitizados", "Quartos organizados", "Áreas comuns", "Aspiração e lavagem de pisos", "Remoção de pó"],
      frequencies: ["Weekly", "Bi-weekly", "Monthly", "One-time"],
      cta: "Ligar para orçamento personalizado"
    },
    {
      id: "commercial",
      type: "Commercial",
      icon: Briefcase,
      title: "Commercial Logic",
      description: "Business-grade hygiene systems for offices, clinics, and retail spaces. Specialized in high-traffic sanitation and document-safe workflows.",
      includes: ["Workstation Sanitization", "Common Areas", "High-Touch Surface Tech", "Restroom Management", "Waste Disposal System", "Entrance & Lobby Care"],
      frequencies: ["Daily", "After-Hours", "Weekend Only", "Custom Contracts"],
      cta: "Solicitar orçamento comercial"
    },
    {
      id: "deep",
      type: "Deep Clean",
      icon: Waves,
      title: "Deep Infusion",
      description: "Heavy-duty restorative cleaning. Recommended for spaces that haven't been professionally treated in 3+ months or for high-standard resets.",
      includes: ["Baseboard Restoration", "Interior Window Care", "Inside Cabinet Detailing", "Grout Deep Clean", "Vent & Grille Sanitization", "Blind & Shutter Care"],
      cta: "Agendar deep cleaning"
    },
    {
      id: "move",
      type: "Transition",
      icon: Zap,
      title: "Transition Tech",
      description: "Flawless move-in/out protocols. We ensure your deposit is protected or your new home is sterile and welcoming from day one.",
      includes: ["Full Appliance Interior", "Closet & Pantry Reset", "Wall Spot Treatment", "Fixture Polishing", "Cabinet Interior/Exterior", "Full Surface Sterilization"],
      cta: "Falar com especialista"
    },
    {
      id: "post",
      type: "Industrial",
      icon: ShieldCheck,
      title: "Post-Architectural",
      description: "Removal of construction debris, fine dust, and residues. We make newly built or renovated spaces ready for immediate occupancy.",
      includes: ["Fine Dust Extraction", "Paint & Caulk Removal", "Floor Polishing", "Hepa Air Filtration", "Hardware Polishing", "Glass Detail"],
      cta: "Solicitar visita técnica"
    },
    {
      id: "floor",
      type: "Surface",
      icon: LayoutGrid,
      title: "Surface Science",
      description: "Advanced maintenance for hardwood, tile, stone, and luxury vinyl. Preventive care to extend the life of your premium flooring assets.",
      includes: ["Hardwood Buffing", "Tile & Grout Seal", "Stone Restoration", "Vinyl Protection", "Deep Scrub Systems", "Polishing & Shining"],
      cta: "Consultar especialista"
    }
  ];

  const filteredServices = filter === "all" ? services : services.filter(s => s.type.toLowerCase().includes(filter));

  return (
    <div className="min-h-screen pt-32 pb-20">
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,59,111,0.05)_0%,transparent_100%)] pointer-events-none -z-10" />

      {/* Hero */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
             <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 py-1.5 px-4 rounded-full">
              Environmental Mastery
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
              ELITE <br /><span className="text-primary">SERVICES.</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a href="tel:+14709529626" className="flex items-center gap-4 group">
                <div className="bg-primary p-4 rounded-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Phone className="text-white" />
                </div>
                <div>
                   <div className="text-2xl font-black">(470) 952-9626</div>
                   <div className="text-xs uppercase tracking-[0.2em] opacity-40">Talk to an Intelligent Agent</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 mr-4 opacity-40">
            <Filter size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Type</span>
          </div>
          {["all", "residential", "commercial"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold capitalize transition-all border ${
                filter === f ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white/5 border-white/5 hover:border-white/20 text-white/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 mb-32">
        <div className="max-w-6xl mx-auto">
          {filteredServices.map((s, i) => (
            <ServiceItem key={s.id} {...s} defaultOpen={i === 0 && filter === 'all'} />
          ))}
        </div>
      </section>

      {/* Differentiation */}
      <section className="container mx-auto px-6 py-32 border-y border-white/5 bg-secondary/30 mb-32">
        <div className="grid lg:grid-cols-4 gap-12">
          {[
            { icon: Leaf, title: "Eco-Friendly", desc: "Surgical grade non-toxic solutions." },
            { icon: ShieldCheck, title: "Fully Insured", desc: "Multi-million dollar protection." },
            { icon: Award, title: "Elite Operatives", desc: "100% certified and vetted staff." },
            { icon: Sparkles, title: "Total Guarantee", desc: "No-questions-asked re-cleaning." }
          ].map((d, i) => (
            <div key={d.title} className="text-center lg:text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <d.icon className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">{d.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="glass p-16 rounded-[4rem] border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter relative z-10">CUSTOM SOLUTION?</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto relative z-10">
            Don't see exactly what you need? We specialize in hyper-personalized sanitation protocols.
          </p>
          <a href="tel:+14709529626" className="inline-flex flex-col items-center gap-4 group relative z-10">
            <Button size="lg" className="h-20 px-12 rounded-3xl bg-primary hover:bg-primary/90 text-white font-black text-2xl shadow-2xl shadow-primary/20 transition-all hover:-translate-y-2">
               (470) 952-9626
            </Button>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Call Our Specialist</span>
          </a>
        </div>
      </section>
    </div>
  );
}

// Add these to tailwind or use lucide-react constants
const Leaf = ({ size, className }: any) => <Sparkles size={size} className={className} />;
const Award = ({ size, className }: any) => <ShieldCheck size={size} className={className} />;
