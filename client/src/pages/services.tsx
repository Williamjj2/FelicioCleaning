import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
  Filter,
  Leaf as LeafIcon,
  Award as AwardIcon,
  Hammer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import placeholderImg from "@assets/stock_images/professional_cleanin_46f1c2c5.jpg";

// --- Service Item Component ---
const ServiceItem = ({ title, icon: Icon, description, includes, frequencies, cta, category, type, price, image, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`group cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-500 ${isOpen ? "bg-card border-primary/30 ring-1 ring-primary/20" : "bg-white/5 border-white/5 hover:border-white/20"
          }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-primary text-white" : "bg-white/5 text-primary group-hover:scale-110"
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
            {price && !isOpen && (
              <div className="hidden md:block text-right mr-4">
                <div className="text-[10px] uppercase tracking-widest opacity-40">Starting At</div>
                <div className="text-xl font-black text-primary">{price}</div>
              </div>
            )}
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
                  <div className="mb-8 rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors">
                    <img src={image || placeholderImg} alt={title} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
                  </div>

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
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">Available Frequencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {frequencies.map((f: string) => (
                          <Badge key={f} variant="secondary" className="bg-white/5 text-white/60 hover:text-white">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center bg-white/5 p-8 rounded-[2rem] border border-white/5">
                  <h4 className="text-xl font-bold mb-4">Detailed Description</h4>
                  <p className="text-white/60 mb-8 text-sm leading-relaxed">
                    {description}
                  </p>

                  {price && (
                    <div className="mb-8 p-4 bg-primary/10 rounded-xl border border-primary/20">
                      <div className="text-xs uppercase tracking-widest font-black text-primary opacity-60">Estimated Entry Price</div>
                      <div className="text-3xl font-black text-white">{price}</div>
                      <div className="text-[10px] opacity-40 mt-1">* Final quote depends on specific square footage and condition.</div>
                    </div>
                  )}

                  <a href="tel:+17704077858">
                    <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 group">
                      <Phone className="mr-3 group-hover:rotate-12 transition-transform" /> {cta}
                    </Button>
                  </a>
                  <p className="text-center text-[10px] uppercase tracking-widest opacity-40 mt-4">
                    Call: (770) 407-7858
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

  const servicesData = [
    {
      id: "residential",
      category: "residential",
      type: "Residential",
      icon: HomeIcon,
      title: "Residential Cleaning",
      description: "Complete home hygiene solution designed for families who value quality time. We handle the dirty work so you can focus on what matters most. Our team uses meticulous techniques to ensure every corner of your home is spotless and inviting.",
      includes: ["Complete kitchen deep-clean", "Sanitized bathrooms & fixtures", "Organized & dusted bedrooms", "Vacuumed & washed common areas", "Detailed floor care", "Complete dust removal"],
      frequencies: ["Weekly", "Bi-weekly", "Monthly", "One-time"],
      price: "$120",
      cta: "Call for personalized quote",
      image: content.services?.residential?.image
    },
    {
      id: "commercial",
      category: "commercial",
      type: "Commercial",
      icon: Briefcase,
      title: "Commercial Cleaning",
      description: "Professional cleaning for offices, clinics, retail spaces, and fitness centers. We offer flexible hours (including after-hours) to ensure zero disruption to your business operations. Maintain a professional image with our dedicated commercial hygiene protocols.",
      includes: ["Workstation & desk sanitization", "Reception & lobby presentation", "Breakroom & kitchen hygiene", "Restroom maintenance", "Trash removal & recycling", "High-traffic floor care"],
      frequencies: ["Daily", "Weekly", "After-hours", "Custom intervals"],
      cta: "Request commercial quote",
      image: content.services?.commercial?.image
    },
    {
      id: "deep",
      category: "residential",
      type: "Intensive",
      icon: Waves,
      title: "Deep Cleaning",
      description: "When a standard clean isn't enough. Recommended for homes that haven't been professionally cleaned in 3+ months. We focus on areas often missed: behind appliances, baseboards, door frames, and deep grout scrubbing.",
      includes: ["Intensive kitchen scrub", "Grout & tile restoration", "Baseboard & wall detail", "Behind appliance cleaning", "Inside window tracks", "High-reach dusting"],
      cta: "Schedule deep cleaning",
      image: content.services?.deep?.image
    },
    {
      id: "move",
      category: "residential",
      type: "Transition",
      icon: Zap,
      title: "Move-In / Move-Out",
      description: "Essential for landlords protecting their investment and tenants securing their deposit. We provide a complete, deep reset of the property, ensuring it's sterile and welcoming for the new occupants.",
      includes: ["Full appliance interior/exterior", "Closet & pantry reset", "Cabinet deep-clean (all surfaces)", "Fixture & hardware polishing", "Wall spot treatment", "Complete property sterilization"],
      cta: "Speak with specialist",
      image: content.services?.move?.image
    },
    {
      id: "post",
      category: "commercial",
      type: "Construction",
      icon: Hammer,
      title: "Post-Construction",
      description: "Turning construction sites into living spaces. We remove fine dust, paint splatters, and construction debris. Our specialized equipment ensures that No dust is left behind, making the space ready for immediate move-in.",
      includes: ["Fine dust filtration/removal", "Paint & residue scraping", "Hardware & surface polishing", "Interior window detailed cleaning", "HEPA-vacuumed surfaces", "Sanitization of HVAC vents"],
      cta: "Request technical visit",
      image: content.services?.post_construction?.image
    },
    {
      id: "floor",
      category: "commercial",
      type: "Maintenance",
      icon: LayoutGrid,
      title: "Floor Care",
      description: "Specialized maintenance for hardwood, tile, stone, and luxury vinyl. We offer preventive polishing and deep scrubbing to extend the life of your premium flooring and maintain a brilliant finish.",
      includes: ["Hardwood buffing & polishing", "Tile & grout deep scrub", "Natural stone restoration", "LVP/Vinyl deep maintenance", "Protective coat application", "Eco-friendly surface treatment"],
      cta: "Consult specialist",
      image: content.services?.floor?.image
    }
  ];

  const filteredServices = filter === "all" ? servicesData : servicesData.filter(s => s.category === filter);

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(27,59,111,0.1),transparent)] pointer-events-none -z-10" />

      {/* Hero */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 py-1.5 px-4 rounded-full uppercase tracking-widest text-[10px] font-black">
            Our Expertise
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Professional <br />
            <span className="text-primary">Cleaning Services</span>
          </h1>

          <div className="flex flex-col items-center gap-6">
            <a href="tel:+17704077858" className="group">
              <Button size="lg" className="h-20 px-10 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-2xl shadow-2xl shadow-primary/20 transition-all hover:-translate-y-2 flex items-center gap-4">
                <Phone className="group-hover:rotate-12 transition-transform" /> (770) 407-7858
              </Button>
            </a>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">
              Call and speak with a specialist
            </p>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-4 p-2 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
          {["all", "residential", "commercial"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 mb-32">
        <div className="max-w-5xl mx-auto">
          {filteredServices.map((s, i) => (
            <ServiceItem key={s.id} {...s} defaultOpen={i === 0 && filter === 'all'} />
          ))}
        </div>
      </section>

      {/* Differentials Section */}
      <section className="bg-secondary/30 border-y border-white/5 py-32 mb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Our Differentials</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: LeafIcon, title: "Eco-Friendly Products", desc: "We use non-toxic, pet-safe, and biodegradable cleaning solutions." },
              { icon: LayoutGrid, title: "Professional Equipment", desc: "HEPA vacuums and specialized tools for deep architectural hygiene." },
              { icon: AwardIcon, title: "Trained Team", desc: "Every specialist is vetted, trained, and certified for quality." },
              { icon: ShieldCheck, title: "Insurance & Guarantee", desc: "Fully insured for your peace of mind with 24h satisfaction guarantee." }
            ].map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <d.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{d.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-tight">
              Didn't find what <br /> you're looking for?
            </h2>
            <p className="text-xl text-white/50 mb-12">
              We specialize in custom cleaning protocols for unique spaces. Tell us your needs and we'll build a solution.
            </p>

            <a href="tel:+17704077858" className="inline-flex flex-col items-center gap-6 group">
              <Button size="lg" className="h-24 px-12 rounded-[2.5rem] bg-primary hover:bg-primary/90 text-white font-black text-3xl shadow-2xl shadow-primary/30 transition-all hover:-translate-y-2 flex items-center gap-4">
                <Phone size={32} /> (770) 407-7858
              </Button>
              <span className="text-xs font-black uppercase tracking-[0.5em] text-primary animate-pulse">
                We have custom solutions!
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
