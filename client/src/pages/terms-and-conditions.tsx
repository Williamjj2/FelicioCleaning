import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsAndConditionsPage() {
    useEffect(() => {
        document.title = "Terms and Conditions — Felicio Cleaning Services";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute(
                "content",
                "Terms and Conditions for Felicio Cleaning Services. Review the terms governing your use of our website and cleaning services."
            );
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content =
                "Terms and Conditions for Felicio Cleaning Services. Review the terms governing your use of our website and cleaning services.";
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
                    <FileText size={20} />
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
                    Terms &amp;{" "}
                    <span className="text-primary italic">Conditions</span>
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
                    {/* Introduction / Acceptance */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Introduction / Acceptance
                        </h2>
                        <p>
                            These Terms and Conditions ("Terms") govern your use of the
                            Felicio Cleaning Services website and services. By using our
                            website, requesting a quote, scheduling a cleaning, or purchasing
                            services from us, you agree to these Terms.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Scope of Services */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Scope of Services
                        </h2>
                        <p className="mb-4">
                            We provide residential and commercial cleaning services in our
                            service area, including East Cobb, Woodstock, Kennesaw, Acworth,
                            and Marietta, Georgia.
                        </p>
                        <p className="mb-4">
                            Services may include (depending on what you schedule): routine
                            residential cleaning, deep cleaning, move-in/move-out cleaning,
                            commercial cleaning, post-construction cleaning, specialized floor
                            care, and eco-friendly cleaning options, as agreed in your
                            quote/booking confirmation.
                        </p>
                        <p>
                            Scheduling may be completed via website inquiry, phone, email, or
                            SMS, as available.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Scheduling / Rescheduling / Cancellations */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Scheduling / Rescheduling / Cancellations
                        </h2>
                        <ul className="list-disc list-inside space-y-4 pl-2">
                            <li>
                                <strong className="text-white/90">
                                    Rescheduling/cancellations:
                                </strong>{" "}
                                Please provide at least 24 hours' notice to reschedule or
                                cancel.
                            </li>
                            <li>
                                <strong className="text-white/90">
                                    Late cancellations / short notice:
                                </strong>{" "}
                                If cancellation occurs with less than 24 hours' notice, a fee
                                may apply (for example, a percentage of the quoted service
                                price).
                            </li>
                            <li>
                                <strong className="text-white/90">
                                    No access / lockout:
                                </strong>{" "}
                                If our team cannot access the property at the scheduled time (no
                                entry, incorrect address, locked gate, etc.), a minimum
                                service/lockout fee may apply.
                            </li>
                        </ul>
                    </section>

                    <hr className="border-white/5" />

                    {/* Pricing & Payments */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Pricing &amp; Payments
                        </h2>
                        <ul className="list-disc list-inside space-y-4 pl-2">
                            <li>
                                Prices are provided via quote/estimate and may be fixed per
                                service or based on the agreed scope.
                            </li>
                            <li>
                                Payment timing (due before or after service) will be defined at
                                booking or invoice.
                            </li>
                            <li>
                                Payments may be processed via third-party payment processors; we
                                do not store full card details.
                            </li>
                        </ul>
                    </section>

                    <hr className="border-white/5" />

                    {/* Access & Customer Responsibilities */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Access &amp; Customer Responsibilities
                        </h2>
                        <p className="mb-4">You agree to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>
                                Provide safe and timely access to the property during the
                                scheduled appointment window
                            </li>
                            <li>Secure fragile, sensitive, or high-value items</li>
                            <li>
                                Communicate important instructions (parking, building access,
                                gate codes, alarms, pets, restricted areas)
                            </li>
                        </ul>
                        <p className="mt-4">
                            We may refuse or stop service if conditions are unsafe or if
                            inappropriate conduct occurs.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Service Guarantee & Complaints */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Service Guarantee &amp; Complaints
                        </h2>
                        <p className="mb-4">
                            If you are not satisfied, please contact us within 24 hours of
                            service completion to report issues. At our discretion, we may
                            arrange a re-clean of the affected area(s) within a reasonable
                            timeframe. This guarantee does not apply to issues caused by
                            normal wear and tear, pre-existing conditions, or areas/items
                            excluded from the scope.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Limitation of Liability
                        </h2>
                        <p>
                            To the maximum extent permitted by law, Felicio Cleaning Services'
                            liability for any claim related to the services will be limited to
                            the amount you paid for the service giving rise to the claim. We
                            are not liable for indirect, incidental, special, consequential,
                            or punitive damages, except where prohibited by law.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Intellectual Property
                        </h2>
                        <p>
                            All content on this website (text, graphics, logos, and images) is
                            owned by or licensed to Felicio Cleaning Services and is protected
                            by applicable intellectual property laws. You may not copy,
                            reproduce, or distribute website content without prior written
                            permission.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Privacy Policy Reference */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Privacy Policy Reference
                        </h2>
                        <p>
                            Your use of the website and services is also subject to our
                            Privacy Policy. Please review it here:{" "}
                            <Link
                                href="/privacy-policy"
                                className="text-primary hover:underline underline-offset-4 font-semibold"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* SMS / Electronic Communications */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            SMS / Electronic Communications
                        </h2>
                        <p className="mb-4">
                            SMS communications from Felicio Cleaning Services are optional and require your explicit opt-in. Consent to receive SMS messages is not a condition of purchasing any goods or services from us.
                        </p>
                        <p className="mb-4">
                            When you expressly opt in to SMS (for example, by checking the SMS consent box on our website quote form, or by otherwise providing documented consent), you may receive text messages related to quotes, booking confirmations, appointment reminders, rescheduling, follow-ups, satisfaction surveys, and customer support for our cleaning services. These communications are transactional and service-related; they are not bulk marketing messages.
                        </p>
                        <p className="mb-4">
                            Message frequency varies. Message and data rates may apply, depending on your mobile plan.
                        </p>
                        <p className="mb-4">
                            <strong className="text-white/90">Opt-out:</strong> You may opt out of SMS communications at any time by replying <strong className="text-white/90">STOP</strong> to any message. You will receive a confirmation of your opt-out.
                        </p>
                        <p className="mb-4">
                            <strong className="text-white/90">Help:</strong> Reply <strong className="text-white/90">HELP</strong> to any message for assistance, or contact us at (770) 407-7858.
                        </p>
                        <p className="mb-4">
                            Carriers are not liable for any delayed or undelivered messages.
                        </p>
                        <p>
                            For more information on how we handle your data, please review our <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-4 font-semibold">Privacy Policy</Link>.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Termination */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Termination
                        </h2>
                        <p>
                            We may refuse, cancel, or terminate services for reasons including
                            (but not limited to) non-payment, unsafe conditions, inability to
                            access the property, or inappropriate behavior toward staff.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Governing Law / Venue */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Governing Law / Venue
                        </h2>
                        <p>
                            These Terms are governed by the laws of the State of Georgia, USA,
                            without regard to conflict of law principles. Any disputes will be
                            brought in the appropriate state or federal courts located in
                            Georgia, unless otherwise required by law.
                        </p>
                    </section>

                    <hr className="border-white/5" />

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Changes to Terms
                        </h2>
                        <p>
                            We may update these Terms from time to time. The "Last updated"
                            date at the top of this page will reflect the most recent changes.
                        </p>
                    </section>
                </motion.div>
            </article>
        </div>
    );
}
