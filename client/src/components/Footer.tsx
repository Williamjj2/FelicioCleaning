import { Link } from "wouter";
import felicioLogo from "@assets/logo.png";

export const Footer = () => (
    <footer className="py-32 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 mb-20">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <Link href="/">
                            <img src={felicioLogo} alt="Felicio Cleaning" className="h-24 w-auto cursor-pointer" />
                        </Link>
                    </div>
                    <h4 className="text-4xl font-black mb-8 max-w-sm">REDESIGNING THE CLEAN EXPERIENCE.</h4>
                    <div className="flex gap-6">
                        <a href="tel:+17704077858" className="text-primary font-black text-2xl hover:underline underline-offset-8">
                            (770) 407-7858
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                    <div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Navigation</div>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="/service-areas" className="hover:text-primary transition-colors">Coverage</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Tips &amp; News</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Company</div>
                        <ul className="space-y-4 text-white/60">
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/sms-terms" className="hover:text-primary transition-colors">SMS Terms</Link></li>
                            <li><Link href="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Location</div>
                        <p className="text-white/60 leading-relaxed">
                            East Cobb & Woodstock <br />
                            Georgia, US
                        </p>
                    </div>
                </div>
            </div>
            <div className="mb-12 p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 leading-relaxed max-w-2xl mx-auto">
                    Customers may receive text messages (SMS) related to quotes, scheduling and service updates. Message and data rates may apply. Reply STOP to cancel.
                </p>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                <div>© 2026 Felicio Cleaning Intel. All Rights Reserved.</div>
                <div className="flex gap-8">
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
        </div>
    </footer>
);
