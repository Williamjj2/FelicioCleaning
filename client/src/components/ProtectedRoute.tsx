import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
    const [_, setLocation] = useLocation();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                setSession(session);
            } else {
                const checkRole = localStorage.getItem("check_role");
                if (checkRole === "admin") {
                    setSession({ user: { role: "admin" } }); // Transitionary bypass
                }
            }
            setLoading(false);
        };

        checkSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session);
            } else {
                // If Supabase says no session, check if we have the bypass role
                const checkRole = localStorage.getItem("check_role");
                if (checkRole === "admin") {
                    setSession({ user: { role: "admin" } });
                } else {
                    setSession(null);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!session) {
        setLocation("/login");
        return null;
    }

    return <Component />;
}
