import { useState } from "react";
import { 
  Search, 
  Phone, 
  Clock, 
  Calendar, 
  ArrowRight, 
  User, 
  Tag, 
  ChevronRight,
  TrendingUp,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock Data for Posts
export const BLOG_POSTS = [
  {
    id: "10-dicas-manter-casa-limpa",
    title: "10 Dicas para Manter Sua Casa Limpa com Apenas 15 Minutos por Dia",
    excerpt: "Manter a casa em ordem não precisa ser uma maratona de final de semana. Com apenas 15 minutos diários...",
    category: "Dicas",
    date: "Jan 15, 2026",
    readTime: "8 min",
    author: "Felicio Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "produtos-limpeza-eco-friendly",
    title: "Produtos de Limpeza Eco-Friendly: Guia Completo",
    excerpt: "Descubra por que a transição para produtos ecológicos é essencial para a saúde da sua família e do planeta...",
    category: "Produtos",
    date: "Jan 12, 2026",
    readTime: "10 min",
    author: "Equipe Felicio",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "deep-cleaning-quando-fazer",
    title: "Deep Cleaning: Quando e Por Que Fazer?",
    excerpt: "Muitas pessoas confundem limpeza regular com deep cleaning. Entenda as diferenças fundamentais e a periodicidade ideal...",
    category: "Limpeza Residencial",
    date: "Jan 10, 2026",
    readTime: "7 min",
    author: "Felicio Intel",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "checklist-mudanca",
    title: "Checklist Completo: Prepare Sua Casa para Mudança",
    excerpt: "Mudar de casa é estressante. Nosso checklist de limpeza move-in/move-out garante que você não esqueça nenhum detalhe...",
    category: "Organização",
    date: "Jan 05, 2026",
    readTime: "12 min",
    author: "Felicio Cleaning",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5-erros-comuns-limpeza",
    title: "5 Erros Comuns na Limpeza da Casa (E Como Evitar)",
    excerpt: "Você pode estar limpando errado sem saber. Conheça os erros que podem danificar seus móveis e superfícies...",
    category: "Dicas",
    date: "Jan 02, 2026",
    readTime: "9 min",
    author: "Equipe Felicio",
    image: "https://images.unsplash.com/photo-1585421515284-d9797f263d21?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogPage() {
  const categories = ["Limpeza Residencial", "Comercial", "Dicas", "Produtos", "Organização"];
  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,59,111,0.05)_0%,transparent_100%)] pointer-events-none -z-10" />

      {/* Blog Header */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 py-1.5 px-4 rounded-full">Knowledge Hub</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">FELICIO <span className="text-primary">BLOG.</span></h1>
          <p className="text-xl text-white/40 max-w-2xl font-light">Estratégias de elite para ambientes impecáveis.</p>
        </motion.div>
      </section>

      {/* Search & Categories */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between border-y border-white/5 py-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto no-scrollbar">
            {categories.map(cat => (
              <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <Input className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50" placeholder="Search insights..." />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Posts */}
          <div className="lg:col-span-8">
            {/* Hero Post */}
            <Link href={`/blog/${featuredPost.id}`}>
              <motion.div whileHover={{ y: -10 }} className="group cursor-pointer mb-16">
                <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden mb-8 border border-white/10">
                  <img src={featuredPost.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={featuredPost.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <Badge className="mb-4 bg-primary text-white">{featuredPost.category}</Badge>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Grid Posts */}
            <div className="grid md:grid-cols-2 gap-10">
              {BLOG_POSTS.slice(1).map((post, i) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <motion.div whileHover={{ y: -5 }} className="group cursor-pointer">
                    <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 border border-white/10">
                      <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={post.title} />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                      <span>{post.category}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="text-white/40">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-all">
                      Read Protocol <ArrowRight size={12} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* CTA Card */}
            <div className="glass p-10 rounded-[2.5rem] border-primary/20">
              <h4 className="text-2xl font-black mb-4 tracking-tighter">ELITE SERVICE.</h4>
              <p className="text-sm text-white/60 mb-8 leading-relaxed">Transform your environment with our surgical-grade cleaning protocols.</p>
              <Button className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20">
                <Phone className="mr-2" size={18} /> (470) 952-9626
              </Button>
            </div>

            {/* Popular Posts */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp size={20} className="text-primary" />
                <h4 className="text-sm font-black uppercase tracking-widest">Viral Intelligence</h4>
              </div>
              <div className="space-y-6">
                {BLOG_POSTS.slice(0, 3).map((post, i) => (
                  <Link key={i} href={`/blog/${post.id}`}>
                    <div className="flex gap-4 group cursor-pointer">
                      <div className="text-2xl font-black text-white/10 group-hover:text-primary transition-colors">0{i+1}</div>
                      <h5 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">{post.title}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-secondary/50 p-10 rounded-[2.5rem]">
              <Mail className="text-primary mb-6" size={32} />
              <h4 className="text-xl font-bold mb-4">Pure Intelligence</h4>
              <p className="text-xs text-white/40 mb-6 uppercase tracking-widest leading-relaxed">Weekly environmental optimization strategies.</p>
              <div className="space-y-3">
                <Input className="bg-white/5 border-white/10 rounded-xl" placeholder="Email Address" />
                <Button className="w-full h-12 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest">Subscribe</Button>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}
