import { useParams, Link, useLocation } from "wouter";
import {
  Phone,
  Clock,
  Calendar,
  ArrowLeft,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BlogPostPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">POST NOT FOUND</h1>
          <Link href="/blog">
            <Button variant="outline" className="rounded-xl">Return to Hub</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Injecting related posts
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,59,111,0.05)_0%,transparent_100%)] pointer-events-none -z-10" />

      <article className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-12 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-40" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-primary truncate">{post.title}</span>
          </nav>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-6 mb-8"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 py-1 px-4 rounded-full uppercase tracking-widest text-[10px] font-black italic">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <Calendar size={14} className="text-primary" /> {post.date}
            </div>
            <div className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <Clock size={14} className="text-primary" /> 📖 {post.readTime} Read
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-12 leading-[1] tracking-tight"
          >
            {post.title}
          </motion.h1>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="aspect-[21/10] rounded-[3.5rem] overflow-hidden mb-16 border border-white/10 shadow-3xl shadow-primary/5"
          >
            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          </motion.div>

          {/* Content Body */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.map((block, i) => {
              // Header 2
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-3xl md:text-4xl font-black mt-20 mb-8 text-white tracking-tighter flex items-center gap-4">
                    <span className="w-8 h-1 bg-primary rounded-full shrink-0" />
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              // Header 3
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-2xl font-black mt-12 mb-6 text-primary tracking-tight">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              // List items
              if (block.startsWith("- ")) {
                return (
                  <div key={i} className="flex gap-4 mb-4 ml-4">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                    <p className="text-white/60 font-light leading-relaxed m-0">{block.replace("- ", "")}</p>
                  </div>
                );
              }

              // Standard Paragraph with bold support
              const parts = block.split("**");
              const paragraph = (
                <p key={i} className="text-white/50 text-xl leading-[1.8] font-light mb-10 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-bold">{p}</strong> : p)}
                </p>
              );

              // Inject Mid-content CTA after the 3rd or 4th block
              if (i === 3) {
                return (
                  <div key="mid-cta" className="my-20">
                    <div className="bg-white/5 border border-primary/30 p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
                      <MessageSquare className="text-primary mx-auto mb-6" size={42} />
                      <h4 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-tight">
                        Need Professional Assistance?
                      </h4>
                      <p className="text-white/40 mb-10 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-black">
                        Don't let the grime build up. Our elite intervention team is ready to deploy.
                      </p>
                      <a href="tel:+17704077858">
                        <Button size="lg" className="h-16 px-12 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 hover:scale-105 flex items-center gap-3 mx-auto">
                          <Phone size={24} /> (770) 407-7858
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              }

              return <p key={i} className="text-white/60 text-lg leading-relaxed mb-10 font-light">
                {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-black">{p}</strong> : p)}
              </p>;
            })}
          </div>

          {/* Author/Company Information Section */}
          <div className="my-20 p-10 bg-secondary/30 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-primary/20 shrink-0">
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover grayscale" alt="Felicio Authority" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Editorial Authority</div>
              <h4 className="text-2xl font-black mb-3">Felicio Cleaning Team</h4>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                Our editorial team consists of career sanitation specialists and environmental safety experts with over 15 years of industry experience. Every protocol published here is tested in the field before being shared with our community.
              </p>
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <button className="text-white/20 hover:text-primary transition-colors"><Facebook size={18} /></button>
                <button className="text-white/20 hover:text-primary transition-colors"><Twitter size={18} /></button>
                <button className="text-white/20 hover:text-primary transition-colors"><Linkedin size={18} /></button>
              </div>
            </div>
          </div>

          {/* Social Share & Final Call */}
          <div className="flex flex-col sm:flex-row justify-between items-center py-12 border-t border-white/5 gap-8 mb-20">
            <div className="text-center sm:text-left">
              <div className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Liked these tips?</div>
              <div className="text-lg font-black italic">For professional cleaning, call us now!</div>
            </div>
            <a href="tel:+17704077858">
              <Button variant="outline" className="h-14 px-8 rounded-xl border-primary/50 text-white font-black uppercase tracking-[0.2em] hover:bg-primary transition-all">
                Deploy Specialist
              </Button>
            </a>
          </div>
        </div>
      </article>

      {/* Related Intelligence */}
      <section className="bg-secondary/40 border-y border-white/5 py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-4">
                <span className="w-12 h-1 bg-primary rounded-full" />
                <h2 className="text-3xl font-black tracking-tighter uppercase">Related Intelligence</h2>
              </div>
              <Link href="/blog">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary">View Hub <ChevronRight size={14} /></Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {relatedPosts.map(p => (
                <Link key={p.id} href={`/blog/${p.id}`}>
                  <motion.div whileHover={{ y: -8 }} className="group cursor-pointer">
                    <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 border border-white/10 relative">
                      <img src={p.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={p.title} />
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-primary mb-3 italic">{p.category}</div>
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">{p.title}</h4>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Bottom CTA */}
      <section className="container mx-auto px-6 pt-32 text-center">
        <div className="glass p-16 md:p-24 rounded-[4rem] border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
            REVOLUTIONIZE YOUR <br /> <span className="text-primary italic">ENVIRONMENT.</span>
          </h2>
          <p className="text-xl text-white/40 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Beyond tips, we provide solutions. Get a pharmaceutical-grade clean that lasts longer and protects better.
          </p>
          <a href="tel:+17704077858" className="inline-flex flex-col items-center gap-6 group">
            <Button size="lg" className="h-24 px-12 rounded-[2.5rem] bg-primary hover:bg-primary/90 text-white font-black text-3xl shadow-3xl shadow-primary/30 transition-all hover:-translate-y-2 flex items-center gap-4">
              <Phone size={32} /> (770) 407-7858
            </Button>
            <span className="text-xs font-black uppercase tracking-[0.5em] text-primary animate-pulse">Speak with an agent</span>
          </a>
        </div>
      </section>
    </div>
  );
}
