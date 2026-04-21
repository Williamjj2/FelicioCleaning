import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteFormProps {
    isOpen: boolean;
    onClose: () => void;
    isInline?: boolean;
}

export const QuoteForm = ({ isOpen, onClose, isInline = false }: QuoteFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        address: "",
        message: ""
    });
    const [smsConsent, setSmsConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const services = [
        "Residential Cleaning",
        "Commercial Cleaning",
        "Deep Cleaning",
        "Move In/Out Cleaning",
        "Post-Construction Cleaning",
        "Floor & Carpet Cleaning"
    ];

    const encode = (data: any) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({
                    "form-name": "quote-request",
                    ...formData,
                    "sms_consent": smsConsent ? "yes" : "no",
                    "sms_opt_in": smsConsent ? "true" : "false",
                    "sms_consent_timestamp": smsConsent ? new Date().toISOString() : ""
                })
            });

            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset after 2 seconds
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    address: "",
                    message: ""
                });
                setSmsConsent(false);
            }, 2000);
        } catch (error) {
            console.error("Form submission error:", error);
            setIsSubmitting(false);
            alert("There was an error submitting the form. Please try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const formContent = (
        <div className={`bg-background border border-white/10 rounded-3xl max-w-2xl w-full ${!isInline ? 'max-h-[90vh] overflow-y-auto shadow-2xl' : ''}`}>
            {/* Header */}
            <div className={`${!isInline ? 'sticky top-0 bg-background/95 backdrop-blur-xl border-b' : 'border-b'} border-white/10 p-8 flex justify-between items-center`}>
                <div>
                    <h2 className="text-3xl font-black">Get Your Free Quote</h2>
                    <p className="text-white/60 mt-2">Fill out the form and we'll get back to you within 24 hours</p>
                </div>
                {!isInline && (
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <X size={28} />
                    </button>
                )}
            </div>

            {/* Success Message */}
            {isSuccess ? (
                <div className="p-12 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <motion.div
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Quote Request Sent!</h3>
                    <p className="text-white/60">We'll contact you shortly with your personalized quote.</p>
                </div>
            ) : (
                /* Form */
                <form 
                    onSubmit={handleSubmit} 
                    className="p-8 space-y-6"
                    name="quote-request"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    <input type="hidden" name="form-name" value="quote-request" />
                    <p className="hidden">
                        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                    </p>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                                Phone *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                                placeholder="(470) 555-0123"
                            />
                        </div>
                    </div>

                    {/* Service Type */}
                    <div>
                        <label htmlFor="service" className="block text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                            Service Type *
                        </label>
                        <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                        >
                            <option value="" className="bg-background">Select a service...</option>
                            {services.map(service => (
                                <option key={service} value={service} className="bg-background">{service}</option>
                            ))}
                        </select>
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                            Property Address *
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                            placeholder="123 Main St, East Cobb, GA"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                            Additional Details
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="Tell us about the size of your property, specific needs, preferred date, etc."
                        />
                    </div>

                    {/* SMS Consent Checkbox (Optional - NOT required for submission) */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="smsConsent"
                                name="sms_consent"
                                value="yes"
                                checked={smsConsent}
                                onChange={(e) => setSmsConsent(e.target.checked)}
                                className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0"
                            />
                            <label htmlFor="smsConsent" className="text-xs text-white/70 leading-relaxed cursor-pointer select-none">
                                <span className="font-bold text-white/90">(Optional)</span> I agree to receive recurring SMS text messages from Felicio Cleaning Services, including appointment reminders, quote follow-ups, promotions, and customer support updates. Consent is not a condition of purchase or service. Message frequency varies (up to 6 msgs/month). Message &amp; data rates may apply. Reply STOP to unsubscribe or HELP for help at any time. See our <a href="/privacy-policy" className="underline text-primary hover:text-primary/80">Privacy Policy</a> and <a href="/terms-and-conditions" className="underline text-primary hover:text-primary/80">Terms &amp; Conditions</a>.
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg h-16 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                Sending...
                            </span>
                        ) : (
                            <span className="flex items-center gap-3">
                                <Send size={20} />
                                Get My Free Quote
                            </span>
                        )}
                    </Button>

                    <p className="text-xs text-white/60 text-center leading-relaxed">
                        Submitting this form does not require SMS consent. You will receive your quote regardless of whether you opt in to text messages.
                    </p>
                    <p className="text-[10px] text-white/30 text-center leading-relaxed">
                        By submitting this form, you agree to our <a href="/terms-and-conditions" className="underline hover:text-primary transition-colors">Terms & Conditions</a> and <a href="/privacy-policy" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
                    </p>
                </form>

            )}
        </div>
    );

    if (isInline) {
        return formContent;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        {formContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
