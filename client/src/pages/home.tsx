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
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import heroBg from "@assets/stock_images/professional_cleanin_46f1c2c5.jpg";
import officeBg from "@assets/stock_images/modern_office_interi_886cd061.jpg";
import house1 from "@assets/stock_images/suburban_family_home_d4386769.jpg";
import house2 from "@assets/stock_images/suburban_family_home_ff95533f.jpg";
import felicioLogo from "@assets/generated_images/felicio_cleaning_services_logo.png";

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
    { name: "Home", href: "#" },
    { name: "Serviços", href: "#services" },
    { name: "Áreas", href: "#areas" },
    { name: "Blog", href: "#blog" },
    { name: "Sobre", href: "#about" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`rounded-lg overflow-hidden ${scrolled ? '' : 'bg-white/90 p-1'}`}>
            <img src={felicioLogo} alt="Felicio Cleaning" className="h-12 w-auto object-contain" />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-semibold hover:text-accent transition-colors ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="tel:+14709529626" 
            className={`flex items-center gap-2 font-bold ${scrolled ? "text-primary" : "text-white"}`}
          >
            <div className="bg-accent p-2 rounded-full text-white">
              <Phone size={18} />
            </div>
            (470) 952-9626
          </a>
          <Button className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full px-6">
            Ligar Agora
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? "text-primary" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t absolute w-full"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-foreground font-medium py-2 border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="w-full bg-accent text-white mt-4">
                <Phone className="mr-2 h-4 w-4" /> (470) 952-9626
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Cleaning Service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="text-accent h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Top Rated in Georgia</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight mb-6">
            Limpeza Profissional que <span className="text-accent">Transforma</span> Seu Espaço
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl">
            Serviços Residenciais e Comerciais em East Cobb & Woodstock. 
            Qualidade premium para quem exige o melhor.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-lg h-14 px-8 rounded-full shadow-lg shadow-accent/20">
              <Phone className="mr-2" /> (470) 952-9626
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md font-bold text-lg h-14 px-8 rounded-full">
              Solicitar Orçamento Grátis
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-semibold">
            {["Satisfação Garantida", "Equipe Treinada", "Eco-Friendly"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Services Section ---
const Services = () => {
  const services = [
    { icon: HomeIcon, title: "Limpeza Residencial", desc: "Limpeza detalhada para sua casa, adaptada à sua rotina e necessidades." },
    { icon: Briefcase, title: "Limpeza Comercial", desc: "Ambientes de trabalho impecáveis para produtividade e bem-estar." },
    { icon: Sparkles, title: "Deep Cleaning", desc: "Limpeza profunda que atinge cada canto, ideal para renovar o ambiente." },
    { icon: Truck, title: "Move-In/Move-Out", desc: "Deixe o lugar pronto para a mudança. Garantia de entrega perfeita." },
    { icon: Hammer, title: "Pós-Construção", desc: "Removemos toda a poeira e resíduos de obra para você entrar tranquilo." },
    { icon: LayoutGrid, title: "Cuidados com Pisos", desc: "Tratamento especializado para revigorar e proteger seus pisos." },
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Nossos Serviços</span>
          <h2 className="text-4xl font-heading font-bold text-primary mt-2">Soluções Completas de Limpeza</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow border-none shadow-sm group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                  <a href="#" className="inline-flex items-center text-accent font-bold hover:gap-2 transition-all">
                    Ligar para saber mais <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Why Choose Us ---
const WhyChooseUs = () => {
  const features = [
    { icon: Award, title: "Profissionais Certificados", desc: "Equipe verificada e altamente treinada." },
    { icon: Leaf, title: "Produtos Ecológicos", desc: "Segurança para sua família e pets." },
    { icon: Star, title: "100% Satisfação", desc: "Garantimos a qualidade do nosso serviço." },
    { icon: Clock, title: "Horários Flexíveis", desc: "Adaptamos à sua agenda, não o contrário." },
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
              <p className="text-blue-100">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- How It Works ---
const HowItWorks = () => {
  const steps = [
    { icon: Phone, title: "Fale com Especialista", desc: "Ligue e conte o que você precisa." },
    { icon: MessageSquare, title: "Receba Orçamento", desc: "Preço justo e personalizado na hora." },
    { icon: Calendar, title: "Escolha a Data", desc: "Agendamento rápido e conveniente." },
    { icon: Sparkles, title: "Aproveite", desc: "Relaxe em seu espaço limpo e renovado." },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Passo a Passo</span>
          <h2 className="text-4xl font-heading font-bold text-primary mt-2">Como Funciona</h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white p-4">
              <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              <div className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-4 absolute top-0 ml-16 md:ml-20">
                {index + 1}
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = () => {
  const reviews = [
    { name: "Sarah Johnson", loc: "East Cobb", text: "Incrível! Minha casa nunca esteve tão limpa. A equipe da Felicio é super detalhista e confiável." },
    { name: "Michael Chen", loc: "Woodstock", text: "Contratamos para o escritório e a diferença é notável. Profissionais e pontuais." },
    { name: "Jessica Williams", loc: "Marietta", text: "O serviço de Deep Cleaning salvou minha mudança. Recomendo de olhos fechados!" },
    { name: "David Miller", loc: "Roswell", text: "Excelente atendimento desde a ligação até o serviço final. Preço justo e qualidade top." },
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <section className="py-24 bg-blue-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-primary mb-4">O Que Dizem Nossos Clientes</h2>
          <div className="flex justify-center gap-1 text-accent mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="fill-current w-6 h-6" />)}
          </div>
          <p className="text-gray-600">Baseado em centenas de avaliações 5 estrelas</p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {reviews.map((review, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4">
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-8 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex gap-1 text-yellow-400 mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} className="fill-current w-4 h-4" />)}
                      </div>
                      <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-400">
                        {review.name[0]}
                      </div>
                      <div>
                        <h5 className="font-bold text-primary">{review.name}</h5>
                        <span className="text-sm text-gray-500">{review.loc}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8">
            Seja o próximo cliente satisfeito - Ligue Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

// --- Areas Served ---
const AreasServed = () => {
  return (
    <section id="areas" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-primary">Áreas Atendidas</h2>
          <p className="text-gray-600 mt-4">Levando limpeza de qualidade para sua vizinhança</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="group relative overflow-hidden rounded-2xl h-80">
            <img src={house1} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="East Cobb" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">East Cobb</h3>
              <p className="flex items-center gap-2 mb-4"><MapPin className="w-4 h-4" /> Atendendo toda a região</p>
              <a href="tel:+14709529626" className="inline-flex items-center font-bold text-accent hover:text-white transition-colors">
                (470) 952-9626 <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl h-80">
            <img src={house2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Woodstock" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Woodstock</h3>
              <p className="flex items-center gap-2 mb-4"><MapPin className="w-4 h-4" /> Atendendo toda a região</p>
              <a href="tel:+14709529626" className="inline-flex items-center font-bold text-accent hover:text-white transition-colors">
                (470) 952-9626 <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="link" className="text-primary font-bold text-lg">
            Ver todas as áreas atendidas <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// --- Blog Preview ---
const BlogPreview = () => {
  const posts = [
    { cat: "Dicas", title: "5 Dicas para Manter sua Casa Limpa no Verão", date: "Jan 12, 2026", img: "bg-blue-100" },
    { cat: "Novidades", title: "Por que escolher produtos Eco-Friendly?", date: "Jan 08, 2026", img: "bg-green-100" },
    { cat: "Guia", title: "Limpeza Pós-Obra: O que você precisa saber", date: "Dec 28, 2025", img: "bg-orange-100" },
  ];

  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Blog & Dicas</span>
            <h2 className="text-4xl font-heading font-bold text-primary mt-2">Últimos Posts</h2>
          </div>
          <Button variant="outline" className="hidden md:flex">Ver todos os posts</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-sm hover:shadow-lg transition-shadow">
              <div className={`h-48 ${post.img} w-full`} />
              <CardContent className="p-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="text-accent font-bold uppercase text-xs">{post.cat}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 leading-tight">{post.title}</h3>
                <a href="#" className="text-primary font-semibold hover:text-accent transition-colors text-sm">
                  Ler mais
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CTA Section ---
const FinalCTA = () => {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Pronto para Ter um Espaço Impecável?</h2>
        <p className="text-xl text-blue-100 mb-10">Ligue agora e agende sua limpeza com quem entende do assunto.</p>
        
        <div className="flex flex-col items-center gap-6">
          <a href="tel:+14709529626" className="text-3xl md:text-5xl font-bold text-white hover:text-accent transition-colors">
            (470) 952-9626
          </a>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-xl h-16 px-10 rounded-full shadow-xl animate-pulse">
            <Phone className="mr-3 h-6 w-6" /> LIGAR AGORA
          </Button>
          <div className="mt-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
            <p className="text-sm font-medium">
              <Clock className="inline mr-2 h-4 w-4 text-accent" />
              Atendimento: Seg-Sex 8h-18h | Sáb 9h-14h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/90 p-1 rounded-lg">
                <img src={felicioLogo} alt="Felicio Cleaning" className="h-8 w-auto object-contain" />
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Transformando casas e escritórios em East Cobb e Woodstock com limpeza de excelência e confiança.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Serviços</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Residencial</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Comercial</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Deep Cleaning</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Mudanças</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Áreas Atendidas</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="text-accent h-5 w-5" />
                <span className="text-white font-bold">(470) 952-9626</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="text-accent h-5 w-5" />
                <span>contato@feliciocleaning.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-accent h-5 w-5" />
                <span>East Cobb, GA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2026 Felicio Cleaning Services. All rights reserved.</p>
          <p>Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page Component ---
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <AreasServed />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
