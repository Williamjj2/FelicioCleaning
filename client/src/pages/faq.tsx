import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Minus,
    Search,
    Phone,
    HelpCircle,
    MessageSquare,
    Sparkles,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FAQ_DATA = [
    {
        category: "SERVICES",
        questions: [
            { q: "What services do you offer?", a: "We offer Residential Cleaning, Commercial Cleaning, Deep Cleaning, Move-In/Out Cleaning, Post-Construction Cleanup, and Specialized Floor/Carpet Care." },
            { q: "What's the difference between regular and deep cleaning?", a: "Regular cleaning is maintenance (dusting, floors, bathrooms). Deep cleaning targets neglected areas like baseboards, inside appliances, and cabinet exteriors in detail." },
            { q: "Do you serve residential and commercial?", a: "Yes, we handle everything from executive offices to family apartments and large estates." },
            { q: "Do you do post-construction cleaning?", a: "Absolutely. We specialize in removing fine construction dust, residue, and debris to make your new space move-in ready." }
        ]
    },
    {
        category: "SCHEDULING",
        questions: [
            { q: "How to schedule?", a: "The fastest way is to call (770) 407-7858. Our specialists will provide an instant quote and book your slot." },
            { q: "What's the lead time for scheduling?", a: "We typically require 24-48 hours notice, but we often have same-day availability for urgent needs." },
            { q: "Do you handle emergencies?", a: "Yes! If you have a last-minute event or move, call us immediately for priority dispatch." },
            { q: "Do you work on weekends?", a: "Yes, we operate on Saturdays from 9am to 2pm for your convenience." },
            { q: "Do I need to be home?", a: "No. Many clients provide a key or access code. We are fully insured and background-checked for your peace of mind." }
        ]
    },
    {
        category: "PRICING",
        questions: [
            { q: "How is pricing calculated?", a: "Pricing is based on square footage, current state of the home, and specific service type (Regular vs Deep)." },
            { q: "Payment methods?", a: "We accept Cash, Check, Venmo, Zelle, and major Credit Cards." },
            { q: "Do you accept cards?", a: "Yes, we accept all major credit cards through our secure mobile processing system." },
            { q: "Discount for recurring service?", a: "Yes! We offer significant discounts for Weekly, Bi-Weekly, and Monthly subscriptions." }
        ]
    },
    {
        category: "PRODUCTS",
        questions: [
            { q: "Do you provide the products?", a: "Yes, we arrive with professional-grade equipment and premium supplies at no extra cost." },
            { q: "Do you use eco-friendly products?", a: "Exclusively. We prioritize non-toxic, biodegradable solutions that are safe for pets and children." },
            { q: "Can I provide my own products?", a: "If you have a medical requirement or specific preference, our team can use your provided supplies." },
            { q: "Do you serve people with allergies?", a: "Yes. Our HEPA vacuums and microfiber protocols are designed to minimize allergens and microscopic dust." }
        ]
    },
    {
        category: "GUARANTEES",
        questions: [
            { q: "Do you offer guarantee?", a: "We offer a 100% Satisfaction Guarantee. If any area is missed, we return within 24 hours to fix it." },
            { q: "What if I'm not satisfied?", a: "Contact us immediately. Your satisfaction is our #1 priority and we will make it right." },
            { q: "Are you insured?", a: "Yes, we are fully licensed, bonded, and insured for total client protection." },
            { q: "Is the team trustworthy?", a: "Every team member passes a rigorous background check and is personally vetted by our management." }
        ]
    },
    {
        category: "TIME & PROCESS",
        questions: [
            { q: "How long does it take?", a: "A standard clean takes 2-4 hours, while deep cleans can take 4-8 hours depending on the house size." },
            { q: "What's the process?", a: "We arrive, conduct a initial walkthrough, execute our 50-point checklist, and perform a final quality audit." },
            { q: "Do I need to prepare anything?", a: "A quick declutter of personal items/toys helps our team focus 100% on deep sanitation." }
        ]
    }
];

const AccordionItem = ({ question, answer, isOpen, onClick }: any) => (
    <div className="border-b border-white/5 py-6">
        <button
            onClick={onClick}
            className="flex items-center justify-between w-full text-left group"
        >
            <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
                {question}
            </span>
            <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-white/20'}`}>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <p className="text-white/40 pt-4 leading-relaxed font-light">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function FAQPage() {
    const [search, setSearch] = useState("");
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (q: string) => {
        setOpenItems(prev => prev.includes(q) ? prev.filter(i => i !== q) : [...prev, q]);
    };

    const filteredData = FAQ_DATA.map(cat => ({
        ...cat,
        questions: cat.questions.filter(item =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    return (
        <div className="min-h-screen pt-32 pb-20 selection:bg-primary/30 text-white">
            <section className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-primary mb-6"
                    >
                        <HelpCircle size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Resource Center</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase"
                    >
                        How can we <br /><span className="text-primary italic">help?</span>
                    </motion.h1>

                    <div className="relative group max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                        <Input
                            placeholder="Search for answers (e.g. pricing, products...)"
                            className="h-16 pl-14 pr-6 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 text-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-16">
                    {filteredData.length > 0 ? filteredData.map((cat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={cat.category}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{cat.category}</span>
                                <div className="flex-grow h-px bg-white/5" />
                            </div>
                            <div className="space-y-2">
                                {cat.questions.map((item) => (
                                    <AccordionItem
                                        key={item.q}
                                        question={item.q}
                                        answer={item.a}
                                        isOpen={openItems.includes(item.q)}
                                        onClick={() => toggleItem(item.q)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )) : (
                        <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                            <MessageSquare size={48} className="text-white/10 mx-auto mb-6" />
                            <h3 className="text-2xl font-black mb-4">No results found</h3>
                            <p className="text-white/40 mb-8">Don't waste time searching, call us directly!</p>
                            <a href="tel:+17704077858">
                                <Button className="h-14 px-8 rounded-xl bg-primary text-white font-black">Call Specialist</Button>
                            </a>
                        </div>
                    )}
                </div>

                {/* Highlight Highlight Box "Didn't find it?" */}
                <div className="mt-32 p-12 md:p-20 bg-white/5 border border-primary/30 rounded-[4rem] text-center relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700" />
                    <Sparkles className="text-primary mx-auto mb-8" size={48} />
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Didn't find what <br /> you were looking for?</h2>
                    <p className="text-white/40 mb-12 max-w-lg mx-auto font-light text-lg">
                        Our experts are on standby to address any specific concerns or provide custom quotes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a href="tel:+17704077858">
                            <Button size="lg" className="h-20 px-12 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-2xl flex items-center gap-4">
                                <Phone size={28} /> (770) 407-7858
                            </Button>
                        </a>
                        <button className="text-white font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:gap-6 transition-all group/btn">
                            Message Us <ChevronRight size={20} className="group-hover/btn:text-primary" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
