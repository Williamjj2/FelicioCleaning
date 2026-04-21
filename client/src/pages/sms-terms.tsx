import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function SmsTermsPage() {
    useEffect(() => {
        document.title = "SMS Terms — Felicio Cleaning Services";
        const meta = document.querySelector('meta[name="description"]');
        const content =
            "SMS Messaging Terms for Felicio Cleaning Services. Program details, message frequency, opt-out (STOP), help (HELP), and supported carriers.";
        if (meta) {
            meta.setAttribute("content", content);
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content = content;
            document.head.appendChild(newMeta);
        }
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 text-white selection:bg-primary/30">
            <article className="container mx-auto px-6 max-w-[900px]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 text-primary mb-6"
                >
                    <MessageSquare size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">
                        SMS Program
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-center"
                >
                    SMS <span className="text-primary italic">Terms</span>
                </motion.h1>

                <p className="text-center text-white/40 text-sm font-bold uppercase tracking-[0.3em] mb-20">
                    Last updated: April 20, 2026
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8 text-white/70 leading-relaxed text-lg"
                >
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            SMS Messaging Terms
                        </h2>
                        <p className="mb-4">
                            By opting in to receive text messages from Felicio Cleaning Services, you agree to receive recurring automated SMS messages, including appointment reminders, quote follow-ups, promotions, service updates, rescheduling notifications, and customer support responses, at the mobile number you provided.
                        </p>
                        <ul className="list-disc list-inside space-y-3 pl-2 mb-4">
                            <li>
                                <strong className="text-white/90">Program name:</strong> Felicio Cleaning Services SMS Notifications
                            </li>
                            <li>
                                <strong className="text-white/90">Message frequency:</strong> Varies based on customer activity — typically up to 6 messages per month
                            </li>
                            <li>
                                <strong className="text-white/90">Cost:</strong> Message and data rates may apply, depending on your carrier plan
                            </li>
                            <li>
                                <strong className="text-white/90">Opt-out:</strong> Reply STOP at any time to unsubscribe. You will receive a confirmation message.
                            </li>
                            <li>
                                <strong className="text-white/90">Help:</strong> Reply HELP for assistance, or contact <a href="mailto:support@feliciocleaning.com" className="text-primary hover:underline underline-offset-4">support@feliciocleaning.com</a>
                            </li>
                            <li>
                                <strong className="text-white/90">Supported carriers:</strong> AT&amp;T, Verizon Wireless, T-Mobile, Sprint, U.S. Cellular, and other major and minor US carriers. Carriers are not liable for delayed or undelivered messages.
                            </li>
                        </ul>
                        <p className="font-bold text-white">
                            Consent is not a condition of purchase or any service provided by Felicio Cleaning Services.
                        </p>
                        <p className="mt-6">
                            See our{" "}
                            <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-4 font-semibold">
                                Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link href="/terms-and-conditions" className="text-primary hover:underline underline-offset-4 font-semibold">
                                Terms &amp; Conditions
                            </Link>
                            .
                        </p>
                    </section>
                </motion.div>
            </article>
        </div>
    );
}
