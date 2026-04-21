import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Phone, Check, Star, MapPin, ArrowRight, Sparkles, Home as HomeIcon, Briefcase, Waves, Zap, ShieldCheck, LayoutGrid, Clock, Leaf, Award, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteForm } from "@/components/QuoteForm";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import heroBg from "@assets/stock_images/professional_cleanin_46f1c2c5.jpg";
import { Link } from "wouter";

// ---------- Hero Section ----------
const Hero = ({ customBg }: { customBg?: string }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 bg-black">
      <motion.div className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <img src={customBg || heroBg} alt="Cleaning" className="w-full h-full object-cover opacity-80 brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
      </motion.div>
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Professional Cleaning That Transforms Your Space
          </h1>
          <h2 className="text-xl md:text-2xl mb-8">
            Residential &amp; Commercial Services in East Cobb &amp; Woodstock
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="tel:+17704077858" className="inline-block">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg flex items-center gap-2">
                <Phone className="h-5 w-5" /> Call Now: (770) 407-7858
              </Button>
            </a>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full w-full sm:w-auto cursor-pointer">
                Request Free Quote
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <span className="flex items-center gap-2"><Check className="text-green-400" /> 100% Satisfaction</span>
            <span className="flex items-center gap-2"><Check className="text-green-400" /> Trained Team</span>
            <span className="flex items-center gap-2"><Check className="text-green-400" /> Eco‑Friendly</span>
          </div>
        </motion.div>
      </div>
      <QuoteForm isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </section>
  );
};

// ---------- Service Card ----------
const ServiceCard = ({ icon: Icon, title, desc, image }: any) => (
  <motion.div whileHover={{ scale: 1.03 }} className="bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors overflow-hidden group">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-4 left-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/80 rounded-xl flex items-center justify-center">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
    </div>
    <div className="p-5">
      <p className="text-sm text-white/70 mb-4">{desc}</p>
      <a href="tel:+17704077858" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
        Call to learn more <ArrowRight size={14} />
      </a>
    </div>
  </motion.div>
);

// ---------- Services Section ----------
const Services = ({ customBg, servicesContent }: { customBg?: string; servicesContent?: any }) => {
  const services = [
    { key: "residential", icon: HomeIcon, title: "Residential Cleaning", desc: "Professional home cleaning for houses and apartments.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
    { key: "commercial", icon: Briefcase, title: "Commercial Cleaning", desc: "Expert office and business facility cleaning solutions.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
    { key: "deep", icon: Waves, title: "Deep Cleaning", desc: "Intensive cleaning for kitchens, bathrooms, and entire spaces.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
    { key: "move", icon: Zap, title: "Move‑In/Out Cleaning", desc: "Complete cleaning for property transitions and handovers.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
    { key: "post_construction", icon: ShieldCheck, title: "Post‑Construction Cleaning", desc: "Thorough cleanup after renovation or construction projects.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" },
    { key: "floor", icon: LayoutGrid, title: "Floor & Carpet Cleaning", desc: "Specialized cleaning and restoration for all flooring types.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80" },
  ].map(s => ({
    ...s,
    image: servicesContent?.[s.key]?.image || s.image
  }));
  return (
    <section
      id="services"
      className="py-24 bg-[#1B3B6F] text-white relative"
      style={customBg ? { backgroundImage: `url(${customBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {customBg && <div className="absolute inset-0 bg-black/70 pointer-events-none" />}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Why Choose ----------
const WhyChoose = ({ image }: { image?: string }) => (
  <section id="about" className="py-24 bg-[#0F2A4A] text-white">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary text-sm font-bold uppercase tracking-widest">The Felicio Difference</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8">Why Choose Felicio</h2>
          <p className="text-white/60 text-lg mb-12">
            We're not just another cleaning company. We bring professional-grade expertise, eco-conscious products, and a genuine commitment to transforming your space into a pristine sanctuary.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <Award className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Certified Pros</h3>
                <p className="text-sm text-white/60">Fully trained and insured staff.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Leaf className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Eco‑Friendly</h3>
                <p className="text-sm text-white/60">Non‑toxic, green cleaning solutions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Star className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">100% Satisfaction</h3>
                <p className="text-sm text-white/60">Guaranteed or we re‑clean free.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                <p className="text-sm text-white/60">We work around your availability.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={image || "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&w=800&q=80"}
            alt="Professional cleaning team"
            className="rounded-3xl shadow-2xl border border-white/10"
          />
          <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-xl hidden md:block">
            <div className="text-4xl font-black">10+</div>
            <div className="text-sm font-bold uppercase tracking-widest">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- How It Works ----------
const steps = [
  { icon: Phone, title: "Call Our Specialist", desc: "Reach us and discuss your needs." },
  { icon: Calendar, title: "Get Personalized Quote", desc: "We provide a transparent estimate." },
  { icon: MessageSquare, title: "Choose Date & Time", desc: "Schedule at your convenience." },
  { icon: Sparkles, title: "Enjoy Your Clean Space", desc: "Relax while we do the work." },
];

const HowItWorks = () => (
  <section id="process" className="py-24 bg-[#1B3B6F] text-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">Simple Process</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">How It Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <Card key={i} className="bg-white/5 border border-white/10 text-center p-8 relative overflow-hidden group hover:bg-white/10 transition-all">
            <div className="absolute top-4 right-4 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors">0{i + 1}</div>
            <s.icon className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-white/60">{s.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Testimonials (Real Google Reviews - 5.0 ⭐ / 11 reviews) ----------
const testimonials = [
  { name: "Sean Conley", location: "Marietta, GA", rating: 5, text: "Danielle is very attentive to detail. Very professional and dedicated. I would recommend her and her associates to any of my family and/or friends." },
  { name: "Thays Almeida", location: "East Cobb", rating: 5, text: "Best cleaning service in the East Cobb area! Extremely professional and reliable." },
  { name: "Maurício Júnior", location: "Marietta, GA", rating: 5, text: "Excellent service. I definitely recommend it to everyone." },
  { name: "Lorrany Rosa", location: "Marietta, GA", rating: 5, text: "Excelentes profissionais, ótimo trabalho e agilidade no serviços prestado." },
  { name: "lorena diomedio", location: "East Cobb", rating: 5, text: "I recommend! Great attention to detail and professional service." },
  { name: "RENATO Almeida", location: "Woodstock, GA", rating: 5, text: "Very thorough and professional cleaning. Highly recommend Felicio Cleaning!" },
];

const Testimonials = () => (
  <section className="py-24 bg-[#0F2A4A] text-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">Client Love</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">What Our Clients Say</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <span className="font-bold text-2xl">5.0</span>
          <span className="text-white/60">• 11 reviews on Google</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.slice(0, 6).map((t, i) => (
          <Card key={i} className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="flex mb-4">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className={idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-white/30"} size={16} />
              ))}
            </div>
            <p className="text-white/80 italic mb-6">"{t.text}"</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-bold">{t.name}</span>
              <span className="text-sm text-white/40 flex items-center gap-1"><MapPin size={14} /> {t.location}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <a href="tel:+17704077858">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full shadow-lg">
            Be Our Next Happy Client - Call Now
          </Button>
        </a>
      </div>
    </div>
  </section>
);

// ---------- Service Areas ----------
const ServiceAreasSection = ({ areas }: { areas?: Array<{ id: string, image: string, title: string }> }) => (
  <section id="areas" className="py-24 bg-[#1B3B6F] text-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">Where We Serve</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">Service Areas</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {areas && areas.length > 0 ? areas.map((area) => (
          <div key={area.id} className="relative rounded-3xl overflow-hidden group h-80">
            <img
              src={area.image || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"}
              alt={area.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-bold mb-2">{area.title}</h3>
              <p className="text-white/70 mb-4">{
                area.id === 'east_cobb' ? "Our primary hub serving residential and commercial clients." :
                  "Serving Downtown and Towne Lake communities."
              }</p>
              <a href="tel:+17704077858" className="flex items-center gap-2 text-primary font-bold">
                <Phone size={18} /> (770) 407-7858
              </a>
            </div>
          </div>
        )) : (
          /* Fallback static content if no areas in JSON yet */
          <>
            <div className="relative rounded-3xl overflow-hidden group h-80">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                alt="East Cobb"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold mb-2">East Cobb & Marietta</h3>
                <p className="text-white/70 mb-4">Our primary hub serving residential and commercial clients.</p>
                <a href="tel:+17704077858" className="flex items-center gap-2 text-primary font-bold">
                  <Phone size={18} /> (770) 407-7858
                </a>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group h-80">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Woodstock"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold mb-2">Woodstock</h3>
                <p className="text-white/70 mb-4">Serving Downtown and Towne Lake communities.</p>
                <a href="tel:+17704077858" className="flex items-center gap-2 text-primary font-bold">
                  <Phone size={18} /> (770) 407-7858
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="text-center mt-12">
        <Link href="/service-areas">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            View All Service Areas <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

// ---------- Latest Blog Posts ----------
const posts = [
  { img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80", category: "Cleaning Tips", title: "5 Ways to Keep Your Home Spotless", date: "Jan 10, 2026" },
  { img: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=80", category: "Industry News", title: "Why Eco‑Friendly Cleaning Matters", date: "Jan 5, 2026" },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", category: "Customer Stories", title: "How We Transformed a Historic Home", date: "Dec 28, 2025" },
];

const BlogPosts = () => (
  <section className="py-24 bg-[#0F2A4A] text-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">Insights</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">Latest Blog Posts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <Card key={i} className="bg-white/5 border border-white/10 overflow-hidden group hover:bg-white/10 transition-all">
            <div className="h-52 overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <CardContent className="p-6">
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">{p.category}</p>
              <h3 className="font-bold text-xl mb-3">{p.title}</h3>
              <p className="text-sm text-white/50 mb-4">{p.date}</p>
              <Link href="/blog">
                <span className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all cursor-pointer">
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/blog">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">View all posts</Button>
        </Link>
      </div>
    </div>
  </section>
);

// ---------- Final CTA ----------
const FinalCTA = () => (
  <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
    <div className="container mx-auto px-6 relative z-10">
      <Sparkles className="h-16 w-16 mx-auto mb-8 animate-pulse" />
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for an Impeccable Space?</h2>
      <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
        Join over 500 satisfied clients in East Cobb and Woodstock. Call now and experience the Felicio difference.
      </p>
      <a href="tel:+17704077858">
        <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 font-bold px-10 py-6 rounded-full shadow-2xl text-xl">
          <Phone className="mr-3" /> CALL (770) 407-7858
        </Button>
      </a>
      <p className="mt-8 text-white/80">Hours: Mon‑Fri 8am‑6pm | Sat 9am‑2pm</p>
    </div>
  </section>
);

export default function Home() {
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

  return (
    <div className="min-h-screen selection:bg-primary/30 text-white">
      <Hero customBg={content.home?.hero?.backgroundImage} />
      <Services customBg={content.home?.services_section?.backgroundImage} servicesContent={content.services} />
      <WhyChoose image={content.home?.why_choose?.image} />
      <HowItWorks />
      <Testimonials />
      <BeforeAfterSection items={content.beforeAfter} />
      <ServiceAreasSection areas={content.home?.service_areas} />
      <BlogPosts />
      <FinalCTA />
    </div>
  );
}
