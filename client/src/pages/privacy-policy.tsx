import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
    useEffect(() => {
        document.title = "Privacy Policy — Felicio Cleaning Services";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute(
                "content",
                "Privacy Policy for Felicio Cleaning Services. Learn how we collect, use, and protect your personal information."
            );
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content =
                "Privacy Policy for Felicio Cleaning Services. Learn how we collect, use, and protect your personal information.";
            document.head.appendChild(newMeta);
        }
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 text-white selection:bg-primary/30">
            <article className="container mx-auto px-6 max-w-[900px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 text-primary mb-6"
                >
                    <ShieldCheck size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">
                        Legal
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-center"
                >
                    Privacy <span className="text-primary italic">Policy</span>
                </motion.h1>

                <p className="text-center text-white/40 text-sm font-bold uppercase tracking-[0.3em] mb-20">
                    Last updated: April 20, 2026
                </p>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-16 text-white/70 leading-relaxed text-lg"
                >
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Introduction
                        </h2>
                        <p>
                            This Privacy Policy explains how Felicio Cleaning Services ("we",
                            "us", or "our") collects, uses, and protects your personal
                            information when you visit our website and use our cleaning
                            services.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Information We Collect
                        </h2>
                        <p className="mb-4">
                            We may collect the following types of information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Name, address, email, and phone number</li>
                            <li>
                                Scheduling information (service date/time, service address,
                                service details)
                            </li>
                            <li>
                                Payment information (processed through third-party payment
                                providers; we do not store full card details)
                            </li>
                            <li>
                                Basic website and technical data (IP address, browser type,
                                device identifiers, pages visited, and cookies/analytics data)
                            </li>
                        </ul>
                    </section>

                    <hr className="border-white/5" />

                    {/* How We Collect Information */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            How We Collect Information
                        </h2>
                        <p className="mb-4">We collect information through:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>
                                Website forms (quote requests, contact forms, booking inquiries)
                            </li>
                            <li>Calls, emails, and text messages from customers</li>
                            <li>
                                Cookies and analytics tools (for example, Google Analytics)
                            </li>
                        </ul>
                    </section>

                    <hr className="border-white/5" />

                    {/* How We Use Information */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            How We Use Information
                        </h2>
                        <p className="mb-4">We use your information to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Respond to inquiries and provide quotes</li>
                            <li>
                                Schedule services, confirm appointments, and send
                                updates/reminders (including SMS, when applicable)
                            </li>
                            <li>
                                Process billing and payments through third-party providers
                            </li>
                            <li>
                                Improve our website, services, and customer experience
                                (including analytics)
                            </li>
                            <li>Comply with legal and tax obligations</li>
                        </ul>
                        <p className="mt-4 font-semibold text-white/80">
                            We do not sell or rent your personal information.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* SMS / Text Messaging Privacy */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            SMS / Text Messaging Privacy
                        </h2>
                        <p className="mb-4">
                            Felicio Cleaning Services collects mobile phone numbers and SMS consent information solely for the purpose of sending text messages directly related to our services, including appointment reminders, quote follow-ups, promotions, service updates, and customer support.
                        </p>
                        <p className="mb-4 font-bold text-white">
                            No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All categories of personal information exclude mobile opt-in data and consent; this information will not be shared with any third parties.
                        </p>
                        <p className="mb-4">
                            SMS consent is optional and is never a condition of purchase, service delivery, or any transaction with Felicio Cleaning Services. Users may opt out at any time by replying STOP to any message received, or request help by replying HELP. Message and data rates may apply. Message frequency varies.
                        </p>
                        <p>
                            To request deletion of your phone number and SMS data, contact us at <a href="mailto:support@feliciocleaning.com" className="text-primary hover:underline underline-offset-4">support@feliciocleaning.com</a>.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Sharing With Third Parties */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Sharing With Third Parties
                        </h2>
                        <p className="mb-4">
                            We may share information with trusted third parties that help us
                            operate our business, such as:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Website hosting and website service providers</li>
                            <li>Email and communication providers</li>
                            <li>Scheduling/CRM platforms</li>
                            <li>Payment processors (for example, Stripe and PayPal)</li>
                            <li>SMS providers (for example, Twilio, if used)</li>
                        </ul>
                        <p className="mt-4">
                            These third parties are permitted to use your information only as
                            needed to provide services to us. We may also disclose information
                            if required by law, legal process, or to protect rights, safety,
                            and security.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Cookies & Tracking */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Cookies &amp; Tracking
                        </h2>
                        <p className="mb-4">We may use cookies to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Remember preferences and improve site functionality</li>
                            <li>
                                Understand website usage and performance (analytics)
                            </li>
                        </ul>
                        <p className="mt-4">
                            You can disable cookies in your browser settings. Note that
                            disabling cookies may affect certain website features.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Data Retention & Security */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Data Retention &amp; Security
                        </h2>
                        <p className="mb-4">
                            We retain personal information as long as needed to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>
                                Provide services and maintain our business relationship
                            </li>
                            <li>Meet legal, tax, or regulatory requirements</li>
                        </ul>
                        <p className="mt-4">
                            We use reasonable administrative, technical, and physical
                            safeguards (such as HTTPS, access controls, and limited access) to
                            protect information. However, no method of transmission or storage
                            is 100% secure.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Your Rights
                        </h2>
                        <p className="mb-4">
                            Depending on your location, you may have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Request access to your personal data</li>
                            <li>Request corrections or updates</li>
                            <li>
                                Request deletion (subject to legal/tax retention requirements)
                            </li>
                        </ul>
                        <p className="mt-4">
                            To make a request, contact us using the information below.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Contact
                        </h2>
                        <div className="space-y-2">
                            <p className="font-semibold text-white">
                                Felicio Cleaning Services
                            </p>
                            <p>
                                Phone:{" "}
                                <a
                                    href="tel:+17704077858"
                                    className="text-primary hover:underline underline-offset-4"
                                >
                                    (770) 407-7858
                                </a>
                            </p>
                            <p>
                                Service areas: East Cobb &amp; Woodstock, Georgia
                            </p>
                            <p>
                                Contact us via our{" "}
                                <Link
                                    href="/contact"
                                    className="text-primary hover:underline underline-offset-4"
                                >
                                    website contact form
                                </Link>
                            </p>
                        </div>
                    </section>

                    <hr className="border-white/5" />

                    {/* Updates to This Policy */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Updates to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. When we do,
                            we will revise the "Last updated" date at the top of this page.
                        </p>
                    </section>
                </motion.div>
            </article>
        </div>
    );
}
