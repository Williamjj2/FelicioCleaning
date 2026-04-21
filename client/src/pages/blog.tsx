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
  Mail,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Residential", "Commercial", "Tips", "Products", "Organization"];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = BLOG_POSTS[0];
  const recentPosts = filteredPosts.filter(p => p.id !== featuredPost.id);

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,59,111,0.05)_0%,transparent_100%)] pointer-events-none -z-10" />

      {/* Blog Header */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 py-1.5 px-4 rounded-full uppercase tracking-widest text-[10px] font-black">
            Knowledge Hub
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Felicio Blog <br />
            <span className="text-primary italic">Tips & News</span>
          </h1>
          <p className="text-lg text-white/40 leading-relaxed">
            Professional insights, environmental optimization strategies, and the latest in sanitation technology to transform your space.
          </p>
        </motion.div>
      </section>

      {/* Utility Bar: Search & Categories */}
      <section className="container mx-auto px-6 mb-16">
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              <Filter size={16} className="text-primary mr-2 shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 text-sm"
                placeholder="Search protocols and articles..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Main Column */}
          <div className="lg:col-span-8">
            {/* Featured Post */}
            {activeCategory === "All" && !searchQuery && (
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-12 h-px bg-primary" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Featured Case</h2>
                </div>
                <Link href={`/blog/${featuredPost.id}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer relative overflow-hidden rounded-[3.5rem] border border-white/10 shadow-2xl"
                  >
                    <div className="aspect-[21/10] relative">
                      <img src={featuredPost.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={featuredPost.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-primary text-white text-[10px] uppercase font-black px-4 py-1.5">{featuredPost.category}</Badge>
                        <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">{featuredPost.date}</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-white/60 mb-8 max-w-2xl line-clamp-2 text-lg font-light">
                        {featuredPost.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
                        Read Extensive Protocol <ArrowRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            )}

            {/* Grid Posts - 3 Column Grid */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <span className="w-12 h-px bg-primary" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Recent Intelligence</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {recentPosts.map((post, i) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-white/10 relative">
                        <img src={post.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={post.title} />
                      </div>
                      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-primary mb-3">
                        <span>{post.category}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-white/40">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed mb-6 line-clamp-2 font-light">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
                        Study Details <ArrowRight size={12} />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Need Professional Cleaning? */}
            <div className="relative overflow-hidden p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 backdrop-blur-sm group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h4 className="text-2xl font-black mb-4 tracking-tighter uppercase relative z-10">
                Professional <br /> Cleaning?
              </h4>
              <p className="text-xs text-white/50 mb-8 leading-relaxed uppercase tracking-widest font-black relative z-10">
                Surgical-grade protocols for elite living spaces.
              </p>
              <a href="tel:+17704077858">
                <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-2xl shadow-primary/30 text-lg flex items-center gap-3 transition-transform hover:-translate-y-1">
                  <Phone size={20} /> (770) 407-7858
                </Button>
              </a>
            </div>

            {/* Popular Posts */}
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp size={18} className="text-primary" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em]">Viral Protocols</h4>
              </div>
              <div className="space-y-8">
                {BLOG_POSTS.slice(0, 4).map((post, i) => (
                  <Link key={i} href={`/blog/${post.id}`}>
                    <div className="flex gap-4 group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="text-2xl font-black text-white/10 group-hover:text-primary transition-colors">0{i + 1}</div>
                      <div>
                        <div className="text-[8px] uppercase tracking-widest text-primary mb-1 font-black">{post.category}</div>
                        <h5 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">{post.title}</h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.slice(1).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 bg-white/5 hover:bg-primary hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="relative overflow-hidden p-10 rounded-[2.5rem] bg-secondary/50 border border-white/5">
              <Mail className="text-primary mb-6" size={32} />
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Stay Optimized</h4>
              <p className="text-[10px] text-white/40 mb-8 uppercase tracking-[0.2em] font-black leading-relaxed">
                Weekly intelligence on environmental health and efficiency.
              </p>
              <div className="space-y-4">
                <Input className="h-12 bg-white/5 border-white/10 rounded-xl px-6 text-xs focus:border-primary/50 transition-all font-medium" placeholder="your@email.com" />
                <Button className="w-full h-12 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-[8px] text-white/20 uppercase tracking-widest text-center">No spam. Only high-grade data.</p>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}
