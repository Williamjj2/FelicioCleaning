import { useParams, Link } from "wouter";
import { 
  Phone, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  User, 
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "./blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock Content Mapping
const POST_CONTENT: Record<string, string[]> = {
  "10-dicas-manter-casa-limpa": [
    "A chave para uma casa sempre limpa não é o esforço hercúleo de um único dia, mas a consistência de pequenos hábitos. Implementar um protocolo de 15 minutos pode transformar sua relação com seu espaço.",
    "## O Protocolo de 15 Minutos",
    "1. **Cama Arrumada (2 min):** O ponto focal do quarto dita o tom do dia.",
    "2. **Superfícies da Cozinha (3 min):** Nunca deixe louça na pia antes de dormir.",
    "3. **Declutter Rápido (3 min):** Um cesto para itens fora do lugar.",
    "4. **Banheiro Express (2 min):** Limpe o espelho e a pia após o uso.",
    "5. **Triagem de Correspondência (2 min):** Jogue fora o lixo imediatamente.",
    "6. **Aspirador em Áreas de Tráfego (3 min):** Foco nas entradas.",
    "### Quando Chamar um Profissional?",
    "Mesmo com manutenção diária, a poeira microscópica e alérgenos se acumulam. Recomenda-se uma limpeza profissional profunda a cada 15 dias para resetar o ambiente."
  ],
  "produtos-limpeza-eco-friendly": [
    "A revolução ambiental começa no armário da lavanderia. Produtos convencionais contêm VOCs (Compostos Orgânicos Voláteis) que comprometem a qualidade do ar interno.",
    "## Por que ser Eco-Friendly?",
    "O impacto na saúde respiratória é imediato. Além disso, superfícies tratadas com soluções naturais mantêm sua integridade por mais tempo, evitando corrosões químicas.",
    "## O que a Felicio Utiliza",
    "Nosso protocolo 'Green Shield' utiliza exclusivamente soluções biodegradáveis de grau hospitalar que são seguras para pets e crianças, sem sacrificar a potência de desinfecção.",
    "### DIY vs Profissional",
    "Misturas caseiras são ótimas para manutenção, mas para remoção de patógenos, a tecnologia de extração profissional é indispensável."
  ],
  "deep-cleaning-quando-fazer": [
    "Deep cleaning não é apenas uma limpeza 'melhorada'. É uma restauração ambiental completa que atinge áreas normalmente ignoradas em protocolos regulares.",
    "## A Anatomia do Deep Cleaning",
    "Enquanto a limpeza regular foca na estética, o deep cleaning foca na saúde. Isso inclui a higienização de rodapés, trilhos de janelas, o interior de eletrodomésticos e a desinfecção de rejuntes.",
    "## Periodicidade Recomendada",
    "Para residências de alto padrão com pets ou crianças, o ciclo ideal é de 90 dias. Para ambientes comerciais, recomendamos ciclos mensais de restauração de superfície."
  ],
  "checklist-mudanca": [
    "Mudar de residência é um dos eventos mais estressantes da vida. A limpeza Move-In/Move-Out é o seguro que você precisa para garantir sua paz de espírito ou o retorno do seu depósito.",
    "## Protocolo Move-Out",
    "Garantimos que o imóvel seja entregue em estado superior ao recebido. Isso inclui a remoção de marcas em paredes, limpeza exaustiva de armários internos e polimento de metais sanitários.",
    "## Protocolo Move-In",
    "Nunca entre em uma casa nova sem um reset microbiológico. Nossa equipe esteriliza todas as superfícies de contato antes que suas caixas cheguem."
  ],
  "5-erros-comuns-limpeza": [
    "Limpando errado você pode estar espalhando bactérias em vez de removê-las. Identificamos os 5 erros críticos que nossos especialistas encontram em campo.",
    "## 1. Usar o mesmo pano para tudo",
    "A contaminação cruzada entre o banheiro e a cozinha é um risco real de saúde. Use panos de microfibra codificados por cores.",
    "## 2. Aplicar produto diretamente na superfície",
    "Isso cria acúmulo de resíduos que atrai mais poeira. O correto é aplicar no pano.",
    "## 3. Ignorar o tempo de ação",
    "Desinfetantes precisam de 3 a 5 minutos de contato para neutralizar vírus e bactérias. Não borrife e limpe imediatamente."
  ]
};

export default function BlogPostPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);
  const content = POST_CONTENT[id || ""] || ["Content not found."];

  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,59,111,0.05)_0%,transparent_100%)] pointer-events-none -z-10" />

      {/* Post Header */}
      <article className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-12 hover:-translate-x-2 transition-transform">
              <ArrowLeft size={14} /> Back to Hub
            </button>
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full">{post.category}</Badge>
            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{post.date}</span>
            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">•</span>
            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">📖 {post.readTime} reading</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-[0.9]">{post.title}</h1>

          <div className="aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 border border-white/10 shadow-2xl">
            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          </div>

          {/* Content Body */}
          <div className="prose prose-invert prose-lg max-w-none mb-20">
            {content.map((block, i) => {
              if (block.startsWith("## ")) return <h2 key={i} className="text-3xl font-black mt-16 mb-8 text-white tracking-tight">{block.replace("## ", "")}</h2>;
              if (block.startsWith("### ")) return <h3 key={i} className="text-2xl font-bold mt-12 mb-6 text-primary tracking-tight">{block.replace("### ", "")}</h3>;
              if (block.includes("**")) {
                 const parts = block.split("**");
                 return <p key={i} className="text-white/60 leading-relaxed mb-8">{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-black">{p}</strong> : p)}</p>;
              }
              return <p key={i} className="text-white/60 leading-relaxed mb-8">{block}</p>;
            })}
          </div>

          {/* In-Article CTA */}
          <div className="glass p-12 rounded-[3rem] border-primary/20 mb-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <Sparkles className="text-primary mx-auto mb-6" size={40} />
            <h4 className="text-3xl font-black mb-6 tracking-tighter">NEED PROFESSIONAL PROTOCOL?</h4>
            <p className="text-white/40 mb-10 max-w-lg mx-auto">Skip the effort. Our elite team deploys industrial-grade sanitation for your peace of mind.</p>
            <a href="tel:+14709529626">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
                (470) 952-9626
              </Button>
            </a>
          </div>

          {/* Footer of Article */}
          <div className="flex flex-col sm:flex-row justify-between items-center py-12 border-t border-white/5 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="text-primary" />
              </div>
              <div>
                <div className="font-bold text-white">Written by {post.author}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Sanitation Specialist</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="glass h-12 px-6 rounded-xl text-xs font-bold uppercase tracking-widest border-white/10">
                <Share2 className="mr-2" size={14} /> Share
              </Button>
              <Button variant="outline" className="glass h-12 px-6 rounded-xl text-xs font-bold uppercase tracking-widest border-white/10">
                <Bookmark className="mr-2" size={14} /> Save
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="container mx-auto px-6 py-32 bg-secondary/30 border-y border-white/5 mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-12 tracking-tighter">RELATED INTELLIGENCE</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {BLOG_POSTS.filter(p => p.id !== id).slice(0, 3).map(p => (
               <Link key={p.id} href={`/blog/${p.id}`}>
                 <div className="group cursor-pointer">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                      <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
                    </div>
                    <h4 className="font-bold group-hover:text-primary transition-colors">{p.title}</h4>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
