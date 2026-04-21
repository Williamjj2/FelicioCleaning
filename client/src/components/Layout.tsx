import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />

            {/* Mobile Floating Call Button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-[100]">
                <a href="tel:+17704077858">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(27, 59, 111, 0)", "0px 0px 20px rgba(27, 59, 111, 0.4)", "0px 0px 0px rgba(27, 59, 111, 0)"] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="bg-primary text-white p-5 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/10"
                    >
                        <Phone size={24} />
                    </motion.div>
                </a>
            </div>
        </div>
    );
};
