import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import felicioLogo from "@assets/logo.png";

const NavItem = ({ name, href, scrolled }: { name: string, href: string, scrolled: boolean }) => {
    const [location, setLocation] = useLocation();
    const isActive = location === href || (href.includes('#') && location === '/');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Check if it's a hash link
        if (href.includes('#')) {
            const hashPart = href.split('#')[1];
            const element = document.getElementById(hashPart);

            // If we're not on home page, navigate there first
            if (location !== '/' && href.startsWith('/#')) {
                setLocation('/');
                // Wait for navigation, then scroll
                setTimeout(() => {
                    const el = document.getElementById(hashPart);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
                return;
            }

            // If element exists on current page, scroll to it
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`relative text-sm font-medium transition-colors hover:text-primary cursor-pointer ${scrolled ? "text-foreground" : "text-white/80"
                } ${isActive ? "text-primary" : ""}`}
        >
            {name}
            <motion.span
                className="absolute -bottom-1 left-0 h-px bg-primary w-full origin-left"
                variants={{
                    hover: { scaleX: 1 },
                    initial: { scaleX: 0 }
                }}
                initial="initial"
                animate={isActive ? { scaleX: 1 } : "initial"}
                whileHover="hover"
            />
        </Link>
    );
};

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [location] = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuLinks = [
        { name: "Services", href: "/services" },
        { name: "Pricing", href: "/pricing" },
        { name: "Portfolio", href: "/gallery" },
        { name: "About", href: "/about" },
        { name: "FAQ", href: "/faq" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 overflow-visible ${scrolled ? "py-2 bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-2xl shadow-primary/10" : "py-4 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center relative">
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link href="/">
                            <div className="relative group cursor-pointer h-16 md:h-20 flex items-center">
                                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all rounded-full" />
                                <img src={felicioLogo} alt="Felicio Cleaning" className="h-full w-auto relative z-10 brightness-110 object-contain" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 bg-secondary/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/5 mx-4">
                        {menuLinks.map((link) => (
                            <NavItem key={link.name} {...link} scrolled={scrolled} />
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-6">
                        <a
                            href="tel:+17704077858"
                            className={`flex items-center gap-3 font-black text-sm group ${scrolled ? "text-foreground" : "text-white"}`}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/40 group-hover:rotate-12 transition-all"
                            >
                                <Phone size={18} className="text-white" />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-primary font-black italic">Speak with Specialist</span>
                                <span className="text-lg tracking-tighter">(770) 407-7858</span>
                            </div>
                        </a>
                        <Link href="/quote">
                            <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                                GET FREE QUOTE
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle & Phone */}
                    <div className="lg:hidden flex items-center gap-4">
                        <a href="tel:+17704077858" className="bg-primary p-3 rounded-xl text-white shadow-lg shadow-primary/30">
                            <Phone size={20} />
                        </a>
                        <button className="text-primary p-2" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-0 bg-background z-[100] p-8 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-20">
                                <img src={felicioLogo} className="h-16 w-auto" alt="Logo" />
                                <button className="text-primary p-4 -mr-4" onClick={() => setIsOpen(false)}>
                                    <X size={32} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-6">
                                {menuLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-4xl font-black uppercase tracking-tighter cursor-pointer"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="text-center p-8 bg-primary/5 rounded-[3rem] border border-primary/20">
                                <div className="text-xs font-black uppercase tracking-widest text-primary mb-4">Urgent Dispatch</div>
                                <a href="tel:+17704077858">
                                    <h4 className="text-3xl font-black mb-2">(770) 407-7858</h4>
                                </a>
                                <p className="text-xs text-white/40 uppercase tracking-widest font-black">Mon-Fri 8am-6pm | Sat 9am-2pm</p>
                            </div>
                            <Link href="/quote" onClick={() => setIsOpen(false)}>
                                <Button className="w-full h-20 bg-primary text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/30">
                                    GET FREE QUOTE
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
